const express = require("express");
const router = express.Router();
const logController = require('../controllers/logControllers')

// router.get("/");
router.post('/',logController.logTime)
router.get('/sum', logController.getSum)
router.get('/average', logController.compareToAverage)
router.get('/graph/average', logController.graphAverage)
router.get('/graph/category', logController.graphCategory)


module.exports = router;
