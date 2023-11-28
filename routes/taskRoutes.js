const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const getUserId = require("../middlewares/getUserId");

router.post("/", getUserId, taskController.createTask);
router.patch("/:id", getUserId, taskController.updateTask);
router.delete("/:id", getUserId, taskController.deleteTask);
router.get("/", getUserId, taskController.getAllTasks);
router.get("/count", getUserId, taskController.getTaskCount);

module.exports = router;
