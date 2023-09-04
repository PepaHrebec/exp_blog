import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

interface IComment {
  comment_content: string;
  timestamp: Date;
  author: string;
  post: Types.ObjectId;
}

const CommentSchema = new Schema<IComment>({
  comment_content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
