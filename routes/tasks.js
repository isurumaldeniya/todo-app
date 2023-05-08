const express = require('express');
const router = express.Router();
const taskController = require('../controller/tasks.controller');


router.route('/').get(taskController.getAllTasks);
router.route('/').post(taskController.createTask);
router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(taskController.deleteTask);

module.exports = router;