const jwt=require('jsonwebtoken');
class Authenticate{
    authenticateUser(req,res,next){
        try{
            const token= jwt.verify(req.cookies.token,process.env.TOKENSECRET);
            if(token){
                req._id=token._id;
                next();
            }
        }
        catch(error){
            res.status(400).json('Token is not correct');
        }
    }
}
module.exports=new Authenticate();