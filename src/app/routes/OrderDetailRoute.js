const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/OrderDetailController');

router.post('/',orderDetailController.createOrderDetail);
router.get('/findOrderDetail',orderDetailController.findOrderDetail);
router.post('/deleteOrderDetail', orderDetailController.deleteOrderDetail);
// router.post('/deleteManyOrderDetail', orderDetailController.deleteManyOrderDetail);

// router.get('/getProduct', productController.getProduct);
// router.get('/findProduct', productController.findProduct);
// router.post('/updateProduct',productController.updateProduct);
module.exports = router;
