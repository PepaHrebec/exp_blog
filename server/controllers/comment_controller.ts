import { Request, Response } from "express";
import Comment from "../models/comment";

export const comments_get = async (req: Request, res: Response) => {
  try {
    const commentsRes = await Comment.find({}).populate("author");
    res.send(`<pre>${commentsRes}</pre>`);
  } catch (error) {
    res.send(error);
  }
};
