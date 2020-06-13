const express = require("express");
const controller = require("../controller");

const router = express.Router();
router.post("/add", controller.statistiques.add);
router.get("/", controller.statistiques.notify);
router.put("/update", controller.statistiques.update);
module.exports = router;
