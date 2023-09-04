"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentSchema = new Schema({
    comment_content: { type: String, required: true },
    timestamp: { type: Date, required: true },
    author: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});
const Comment = mongoose_1.default.model("Comment", CommentSchema);
exports.default = Comment;
