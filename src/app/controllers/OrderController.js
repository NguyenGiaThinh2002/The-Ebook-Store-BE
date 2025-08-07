const Order = require('../models/Order');

class OrderController{
    async createOrder(req, res){
        const {orderId,userId,name,quantity,totalPrice,size,toppings,orderDate,isShipped,username,phone,address} = req.body;
        const order = await Order.create({orderId,userId,name,quantity,totalPrice,size,toppings,orderDate,isShipped,username,phone,address});
        return res.status(201).json(order);
    }

    async getOrder(req, res){
        try {   
            const order = await Order.find();
            return res.status(200).json(order);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async updateOrder(req, res){  
        console.log(req.body);
        const order = await Order.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json(order);
    }

    // async getOrder(req, res){
    //     const page = parseInt(req.query.page);
    //     const limit = parseInt(req.query.limit);

    //     // const orders = await Order.find();

    //     try{
    //         const order = await Order.find()
    //         .filter((orders) => orders.isShipped === false);
    //         order = order.skip((page - 1) * limit).limit(limit);
    //         const totalCount = await order.countDocuments();
    //         const paginationData = {
    //             totalCount,
    //             items: order
    //         }
    //         res.json(paginationData)
    //     }catch(error){
    //         res.status(500).json({error: error.message })
    //     }
    // }


    // async updateOrderDetail(req, res){  
    //     console.log(req.body);
    //     const product = await Product.updateOne({ phone: req.body.phone }, req.body)
    //     return res.status(200).json(product);
    // }

} 

module.exports = new OrderController();
