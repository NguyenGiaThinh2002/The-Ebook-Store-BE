const Product = require('../models/Product');
// const multer = require("multer")
// const mongo = require('mongodb').ObjectId;

class ProductController{
    async createProduct(req, res){
        const {name,description,price,type,image,sizes, toppings} = req.body;
        const product = await Product.create({name, description, price,type,image, sizes, toppings});
        return res.status(201).json(product);
    }
    async getAllProduct(req, res){
        console.log(Product);
        try {   
            const product = await Product.find();
            return res.status(200).json(product);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    async getProduct(req, res) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        try {
            // Query the database using the skip and limit parameters
            const products = await Product.find()
                .skip((page - 1) * limit)
                .limit(limit);
    
            // Additionally, get the total count of products
            const totalCount = await Product.countDocuments();
            const paginationData = {
                totalCount,
                items: products
            };   
    
            res.json(paginationData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async findProduct(req, res){
        try {   
            const product = await Product.find(req.body);
            return res.status(200).json(product);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    async updateProduct(req, res){  
        console.log(req.body);
        const product = await Product.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json(product);
    }

    async deleteProduct(req, res){
        const product = await Product.findByIdAndDelete(req.body._id)
        return res.status(200).json(product);
    }


} 

module.exports = new ProductController();
