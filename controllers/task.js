import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/tasks.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.gourav });

    res.status(200).json({
      success: true,
      message: "task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const myTask = async (req, res, next) => {
  try {
    const userID = req.gourav._id;

    const Tasks = await Task.find({ user: userID });

    res.status(200).json({
      success: true,
      Tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("invalid id or Task Deleted", 404));
    task.isCompleted = !task.isCompleted;

    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("invalid id or Task Deleted", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
