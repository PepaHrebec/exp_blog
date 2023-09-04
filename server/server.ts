import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
require("dotenv").config();

const app = express();

// const mongoDB: string = process.env.PASSWD || "";
// mongoose.connect(mongoDB);

app.use(
  session({ secret: "supersecret", resave: false, saveUninitialized: false })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server listens at port 3000");
});
