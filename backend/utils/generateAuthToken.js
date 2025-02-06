const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastName, email, isAdmin) => {
  return jwt.sign(
    (payload = { _id, name, lastName, email, isAdmin }),
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = generateAuthToken;
