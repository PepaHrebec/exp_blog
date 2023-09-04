import { Request, Response, NextFunction } from "express";

const checkIfLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect("/issue");
};

export default checkIfLoggedIn;
