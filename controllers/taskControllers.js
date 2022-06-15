const {Task} = require('../models')
const createError = require('../util/createError')
const {DateTime} = require('luxon')

const week = DateTime.local().weekNumber;

exports.createTask = async (req, res, next) => {
    const {title, priority = 3, week} = req.body
    if (!title) {
        createError('Title required', 401) 
    }
    console.log(week)

    const task = await Task.create({
        title,
        priority,
        week,
      userId:2
    });

    res.status(201).json({ message: "Task created succesfully", task });
}

exports.getAllTasks = async (req, res, next) => {
//   const { userId } = req.body;
  const  userId  = 2
  try {
    const tasks = await Task.findAll(
        { where: { userId }, order: [['completed', 'ASC'],['priority', 'DESC'], ['createdAt', 'DESC']] });
    res.json({ tasks: tasks });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { userId } = req.body;
    const userId = 2
    const result = await Task.destroy({ where: { id, userId } });
    if (result === 0) {
      createError("No Task with this ID", 400);
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }}

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed, week, priority } = req.body;
    const userId = 2;
    const result = await Task.update(
      { title, completed, priority, week},
      { where: { id, userId } }
    );
    if (result[0] === 0) {
      createError('Task with this id is not found', 400)
    }
    res.json({message: 'Task updated succesfully'});
  } catch (err) {
    next(err)
  }
};

exports.getTaskCount = async (req, res, next) => {
    try {
        // console.log(week)
    const result = await Task.findAll({where: {'completed': true, 'week': week}});
    res.json({count:result.length})
    }
    catch (err) {
        next(err)
    }
}