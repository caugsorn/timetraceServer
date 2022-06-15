const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskControllers')

router.post("/", taskController.createTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get("/", taskController.getAllTasks);
router.get("/count" , taskController.getTaskCount);

module.exports = router;
