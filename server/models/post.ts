import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

interface IPost {
  post_name: string;
  post_content: string;
  timestamp: Date;
  author: Types.ObjectId;
  comments: Types.ObjectId[];
}

const PostSchema = new Schema<IPost>({
  post_name: { type: String, required: true, maxLength: 100 },
  post_content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
