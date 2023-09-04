"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post_controller");
const comment_controller_1 = require("../controllers/comment_controller");
const user_controller_1 = require("../controllers/user_controller");
const authMiddleware_1 = __importDefault(require("../controllers/authMiddleware"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "Hello from TSRouter" });
});
router.get("/posts", post_controller_1.posts_get);
router.post("/posts", authMiddleware_1.default, post_controller_1.post_create);
router.get("/comments", comment_controller_1.comments_get);
router.post("/log-in", user_controller_1.log_in);
router.get("/users", user_controller_1.users_get);
router.get("/issue", (req, res) => {
    res.send("Something went wrong!");
});
exports.default = router;
