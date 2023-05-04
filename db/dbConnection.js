const mongoose = require('mongoose');
const dbConnection = ()=>{
    try{
        const db =  async()=>{
            await mongoose.connect("mongodb+srv://Second:12345@mern.kehorho.mongodb.net/test")
            console.log("database is connected...");
        };
        return db;
    } catch (error) {
        console.log(error.message)
    }
}

const data = dbConnection()
module.exports = data();