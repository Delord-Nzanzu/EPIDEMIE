const express = require("express");
const controllers = require("../controller");
const routers = express.Router();

routers.post("/add", controllers.expidemies.add);
routers.get("/search", controllers.expidemies.seach);
routers.put("/update", controllers.expidemies.update);
routers.get("/", controllers.expidemies.notify);

module.exports = routers;
