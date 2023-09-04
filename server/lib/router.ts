import express from "express";
import { posts_get } from "../controllers/post_controller";
import { comments_get } from "../controllers/comment_controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from TSRouter" });
});

router.get("/posts", posts_get);

router.get("/comments", comments_get);

export default router;
