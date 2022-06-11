const express = require("express");
const router = express.Router();
const timeController = require('../controllers/timeControllers')

// router.get("/");
router.post('/',timeController.logTime)

module.exports = router;
