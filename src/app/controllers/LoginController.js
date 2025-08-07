const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class LoginController{

    async index(req, res){
        try{
            console.log(req.body);
            const user = await User.findOne({ phone: req.body.phone});
            // res.json({ token });
            if(!user ){
                return res.status(404).json('Unvalid user');
            }
            const validPassword = bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
                return res.status(404).json('Unvalid password')
            }
            if(user && validPassword){
                // const secretKey = 'your-secret-key';
                // const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
                return res.status(200).json(user);
            }

            
        }
        catch(err){
            res.status(500).json(err)
        }
        
    }

    // async generateToken(user) {
    //     const payload = {
    //       id: user.id,
    //       username: user.username,
    //       email: user.email,
    //     };
    //     return jwt.sign(payload, process.env.JWT_SECRET);
    //   }
    // async verifyToken(token) {
    //     try {
    //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //       return decoded;
    //     } catch (err) {
    //       return null;
    //     }
    //   }
    
} 

module.exports = new LoginController(); 


