const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, "somekey", (err, user) => {
    if (err) {
      return res.json({ message: err });
    } else {
      req.user = user;
      next();
    }
  });
};
