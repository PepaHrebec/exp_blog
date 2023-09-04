import express from "express";
import { post_create, posts_get } from "../controllers/post_controller";
import { comments_get } from "../controllers/comment_controller";
import { users_get, log_in } from "../controllers/user_controller";
import checkIfLoggedIn from "../controllers/authMiddleware";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from TSRouter" });
});

router.get("/posts", posts_get);

router.post("/posts", checkIfLoggedIn, post_create);

router.get("/comments", comments_get);

router.post("/log-in", log_in);

router.get("/users", users_get);

router.get("/issue", (req, res) => {
  res.send("Something went wrong!");
});

export default router;
