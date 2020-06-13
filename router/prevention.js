const express = require("express");
const controllers = require("../controller");

const routeurs = express.Router();
routeurs.post("/add", controllers.preventions.add);
routeurs.get("/", controllers.preventions.notify);
routeurs.put("/update", controllers.preventions.update);
module.exports = routeurs;
