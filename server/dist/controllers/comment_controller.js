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
exports.comment_delete = exports.comment_create = exports.comments_get = exports.test_comments_get = void 0;
const express_validator_1 = require("express-validator");
const comment_1 = __importDefault(require("../models/comment"));
const test_comments_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const postId = req.params.id;
        const commentsRes = yield comment_1.default.find({}).populate("post");
        res.send(`<pre>${commentsRes}</pre>`);
    }
    catch (error) {
        res.send(error);
    }
});
exports.test_comments_get = test_comments_get;
const comments_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const commentsRes = yield comment_1.default.find({ post: postId });
        res.json(commentsRes);
    }
    catch (error) {
        res.send(error);
    }
});
exports.comments_get = comments_get;
exports.comment_create = [
    (0, express_validator_1.body)("comment_content")
        .isString()
        .escape()
        .trim()
        .isLength({ min: 1, max: 300 }),
    (0, express_validator_1.body)("author").isString().escape().trim().isLength({ min: 1, max: 30 }),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const err = (0, express_validator_1.validationResult)(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ errors: err.array() });
        }
        const comment = new comment_1.default({
            comment_content: req.body.comment_content,
            author: req.body.author,
            timestamp: new Date(),
            post: req.params.id,
        });
        try {
            const savedComment = yield comment.save();
            res.json(savedComment);
        }
        catch (error) {
            res.json(error);
        }
    }),
];
const comment_delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const deleteRes = yield comment_1.default.deleteOne({ _id: commentId });
        res.send(deleteRes);
    }
    catch (error) {
        res.send(error);
    }
});
exports.comment_delete = comment_delete;
