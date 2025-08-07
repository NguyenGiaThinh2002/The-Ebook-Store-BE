const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

// loginController.index
router.post('/',loginController.index);

// router.use("/:slug", loginController.show)

module.exports = router;