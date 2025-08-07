const OrderDetail = require('../models/OrderDetail');
// const multer = require("multer")
// const mongo = require('mongodb').ObjectId;

class OrderDetailController{
    async createOrderDetail(req, res){
        const {orderId,userId,name,quantity,totalPrice,size,toppings} = req.body;
        const orderDetail = await OrderDetail.create({orderId,userId,name,quantity,totalPrice,size,toppings});
        return res.status(201).json(orderDetail);
    }
    async findOrderDetail(req, res){
        try {   
            const orderDetails = await OrderDetail.find(req.body);
            return res.status(200).json(orderDetails);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    async deleteOrderDetail(req, res){
        const orderDetails = await OrderDetail.findByIdAndDelete(req.body._id)
        return res.status(200).json(orderDetails);
    }

} 

module.exports = new OrderDetailController();
