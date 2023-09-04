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
exports.post_create = exports.posts_get = void 0;
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
const posts_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsRes = yield post_1.default.find({});
        res.send(`<pre>${postsRes}</pre>`);
    }
    catch (error) {
        res.send(error);
    }
});
exports.posts_get = posts_get;
exports.post_create = [
    (0, express_validator_1.body)("post_name").isString().escape().trim().isLength({ min: 1, max: 100 }),
    (0, express_validator_1.body)("post_content").isString().escape().trim().isLength({ min: 1 }),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const err = (0, express_validator_1.validationResult)(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ errors: err.array() });
        }
        const post = new post_1.default({
            post_name: req.body.post_name,
            post_content: req.body.post_content,
            timestamp: new Date(),
            // @ts-ignore (Replace soon!)
            author: req.user.id,
        });
        try {
            const savedPost = yield post.save();
            res.json(savedPost);
        }
        catch (error) {
            res.json(error);
        }
    }),
];
