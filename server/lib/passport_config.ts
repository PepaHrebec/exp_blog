import * as localStrategy from "passport-local";
import { VerifyFunction } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { PassportStatic } from "passport";

const LocalStrategy = localStrategy.Strategy;

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
