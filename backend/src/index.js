const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
require("dotenv").config();
const userRoutes = require("./routes/post.js");


const app = express();

app.use(cors())


const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use("/api", userRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to my api");
});
console.log(process.env.MONGODB_URI);
//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDb Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port ", port));
