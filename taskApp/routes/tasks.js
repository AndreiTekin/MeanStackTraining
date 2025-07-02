const express = require('express');
const validateTask = require('../middleware/validateTask');
const catchInvalidObjectId = require('../middleware/catchInvalidObjectId');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/', validateTask, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.patch('/:id', catchInvalidObjectId, taskController.updateTask);
router.delete('/:id', catchInvalidObjectId, taskController.deleteTask);
router.get('/user/:id', catchInvalidObjectId, taskController.getTasksByUser);

module.exports = router;
