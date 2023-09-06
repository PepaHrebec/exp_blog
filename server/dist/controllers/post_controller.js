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
exports.post_delete = exports.post_create = exports.post_get = exports.posts_get = void 0;
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
// import Comment from "../models/comment";
const posts_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsRes = yield post_1.default.find({});
        res.json(postsRes);
    }
    catch (error) {
        res.send(error);
    }
});
exports.posts_get = posts_get;
const post_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const postRes = yield post_1.default.findById(postId);
        res.json(postRes);
    }
    catch (error) {
        res.send(error);
    }
});
exports.post_get = post_get;
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
const post_delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        // const commentRes = await Comment.deleteMany({ post: postId });
        const postRes = yield post_1.default.findByIdAndDelete(postId);
        res.send(`<pre>${postRes}</pre>`);
    }
    catch (error) {
        res.send(error);
    }
});
exports.post_delete = post_delete;
