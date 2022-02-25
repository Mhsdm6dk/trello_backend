const mongoose=require('mongoose');
const projectSchema=new mongoose.Schema({
    name:String,
    createdDate:String,
    createdUser:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    expirationDate:String,
    userList:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }],
    table:[{
        name:String,
        task:[{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'task'
        }]
    }],
    history:[String]
})
const projectModel=mongoose.model('project',projectSchema);
module.exports=projectModel;