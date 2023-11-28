const express = require("express");
const router = express.Router();
const logController = require("../controllers/logControllers");
const getUserId = require("../middlewares/getUserId");

// router.get("/");
router.post("/", getUserId, logController.logTime);
router.get("/:weekId", getUserId, logController.getLog);
router.get("/home/category", getUserId, logController.getLogByCategory);
router.get("/analytics/sum", getUserId, logController.getSum);
router.get("/analytics/average", getUserId, logController.compareToAverage);
router.get("/graph/average", getUserId, logController.graphAverage);
router.get("/graph/category", getUserId, logController.graphCategory);

module.exports = router;
