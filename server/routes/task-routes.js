const express = require("express");
const TaskRouter = express.Router();
const {
  addNewTask,
  getAllTask,
  deleteTask,
  updateTask,
} = require("../controllers/task-controller");

TaskRouter.get("/get-all-task/:id", getAllTask);
TaskRouter.post("/add-new-task", addNewTask);
TaskRouter.put("/update-task", updateTask);
TaskRouter.delete("/delete-task/:id", deleteTask);

module.exports = TaskRouter;
