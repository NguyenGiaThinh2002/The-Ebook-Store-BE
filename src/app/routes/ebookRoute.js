const express = require("express");
const eBookController = require("../controllers/EbookController");
const {
  publicLimiter,
  userLimiter,
  signupLimiter,
} = require("../middlewares/rateLimiter");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();
// /ebooks

router.post("/createUser", signupLimiter, eBookController.createUser); //
router.post("/login", publicLimiter, eBookController.loginUser); // publicLimiter,
router.post(
  "/makePurchase",
  verifyToken,
  userLimiter,
  eBookController.makePurchase
);
router.put(
  "/updateUserBalance/:id",
  verifyToken,
  userLimiter,
  eBookController.updateUserBalance
);

router.get("/getEbooks", publicLimiter, eBookController.getAllBooks);
router.get(
  "/getPurchasedBooks/:id",
  verifyToken,
  userLimiter,
  eBookController.getPurchasedBooks
);
router.get(
  "/getUserBalance/:id",
  verifyToken,
  userLimiter,
  eBookController.getUserBalance
);

module.exports = router;
