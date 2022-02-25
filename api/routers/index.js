const userRouter=require('./userRouter');
const projectRouter=require('./projectRouter');
const router=(app)=>{
    app.use('/user',userRouter);
    app.use('/project',projectRouter);
}
module.exports=router;