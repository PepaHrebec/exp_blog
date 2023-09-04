import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import initPassport from "./lib/passport_config";
import router from "./lib/router";
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

initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(3000, () => {
  console.log("Server listens at port 3000");
});
