const projectModel = require("../models/projectModel");
const taskModel = require("../models/taskModels");

class TaskController{
    async getTaskInTable(req,res){
        try{
            const listTask=await taskModel.find({
                tableId:req.params.tableId,
                userList:[req._id]
            })
            res.json({
                success:true,
                message:listTask
            })
        }
        catch(error){
            res.status(500).json('server error!');
        }
    }
    async getTaskById(req,res){
        try{
            const task= await taskModel.findOne({
                _id:req.params._id
            })
            if(task){
                res.json({
                    success:true,
                    message:task
                })
            }
            else{
                res.status(404).json({
                    success:false,
                    message:"task not found!"
                })
            }
        }
        catch(error){
            res.status(500).json("server error!");
        }
    }
    async addATask(req,res){
        try{
            const task= await taskModel.create({
                name:req.body.name,
                tableId:req.body.tableId,
                describes:req.body.describes,
                userList:[req._id],
                todoList:[],
                comment:[]
            })
            await projectModel.updateOne({
                "table._id":req.body.tableId
            },{
                $push:{
                    "table.$.task":task._id
                }
            });
            res.json({
                success:true,
                message:task
            })
        }
        catch(error){
            res.status(500).json('server error!');
        }
    }
    async addAUser(req,res){
        try{
            const task=await taskModel.updateOne({
                _id:req.params._id,
                "userList":req._id
            },{
                $push:{
                    userList:req.body.userId
                }
            })
            if(task.upsertedCount==1){
                res.json({
                    success:true,
                    message:"add user successfully!"
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message:"you don't in task"
                })
            }
        }
        catch(error){
            res.status(500).json("server error!");
        }
    }
}
module.exports=new TaskController();