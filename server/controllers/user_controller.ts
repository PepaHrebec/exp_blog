import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import passport from "passport";
import User from "../models/user";
import bcrypt from "bcryptjs";

export const users_get = async (req: Request, res: Response) => {
  try {
    const usersRes = await User.find({});
    res.send(`<pre>${usersRes}</pre>`);
  } catch (error) {
    res.send(error);
  }
};

// {"username":"newJoe","password":"heslo"}

export const user_sign_up = [
  body("username").trim().escape().isLength({ min: 3, max: 100 }),
  body("password").trim().escape().isLength({ min: 3, max: 100 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(401).json(errs);
    }
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(401).json({ message: "User already exists!" });
    }
    const newUser = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    });
    try {
      const userRtrn = await newUser.save();
      return res.json({ user: userRtrn });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  },
];

export const log_in = [
  body("username").trim().escape().isLength({ min: 3, max: 100 }),
  body("password").trim().escape().isLength({ min: 3, max: 100 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(401).json(errs);
    }
    passport.authenticate("local")(req, res, next);
  },
  function (req: Request, res: Response) {
    return res.status(200).json({ message: "Logged in!" });
  },
];

export const log_out = (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
