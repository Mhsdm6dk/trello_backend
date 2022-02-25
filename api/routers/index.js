const userRouter=require('./userRouter');
const projectRouter=require('./projectRouter');
const taskRouter=require('./taskRouter');
const router=(app)=>{
    app.use('/user',userRouter);
    app.use('/project',projectRouter);
    app.use('/task',taskRouter);
}
module.exports=router;