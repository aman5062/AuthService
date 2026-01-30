const app = require('express')();

app.use("/auth",require("./auth"))
app.use("/admin",require("./admin"))

module.exports = app