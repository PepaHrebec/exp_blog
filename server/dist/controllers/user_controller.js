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
exports.log_out = exports.log_in = exports.users_get = void 0;
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
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
exports.log_in = [
    (0, express_validator_1.body)("username").trim().escape().isLength({ min: 3, max: 100 }),
    (0, express_validator_1.body)("password").trim().escape().isLength({ min: 3, max: 100 }),
    (req, res) => {
        const errs = (0, express_validator_1.validationResult)(req);
        if (!errs.isEmpty()) {
            res.json(errs);
        }
        passport_1.default.authenticate("local", {
            successRedirect: "/users",
            failureRedirect: "/issue",
        })(req, res);
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
