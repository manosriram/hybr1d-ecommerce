const jwt = require("jsonwebtoken");

exports.isAuthenticatedBuyer = async function isAuthenticatedBuyer(
  req,
  res,
  next
) {
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, "somekey", (err, user) => {
    if (err) {
      return res.json({ message: err });
    } else {
      if (user.type !== "buyer") {
        return res.json({ message: "user isn't buyer" });
      } else {
        req.user = user;
      }
      next();
    }
  });
};

exports.isAuthenticatedSeller = async function isAuthenticatedSeller(
  req,
  res,
  next
) {
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, "somekey", (err, user) => {
    if (err) {
      return res.json({ message: err });
    } else {
      if (user.type !== "seller") {
        return res.json({ message: "user isn't seller" });
      } else {
        req.user = user;
      }
      next();
    }
  });
};
