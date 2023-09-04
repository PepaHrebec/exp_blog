import { ExpressValidator } from "express-validator";
import { Request, Response } from "express";
import Post from "../models/post";

export const posts_get = async (req: Request, res: Response) => {
  try {
    const postsRes = await Post.find({});
    res.send(`<pre>${postsRes}</pre>`);
  } catch (error) {
    res.send(error);
  }
};
