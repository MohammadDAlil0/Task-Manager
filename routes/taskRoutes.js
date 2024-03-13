const express = require('express');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.use(authController.protect);

router.route('/')
.get(taskController.getAllTasks)
.post(taskController.createTask);

router.route('/:id')
.get(taskController.getTask)
.put(taskController.updateTask)
.delete(taskController.deleteTask);

module.exports = router;