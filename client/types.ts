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
