const express = require("express");
const bodyparse = require("body-parser");
const rouuter = require("./router");
const port = process.env.port || 3000;

const app = express();

app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());

app.get("/", function (req, res) {
  res.send("Welcom");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
