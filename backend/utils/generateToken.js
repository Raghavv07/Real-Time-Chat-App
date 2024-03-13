let jwt = require("jsonwebtoken");

let generateTokenAndSetCookie = (userId, res) => {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

module.exports = generateTokenAndSetCookie;