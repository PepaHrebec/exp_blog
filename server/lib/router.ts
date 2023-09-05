import express from "express";
import {
  post_create,
  post_delete,
  post_get,
  posts_get,
} from "../controllers/post_controller";
import {
  comment_create,
  test_comments_get,
  comment_delete,
  comments_get,
} from "../controllers/comment_controller";
import { users_get, log_in, log_out } from "../controllers/user_controller";
import checkIfLoggedIn from "./authMiddleware";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from TSRouter" });
});

router.get("/posts", posts_get);

router.post("/posts", checkIfLoggedIn, post_create);

router.get("/post/:id", post_get);

router.post("/post/:id/delete", checkIfLoggedIn, post_delete);

router.post("/post/:id/comment", comment_create);

router.get("/comments", test_comments_get);

router.get("/comments/:postId", comments_get);

router.post("/comment/:id/delete", comment_delete);

router.get("/users", users_get);

router.post("/log-in", log_in);

router.post("/log-out", log_out);

router.get("/issue", (req, res) => {
  res.send("Something went wrong!");
});

export default router;
