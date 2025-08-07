const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new mongoose.Schema({
    userId: {
    type: String,
    },
    orderId: {
    type: String,
    },
    name: String,
    quantity: Number,
    totalPrice: Number,
    size: Array,
    toppings: Array,
    username: String,
    phone: String,
    address: String,
    // TotalOrderPrice: Number,
    orderDate:{
        type: String,
        require :true,
    },
    isShipped:{
        type: Boolean,
        // require :true,
    }

    // category:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     require :true ,
    // },
},{collection: 'Order'})


module.exports = mongoose.model('Order', Order); 