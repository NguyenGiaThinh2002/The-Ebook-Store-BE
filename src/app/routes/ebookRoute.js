const express = require("express");
const eBookController = require("../controllers/EbookController");

const router = express.Router();
// /ebooks

router.post("/createUser", eBookController.createUser);
router.post("/login", eBookController.loginUser);
router.post("/makePurchase", eBookController.makePurchase);
router.put("/updateUserBalance/:id", eBookController.updateUserBalance);

router.get("/getPurchasedBooks/:id", eBookController.getPurchasedBooks);
router.get("/getEbooks", eBookController.getAllBooks);
router.get("/getUserBalance/:id", eBookController.getUserBalance);

module.exports = router;
