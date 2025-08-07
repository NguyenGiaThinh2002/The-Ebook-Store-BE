const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductsController');

router.post('/',productController.createProduct);
router.get('/getProduct', productController.getProduct);
router.get('/getAllProduct', productController.getAllProduct);
router.get('/findProduct', productController.findProduct);
router.post('/deleteProduct',productController.deleteProduct);
router.post('/updateProduct',productController.updateProduct);

module.exports = router;
