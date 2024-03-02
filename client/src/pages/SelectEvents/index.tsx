import { Key, useEffect } from "react";
import Events from "../../components/Events";
import styles from "./index.module.css";
import Countdown from "../../components/Countdown";
import Button from "../../components/Button";
import Close from "../../components/Close";
import server from "../../lib/server";
import { clone, displayPrice, getPrice } from "../../lib/helpers";

export default function SelectEvents({ state, send }: any) {
  useEffect(() => {
    server.get("/events").then(({ data }) => {
      send("SET_EVENTS", { events: data });
    });
  }, []);

  const addToBasket = (event: EventType) => {
    if (state.context.basket.find((e: EventType) => e._id === event._id)) {
      return;
    }

    if (event.status === "SOLD_OUT") {
      return;
    }

    if (!state.can("ADD_TO_BASKET")) {
      return;
    }

    server
      .post("frozenTickets", {
        entry: state.context.entry,
        event: event._id,
        unfrozen_at: state.context.timer_ends,
      })
      .then(({ data }) => {
        console.log(data);

        if (data.success) {
          let eventClone = clone(event);

          send("ADD_TO_BASKET", {
            event: eventClone,
          });
        } else {
          if (data.error === "SOLD_OUT") {
            send("SET_EVENT_STATUS", { event: event, status: "SOLD_OUT" });
          }

          if (data.error === "ALREADY_PURCHASED") {
            send("SET_EVENT_STATUS", {
              event: event,
              status: "ALREADY_PURCHASED",
            });
          }
        }
      });
  };

  const price = getPrice(state.context);

  return (
    <div className={styles.Wrapper}>
      <div>
        <Events events={state.context.events} onSelect={addToBasket} />
      </div>
      <div>
        <div>
          <div className="flex justify-between mb-8">
            <div className="flex items-center">
              <img className={styles.Icon} src="/src/assets/basket.svg" />
              <span className="text-4xl">Basket</span>
            </div>
            <Countdown timerEnds={state.context.timer_ends} />
          </div>
          <p className="text-sm italic mb-4">
            {import.meta.env.VITE_ROUND === "1" && (
              <span>
                Members are limited to 1 ticket purchase during Round 1 of sales.
                <br></br>
                Additional tickets for all other qualifiers will be available to purchase during Round 2 of sales which opens at midday on Monday 5th February.
              </span>
            )}
            {import.meta.env.VITE_ROUND === "2" && (
              <span>
                Members are limited to 5 tickets per purchase. <br></br> You may
                only enter each event once.
              </span>
            )}
          </p>
          <div className="mb-6">
            {state.context.basket.map((event: EventType) => (
              <div key={event._id as Key} className={styles.Event}>
                <span>{event.name}</span>
              </div>
            ))}
          </div>
          {state.can("CONTINUE") && (
            <div className="text-right">
              <p className="mb-4 text-4xl">{displayPrice(price)}</p>
              <div>
                <Button onClick={() => send("CONTINUE")}>Continue</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
