const mongoose = require('mongoose');

const uri = "mongodb+srv://Thinhlatoi3:Thinhlatoi2@king-coffee.bvkxe.mongodb.net/Coffee-api-db"
//const uri = "mongodb+srv://thinhlatoi4:thinhlatoi2@cluster0.bltd15j.mongodb.net/Coffee-api-db"
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connect DataBase!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };