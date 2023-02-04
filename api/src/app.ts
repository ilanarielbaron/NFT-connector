require("dotenv").config();
import express from "express";
import config from "config";
import mongoose from "mongoose";
import router from "./routes";

const app = express();

// Body parser
app.use(express.json({ limit: "10kb" }));

// Allow all origins
//TODO: CHANGE FOR THE UI IP
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, PATCH");
  next();
});

mongoose.connect(
  `mongodb+srv://${config.get("mongoUser")}:${config.get(
    "mongoPassword"
  )}@cluster0.guz80.mongodb.net/?retryWrites=true&w=majority`,
  {},
  () => {
    console.log("connected to database");
  }
);

// Routes
app.use("/users", router);
const port = config.get<number>("port");
app.listen(port);

console.log(`Server started on port: ${port}`);
