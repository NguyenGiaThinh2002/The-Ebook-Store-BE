const express = require('express');
const Admin = require('../controllers/AdminController');

const router = express.Router();

router.get('/', Admin.getUser);
router.post('/addUser', Admin.addUser)
router.post('/deleteUser', Admin.deleteUser)
// router.use("/:slug", loginController.show)

module.exports = router;