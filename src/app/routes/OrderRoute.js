const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/',orderController.createOrder);
router.get('/getOrder', orderController.getOrder);
router.post('/updateOrder',orderController.updateOrder);

// router.get('/findOrderDetail',orderDetailController.findOrderDetail);
// router.post('/deleteOrderDetail', orderDetailController.deleteOrderDetail);
module.exports = router;
