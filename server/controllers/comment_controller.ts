import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Comment from "../models/comment";

export const comments_get = async (req: Request, res: Response) => {
  try {
    // const postId = req.params.id;
    const commentsRes = await Comment.find({}).populate("post");
    res.send(`<pre>${commentsRes}</pre>`);
  } catch (error) {
    res.send(error);
  }
};

export const comment_create = [
  body("comment_content")
    .isString()
    .escape()
    .trim()
    .isLength({ min: 1, max: 300 }),
  body("author").isString().escape().trim().isLength({ min: 1, max: 30 }),
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    const comment = new Comment({
      comment_content: req.body.comment_content,
      author: req.body.author,
      timestamp: new Date(),
      post: req.params.id,
    });
    try {
      const savedComment = await comment.save();
      res.json(savedComment);
    } catch (error) {
      res.json(error);
    }
  },
];

export const comment_delete = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const deleteRes = await Comment.deleteOne({ id: commentId });
    res.send(deleteRes);
  } catch (error) {
    res.send(error);
  }
};
