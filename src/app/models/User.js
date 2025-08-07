const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: {type: 'string', maxLength: 255},
    password:{type: 'string', maxLength: 255},
    password2: {type: 'string', maxLength: 255},
    phone: {
        type: 'string',
        maxLength: 255 , 
        validate:{
            validator : (value) => {
                return validator.isMobilePhone(value, "vi-VN");
            },
            massage: "Số Điện Thoại Không Hợp Lệ",
            },
    },
    address: {type: 'string', maxLength: 255},
}, {collection: 'user'});

User.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch (err) {
        next(err);
    }
}
)

User.post('save', async function (next){
    try {
        console.log("called after save");
    }
    catch (err) {}
}
)

module.exports = mongoose.model('User', User); 
