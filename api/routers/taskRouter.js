const express=require('express');
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authenticate');
const router=express.Router();
router.post('/addATask',authenticate.authenticateUser,taskController.addATask);
router.get('/getTaskInTable/:tableId',authenticate.authenticateUser,taskController.getTaskInTable);
router.patch('/addAUser/:_id',authenticate.authenticateUser,taskController.addAUser);
module.exports=router;