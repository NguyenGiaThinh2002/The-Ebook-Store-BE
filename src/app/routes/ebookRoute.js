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
router.post("/login", eBookController.loginUser); // publicLimiter,
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

router.get("/getPurchasedBooks/:id", eBookController.getPurchasedBooks);
router.get("/getEbooks", eBookController.getAllBooks);
router.get(
  "/getUserBalance/:id",
  verifyToken,
  userLimiter,
  eBookController.getUserBalance
);

module.exports = router;
