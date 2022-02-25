const jwt=require('jsonwebtoken');
const crypto=require('crypto-js');
const userModel = require('../models/userModel');
class UserController{
    async get(req,res){
        try{
            const user=await userModel.find();
            res.json({
                success:true,
                message:user
            })
        }
        catch(error){
            req.status(500).json('server error');
        }
    }
    async login(req,res){
        try{
            const user= await userModel.findOne({
                username:req.body.username
            })
            .populate('listProject');
            if(crypto.AES.decrypt(user.password,process.env.SECRET).toString(crypto.enc.Utf8)==req.body.password){
                const token=jwt.sign({_id:user._id},process.env.TOKENSECRET,{
                    expiresIn:'15m'
                })
                res.cookie('token',token);
                res.json({
                    success:true,
                    message:{
                        name:user.name,
                        email:user.email,
                        address:user.address,
                        phone:user.phone,
                        listProject:user.listProject
                    }
                })
            }
            else{
                res.status(400).json('Password is not correct');
            }
        }
        catch(error){
            res.status(404).json('Account not found');
        }
    }
    async lougout(req,res){
        res.clearCookie();
        res.json('Logout successfully');
    }
    async post(req,res){
        try{
            const user=await userModel.create({
                name:req.body.name,
                username:req.body.username,
                email:req.body.email,
                password:crypto.AES.encrypt(req.body.password,process.env.SECRET).toString(),
                telephone:req.body.telephone,
                listProject:[]
            });
            res.json({
                success:true,
                message:'Create account successfully'
            })
        }
        catch(error){
            res.status(500).json('server error');
        }
    }
    async putInfo(req,res){
        try{
            const user=await userModel.updateOne({_id:req._id},{
                name:req.body.name,
                telephone:req.body.telephone,
                email:req.body.email,
                address:req.body.address
            })
            res.json({
                success:true,
                message: 'Handle info successfully'
            })
        }
        catch(error){
            res.status(500).json('server error');
        }
    }
    async putPassword(req,res){
        try{
            const user=await userModel.findOne({_id:req._id});
            if(crypto.AES.decrypt(user.password,process.env.SECRET).toString(crypto.enc.Utf8)==req.body.password){
                await userModel.updateOne({_id:req._id},{
                    password:crypto.AES.encrypt(req.body.newpassword,process.env.SECRET).toString()
                })
                res.json({
                    success:true,
                    message:'Handle password successfully'
                })
            }
            else{
                res.json({
                    success:false,
                    message:'Password is not correct'
                })
            }
        }
        catch(error){
            res.json('server error');
        }
    }
    async delete(req,res){
        try{
            const user=await userModel.deleteOne({_id:req._id});
            if(user.deletedCount>0){
                res.json({
                    success:true,
                    message:'delete account successfully'
                })
            }
            else{
                res.status(404).json({
                    success:false,
                    message:'account not found'
                })
            }
        }
        catch(error){
            res.status(500).json('server error');
        }
    }
    
}
module.exports=new UserController();