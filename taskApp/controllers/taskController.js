const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    next(e);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate({
      path: 'owner',
      select: 'name email -_id', 
    });
    res.send(tasks);
  } catch (e) {
    next(e);
  }
};

exports.getTasksByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const tasks = await Task.find({ owner: userId }).populate({
      path: 'owner',
      select: 'name email -_id',
    });

    if (!tasks.length) {
      return res.status(404).json({ message: 'No tasks found for this user.' });
    }

    res.send(tasks);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.send(task);
  } catch (e) {
    next(e);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.send(task);
  } catch (e) {
    next(e);
  }
};
