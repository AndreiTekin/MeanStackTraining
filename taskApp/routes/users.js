const express = require('express');
const validateUser = require('../middleware/validateUser');
const catchInvalidObjectId = require('../middleware/catchInvalidObjectId');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', validateUser, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id/tasks', catchInvalidObjectId, userController.getUserTasks);

module.exports = router;
