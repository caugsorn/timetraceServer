const createError = require("../util/createError");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    createError("Token not found", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decodedToken) {
    if (err) {
      createError(err.message, 401);
    } else {
      req.userId = decodedToken.id;
      next();
    }
  });
};
