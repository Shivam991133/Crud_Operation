const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

const userModel = new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  
  status:{
    type: String,
    enum: ["ACTIVE", "BLOCK", "DELETE"],
    default: "ACTIVE",
  },

  image:[{
    filename: String,
    originalname: String,
    contentType: String,
    size: Number,
  }],

  userType: {
    type: String,
    enum: ["ADMIN", "OWNER", "VENDORS"],
    default: "OWNER"
},
}, 
{
  timestamps:true
});

userModel.plugin(mongoosePaginate);

const User = mongoose.model('User',userModel);
module.exports = User


const fun = async()=>{
const admin =await User.findOne({status: "ACTIVE" })
if(admin){
  console.log('default admin exist')
}else{
  let admin = new User ({
    name: "Shivam ",
    email: "admin@gmail.com",
    password: 12345,
    userType: "ADMIN",
    status: "ACTIVE"
  })
const result = await admin.save();
if(result){
  console.log('admin Created Succesfully')
}else{
  console.log("Admin not created error")
}
}}

fun()