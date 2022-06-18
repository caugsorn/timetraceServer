const express = require("express");
const router = express.Router();
const logController = require('../controllers/logControllers')

// router.get("/");
router.post('/',logController.logTime)
router.get('/:weekId', logController.getLog)
router.get('/home/category', logController.getLogByCategory)
router.get('/analytics/sum', logController.getSum)
router.get('/analytics/average', logController.compareToAverage)
router.get('/graph/average', logController.graphAverage)
router.get('/graph/category', logController.graphCategory)


module.exports = router;