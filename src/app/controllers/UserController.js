const User = require('../models/User');

class Users{
    // [POST] /admin
    async users(req, res){
        console.log("thinh");
        
        User.find({}).then(users =>{
            users = users.map(user =>user.toObject());
            res.send({users})
        });
    }

    async findUser(req, res){
        try {   
            const user = await User.find(req.body);
            return res.status(200).json(user);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    async updateUser(req, res){  
        console.log(req.body);
        const user = await User.updateOne({ phone: req.body.phone }, req.body)
        return res.status(200).json(user);
    }
    
}

module.exports = new Users();

