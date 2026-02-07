const express = require("express")
const app = express();


app.use(express.json())
console.log("hello");
app.use("/api/user",require("./routes/userRoutes"))
module.exports = app;