const User = require('../models/User');

class Admin{
    // [GET] /user
    async getUser(req, res){
        console.log(User);
        try {   
            const user = await User.find();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async deleteUser(req, res){
        // const email = req.body.email;
        const user = await User.findByIdAndDelete(req.body._id)
        return res.status(200).json(user);
    }

    async addUser(req, res){
        // const {username,password,email} = req.body;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        const user = await User.create({username, password, email});
        return res.status(201).json(user);
    }
    
}


module.exports = new Admin();

