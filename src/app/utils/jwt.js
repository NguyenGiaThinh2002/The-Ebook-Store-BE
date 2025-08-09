const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key";

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.verifyJwt = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
