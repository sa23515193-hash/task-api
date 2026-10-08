const Task = require("../models/Task");


// GET ALL TASKS
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });

  } catch (error) {
    next(error);
  }
};


// GET SINGLE TASK
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    res.status(200).json({
      success: true,
      task
    });

  } catch (error) {
    next(error);
  }
};


// CREATE TASK
exports.createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status
    } = req.body;

    if (!title || title.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "A valid title is required."
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task
    });

  } catch (error) {
    next(error);
  }
};


// UPDATE TASK
exports.updateTask = async (req, res, next) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "status"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (
      updates.title &&
      updates.title.trim().length < 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Title must contain at least 2 characters."
      });
    }

    const task =
      await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id
        },
        updates,
        {
          new: true,
          runValidators: true
        }
      );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task
    });

  } catch (error) {
    next(error);
  }
};


// DELETE TASK
exports.deleteTask = async (req, res, next) => {
  try {
    const task =
      await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully."
    });

  } catch (error) {
    next(error);
  }
};
