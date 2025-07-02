const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUserTasks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('tasks');
    if (!user) return res.status(404).send({ error: 'User not found' });
    res.send(user.tasks);
  } catch (e) {
    next(e);
  }
};
