"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post_controller");
const comment_controller_1 = require("../controllers/comment_controller");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "Hello from TSRouter" });
});
router.get("/posts", post_controller_1.posts_get);
router.get("/comments", comment_controller_1.comments_get);
exports.default = router;
