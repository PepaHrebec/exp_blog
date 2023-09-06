import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import Post from "../models/post";
// import Comment from "../models/comment";

export const posts_get = async (req: Request, res: Response) => {
  try {
    const postsRes = await Post.find({});
    res.json(postsRes);
  } catch (error) {
    res.send(error);
  }
};

export const post_get = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const postRes = await Post.findById(postId);
    res.json(postRes);
  } catch (error) {
    res.send(error);
  }
};

export const post_create = [
  body("post_name").isString().escape().trim().isLength({ min: 1, max: 100 }),
  body("post_content").isString().escape().trim().isLength({ min: 1 }),
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    const post = new Post({
      post_name: req.body.post_name,
      post_content: req.body.post_content,
      timestamp: new Date(),
      // @ts-ignore (Replace soon!)
      author: req.user.id,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.json(error);
    }
  },
];

export const post_delete = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    // const commentRes = await Comment.deleteMany({ post: postId });
    const postRes = await Post.findByIdAndDelete(postId);
    res.send(`<pre>${postRes}</pre>`);
  } catch (error) {
    res.send(error);
  }
};
