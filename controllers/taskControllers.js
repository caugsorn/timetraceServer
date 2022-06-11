const {Task} = require('../models')
const createError = require('../util/createError')

exports.createTask = async (req, res, next) => {
    const {title, priority = 3} = req.body
    if (!title) {
        createError('Title required', 401) 
    }

    const task = await Task.create({
        title,
        priority,
      userId:2
    });
    res.status(201).json({ message: "Task created succesfully", task });
}

