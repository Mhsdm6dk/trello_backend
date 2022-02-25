const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    name:String,
    tableId:mongoose.SchemaTypes.ObjectId,
    describes:String,
    userList:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }],
    todoList:[String],
    comment:[{
        userId:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'user'
        },
        content:String
    }]
})
const taskModel= mongoose.model('task',taskSchema);
module.exports=taskModel;