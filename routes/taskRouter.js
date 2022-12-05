const express = require('express');
const taskController = require('./../controllers/taskController');
const { route } = require('./userRouter');

const router = express.Router();

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route('/update/:id').get(taskController.updateTask);
router.route('/delete/:id').delete(taskController.deleteTask);

router.route('/vehicles').get(taskController.getAllVehicles);
router.route('/mcps').get(taskController.getAllMCPs);

module.exports = router;
