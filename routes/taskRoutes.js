const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskControllers')

router.post("/", taskController.createTask);
router.patch("/");
router.delete("/:id");
router.get("/");

module.exports = router;
