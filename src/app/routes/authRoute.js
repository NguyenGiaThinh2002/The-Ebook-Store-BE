const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.post('/signup', authController.register);
// router.use("/:slug", loginController.show)

module.exports = router;
