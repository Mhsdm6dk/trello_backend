const express=require('express');
const projectController = require('../controllers/projectController');
const authenticate = require('../middlewares/authenticate');
const router=express.Router();
router.post('/',authenticate.authenticateUser,projectController.post);
router.patch('/:_id/addtable',authenticate.authenticateUser,projectController.addTable);
router.delete('/:_id',authenticate.authenticateUser,projectController.delete);
router.delete('/:_id/deletetable/:tableid',authenticate.authenticateUser,projectController.deleteTable);
module.exports=router;