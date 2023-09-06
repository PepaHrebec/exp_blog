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
exports.log_out = exports.log_in = exports.user_sign_up = exports.users_get = void 0;
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersRes = yield user_1.default.find({});
        res.send(`<pre>${usersRes}</pre>`);
    }
    catch (error) {
        res.send(error);
    }
});
exports.users_get = users_get;
// {"username":"josefhrebec@mail.com","password":"tajneHeslo"}
// {"username":"newJoe","password":"heslo"}
exports.user_sign_up = [
    (0, express_validator_1.body)("username").trim().escape().isLength({ min: 3, max: 100 }),
    (0, express_validator_1.body)("password").trim().escape().isLength({ min: 3, max: 100 }),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errs = (0, express_validator_1.validationResult)(req);
        if (!errs.isEmpty()) {
            return res.status(401).json(errs);
        }
        const user = yield user_1.default.findOne({ username: req.body.username });
        if (user) {
            return res.status(401).json({ message: "User already exists!" });
        }
        const newUser = new user_1.default({
            username: req.body.username,
            password: yield bcryptjs_1.default.hash(req.body.password, 10),
        });
        try {
            const userRtrn = yield newUser.save();
            return res.json({ user: userRtrn });
        }
        catch (error) {
            return res.status(400).json({ error: error });
        }
    }),
];
exports.log_in = [
    (0, express_validator_1.body)("username").trim().escape().isLength({ min: 3, max: 100 }),
    (0, express_validator_1.body)("password").trim().escape().isLength({ min: 3, max: 100 }),
    (req, res, next) => {
        const errs = (0, express_validator_1.validationResult)(req);
        if (!errs.isEmpty()) {
            return res.status(401).json(errs);
        }
        passport_1.default.authenticate("local")(req, res, next);
    },
    function (req, res) {
        return res.status(200).json({ message: "Logged in!" });
    },
];
const log_out = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
exports.log_out = log_out;
