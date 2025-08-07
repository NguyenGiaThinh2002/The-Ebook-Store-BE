const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
class AuthController{
    // [POST] /auth/signup
    async register(req, res){
        // const {username,password,email} = req.body;
        try {
            const username = req.body.username;
            const password = req.body.password;
            const phone = req.body.phone;
            const address = req.body.address; 
            const user = await User.create({username, password, phone, address});
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
} 

module.exports = new AuthController();
