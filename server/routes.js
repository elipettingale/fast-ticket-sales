var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Members = require("./models/members");
const Events = require("./models/events");
const Entries = require("./models/entries");
const FrozenTickets = require("./models/frozenTickets");
const PurchasedTickets = require("./models/purchasedTickets");
const { auth, generateAccessToken, isOverFifteen, hasDOB } = require("./lib");

router.post("/session", async function (req, res, next) {
  const member = await Members.findOne({
    reference: req.body.reference.toUpperCase(),
  });

  if (!member) {
    console.log('LOGIN: ' + req.body.reference.toUpperCase() + ' Not Found');
    return res.sendStatus(403);
  }

  let hash = member.password.replace(/^\$2y(.+)$/i, "$2a$1");

  bcrypt.compare(req.body.password, hash, async function (err, result) {
    if (result === true) {
      if (hasDOB(member) && !isOverFifteen(member.date_of_birth)) {
        console.log('LOGIN: ' + req.body.reference.toUpperCase() + ' Under Age');
        return res.json({
          error: "UNDER_AGE_MEMBER",
        });
      }

      if (member.has_expired) {
        console.log('LOGIN: ' + req.body.reference.toUpperCase() + ' Expired');
        return res.json({
          error: "EXPIRED_MEMBER",
        });
      }

      const alreadyPurchasedTickets = await PurchasedTickets.countDocuments({
        member: member.reference,
      });

      if (
        (process.env.LOCKED_TO_SINGLE_PURCHASE === "true") &
        (alreadyPurchasedTickets >= 1)
      ) {
        console.log('LOGIN: ' + req.body.reference.toUpperCase() + ' Limit Reached');
        return res.json({
          error: "MEMBER_REACHED_LIMIT",
        });
      }

      const auth_token = generateAccessToken(member.reference);

      const entry = new Entries({
        member: member.reference,
        member_name: `${member.first_name} ${member.last_name}`,
        total: 0,
      });

      entry.save();

      res.json({
        member: member,
        auth_token: auth_token,
        entry: entry._id,
      });
    } else {
      console.log('LOGIN: ' + req.body.reference.toUpperCase() + ' Invalid Login');
      return res.sendStatus(403);
    }
  });
});

router.get("/events", async function (req, res, next) {
  const events = await Events.find({});
  return res.json(events);
});

router.post("/frozenTickets", auth, async function (req, res, next) {
  const entry = await Entries.findOne({ _id: req.body.entry });
  const event = await Events.findOne({ _id: req.body.event });

  if (entry.member !== req.member_reference) {
    return res.statusCode(403);
  }

  if (event.status === "SOLD_OUT") {
    return res.json({
      success: false,
      error: "SOLD_OUT",
    });
  }

  const totalFrozen = await FrozenTickets.countDocuments({
    event: req.body.event,
    unfrozen_at: { $gt: Date.now() },
  });

  const totalPurchased = await PurchasedTickets.countDocuments({
    event: req.body.event,
  });

  const totalRemaining = event.available - totalFrozen - totalPurchased;

  if (totalRemaining <= 1) {
    event.status = "SOLD_OUT";
  } else if (totalRemaining <= 25) {
    event.remaining = 25;
  } else if (totalRemaining <= 50) {
    event.remaining = 50;
  } else {
    event.remaining = undefined;
  }

  event.save();

  const alreadyPurchased = await PurchasedTickets.findOne({
    event: req.body.event,
    member: req.member_reference,
  });

  if (alreadyPurchased !== null) {
    return res.json({
      success: false,
      error: "ALREADY_PURCHASED",
    });
  }

  const frozenTicket = new FrozenTickets({
    member: req.member_reference,
    event: req.body.event,
    unfrozen_at: req.body.unfrozen_at,
  });

  frozenTicket.save();

  entry.description.push(`${event.name} | DC: ${event.department_code} | NC: ${event.nominal_code}`);
  entry.frozen_tickets.push(frozenTicket._id);
  entry.total += event.price;
  entry.save();

  return res.json({
    success: true,
  });
});

router.post("/entry", auth, async function (req, res, next) {
  const entry = await Entries.findOne({ _id: req.body.entry });

  const stripe = require("stripe")(
    process.env.STRIPE_KEY
  );

  let description = '[Ticket Purchase] ';

  entry.description.forEach((item) => {
    description += `(${item}) `;
  });

  description += entry.member_name;

  console.log(description);

  const intent = await stripe.paymentIntents.create({
    amount: entry.total,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
    description: description
  });

  entry.intent = intent.id;
  entry.secret = intent.client_secret;
  entry.details = req.body.details;
  entry.save();

  return res.json({
    success: true,
    intent: intent.client_secret,
  });
});

router.get("/payment/complete", async function (req, res, next) {
  const entry = await Entries.findOne({
    intent: req.query.payment_intent,
    secret: req.query.payment_intent_client_secret,
  });

  if (!entry) {
    res.sendStatus(404);
  }

  if (req.query.redirect_status !== "succeeded") {
    return res.redirect(process.env.CLIENT_URL + "?complete=false");
  }

  entry.paid_at = new Date();

  for (const id of entry.frozen_tickets) {
    const frozenTicket = await FrozenTickets.findOne({ _id: id });

    const purchasedTicket = new PurchasedTickets({
      member: entry.member,
      event: frozenTicket.event,
    });

    await purchasedTicket.save();

    entry.purchased_tickets.push(purchasedTicket._id);

    frozenTicket.deleteOne();
  }

  await entry.save();

  return res.redirect(process.env.CLIENT_URL + "?complete=true");
});

router.get("/", function (req, res, next) {
  return res.json({
    success: true
  });
});

module.exports = router;
