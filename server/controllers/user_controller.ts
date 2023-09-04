import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import passport from "passport";
import User from "../models/user";

export const users_get = async (req: Request, res: Response) => {
  try {
    const usersRes = await User.find({});
    res.send(`<pre>${usersRes}</pre>`);
  } catch (error) {
    res.send(error);
  }
};

// {"username":"josefhrebec@mail.com","password":"tajneHeslo"}

export const log_in = [
  body("username").trim().escape().isLength({ min: 3, max: 100 }),
  body("password").trim().escape().isLength({ min: 3, max: 100 }),
  (req: Request, res: Response) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      res.json(errs);
    }
    passport.authenticate("local", {
      successRedirect: "/users",
      failureRedirect: "/issue",
    })(req, res);
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
