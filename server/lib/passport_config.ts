import bcrypt from "bcryptjs";
import { VerifyFunction } from "passport-local";
const LocalStrategy = require("passport-local").Strategy;
import User from "../models/user";
import { PassportStatic } from "passport";

function initPassport(passport: PassportStatic) {
  const authenticateUser: VerifyFunction = async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        }
        if (err) {
          return done(err);
        }
        return done(null, false, { message: "Incorrect password" });
      });
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

export default initPassport;
