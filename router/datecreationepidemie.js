const express = require("express");
const controler = require("../controller");

const routers = express.Router();
routers.post("/add", controler.datecreationepidemies.add);
routers.put("/update", controler.datecreationepidemies.update);
routers.get("/", controler.datecreationepidemies.notify);
module.exports = routers;
