const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    phone:String,
    listProject:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'project'
    }]
})
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;