const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// loginController.index
router.post('/',UserController.users);
router.get('/findUser',UserController.findUser);
router.post('/updateUser',UserController.updateUser);

// router.use("/:slug", loginController.show)

module.exports = router;