const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit"); // <-- import helper

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests. Try again later.",
});

const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  keyGenerator: (req) => req.user?.id || ipKeyGenerator(req), // <-- use helper here
  message: "Too many user requests. Try again later.",
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // 5 signups per IP per hour
  message: "Too many accounts created from this IP. Try again later.",
});

module.exports = { publicLimiter, userLimiter, signupLimiter };
