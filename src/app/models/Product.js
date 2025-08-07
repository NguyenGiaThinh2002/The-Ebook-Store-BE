const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require :true ,
    },
    price:{
        type: Number,
        require :true ,
    },
    type:{
        type: String,
        require: true,
    },
    image:{
        type: Array,
        require: true,
    },
    sizes:{
        type: Array,
    },
    toppings:{
        type: Array,
    },  
    // category:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     require :true ,
    // },
},{collection: 'Product'})


module.exports = mongoose.model('Product', Product); 