export interface IPost {
  _id: string;
  post_name: string;
  post_content: string;
  timestamp: Date;
  author: {
    _id: string;
    username: string;
    password: string;
  };
}

export interface IComment {
  comment_content: string;
  timestamp: Date;
  author: string;
  // post: Types.ObjectId;
}
