const mongoose = require('mongoose');
const dbConnection = ()=>{
    try{
        const db =  async()=>{
            await mongoose.connect('mongodb://localhost:27017/helloworld')
            console.log("database is connected...");
        };
        return db;
    } catch (error) {
        console.log(error.message)
    }
}

const data = dbConnection()
module.exports = data();