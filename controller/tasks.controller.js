const Task = require("../database/models/Task");
const asyncWrapper = require("../middleware/async");
const { customErrorHandler } = require("../errors/customErrorHandler");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(customErrorHandler(`cannot find the task with id ${taskId}`, 404));
    return res
      .status(404)
      .json({ message: `cannot find the task with id ${taskId}` }); //make sure use return funtion here to return from the funtion
  }
  const { name } = task;
  res.status(200).json({ message: `Deleted task ${name}`, task: task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params; //use object destructuring to get the id from the params and assign it to taskId
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(customErrorHandler(`cannot find the task with id ${taskId}`, 404));
    return res
      .status(404)
      .json({ message: `cannot find the task with id ${taskId}` }); //make sure use return funtion here to return from the funtion
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true, //these two options will return newly updated item and check for validation when
    //updating the document
  });
  if (!task) {
    return next(customErrorHandler(`cannot find the task with id ${taskId}`, 404));
    return res
      .status(404)
      .json({ message: `cannot find the task with id ${taskId}` }); //make sure use return funtion here to return from the funtion
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
};
