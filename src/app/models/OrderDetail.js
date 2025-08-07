const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderDetail = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Order',
        type: String,
      },
      orderId: {
        type: String,
      },
    status:{
        type: Boolean,
    },
    name: String,
    quantity: Number,
    totalPrice: Number,
    size: Array,
    toppings: Array,
    // category:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     require :true ,
    // },
},{collection: 'OrderDetail'})

module.exports = mongoose.model('OrderDetail', OrderDetail); 