const jwt = require("jsonwebtoken");

const generateAccessToken = (reference) => {
  return jwt.sign({ reference }, process.env.JWT_SECRET, {
    expiresIn: "1800s",
  });
};

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, { reference }) => {
    if (err) return res.sendStatus(403);

    req.member_reference = reference;

    next();
  });
};

const isOverFifteen = (dateOfBirth) => {
  const { day, month, year } = dateOfBirth;
  const birthDate = new Date(`${month}/${day}/${year}`);

  const currentDate = new Date();
  const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

  const hasBirthdayOccurred =
    currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate());

  return ageDifference > 16 || (ageDifference === 16 && hasBirthdayOccurred);
};

const hasDOB = (member) => {
  if (!member.date_of_birth) {
    return false;
  }

  if (
    member.date_of_birth.day === null ||
    member.date_of_birth.month === null ||
    member.date_of_birth.year === null
  ) {
    return false;
  }

  return true;
};

module.exports = { generateAccessToken, auth, isOverFifteen, hasDOB };
