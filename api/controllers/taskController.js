const taskModel = require("../models/taskModels");

class TaskController{
    async getTaskInTable(req,res){
        try{
            const listTask=await taskModel.find({
                tableId:req.params.tableId
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
}
module.exports=new TaskController();