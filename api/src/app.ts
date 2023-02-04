require("dotenv").config();
import express from "express";
import config from "config";
import mongoose from "mongoose";
import userRouter from "./userRouting";
import authenticationRouter from "./authenticationRouting";

const app = express();

// Body parser
app.use(express.json({ limit: "10kb" }));

// Allow all origins
//TODO: CHANGE FOR THE UI IP
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, PATCH");
  next();
});

mongoose.connect(
  `mongodb+srv://${config.get("mongoUser")}:${config.get(
    "mongoPassword"
  )}@cluster0.guz80.mongodb.net/nft-connector?retryWrites=true&w=majority`,
  {},
  () => {
    console.log("connected to database");
  }
);

mongoose.set("strictQuery", false);

// Routes
app.use("/users", userRouter);
app.use("/authentication", authenticationRouter);
const port = config.get<number>("port");
app.listen(port);

console.log(`Server started on port: ${port}`);
