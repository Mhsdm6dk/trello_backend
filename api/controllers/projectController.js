const req = require("express/lib/request");
const projectModel = require("../models/projectModel");
const userModel = require("../models/userModel");

class ProjectController{
    async post(req,res){
        try{
            const d=new Date();
        const project= await projectModel.create({
            name:req.body.name,
            createdDate: d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),
            createdUser: req._id,
            expirationDate: req.body.expirationDate,
            userList:[req._id],
            table:[],
            history:[]
        })
         await userModel.updateOne({
            _id:req._id
        },{
            $push:{listProject:project._id}
        })
        res.json({
            success:true,
            message:project
        })
        }
        catch(error){
            res.status(500).json('server error!');
            console.log(error)
        }
    }
    async delete(req,res){
        try{
            const project= await projectModel.deleteOne({
                _id:req.params._id,
                createdUser:req._id
            });
            if(project.deletedCount==1){
                await userModel.updateOne({
                    _id:req._id
                },{
                    $pull:{
                        listProject:req.params._id
                    }
                })
                res.json({
                    success:true,
                    message:"delete project successfully!"
                })
            }
            else{
                res.json({
                    success:false,
                    message:"project not found!"
                })
            }

        }
        catch(error){
            console.log(error);
            res.status(500).json('server error!');
        }
    }
    async addUser(req,res){
        try{
            await projectModel.updateOne({
                _id:req.params._id,
                createdUser:req._id
            },{ $push:{userList:req.body.userid}})
            res.json({
                success:true,
                message:"add user successfully!"
            })

        }
        catch(error){
            res.status(500).json('server error!');
        }
    }
    async addTable(req,res){
        try{
            await projectModel.updateOne({
                _id:req.params._id,

            },{
                $push:{
                    table:{
                        name:req.body.name,
                        task:[]
                    }
                }
            })
            res.json({
                success:true,
                message:"add table successfully!"
            })
        }
        catch(error){
            res.status(500).json('server error!');
        }
    }
    async deleteTable(req,res){
        try{
            
            await projectModel.updateOne({
                _id:req.params._id,
                userList:[req._id]
            },{
                $pull:{table:{_id:req.params.tableid}}
            })
            res.json({
                success:true,
                message:'delete table successfully!'
            })
        }
        catch(error){
            res.status(500).json('server error!');
        }
    }
    
}
module.exports=new ProjectController();