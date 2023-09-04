"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const LocalStrategy = require("passport-local").Strategy;
const user_1 = __importDefault(require("../models/user"));
function initPassport(passport) {
    const authenticateUser = (username, password, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            bcryptjs_1.default.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                }
                if (err) {
                    return done(err);
                }
                return done(null, false, { message: "Incorrect password" });
            });
        }
        catch (error) {
            return done(error);
        }
    });
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(function (id, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(id);
                done(null, user);
            }
            catch (err) {
                done(err);
            }
        });
    });
}
exports.default = initPassport;
