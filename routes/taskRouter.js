const express = require('express');
const taskController = require('./../controllers/taskController');

const router = express.Router();

router.route('/').get(taskController.getAllTasks);

router.route('/vehicles').get(taskController.getAllVehicles);
router.route('/mcps').get(taskController.getAllMCPs);

module.exports = router;
