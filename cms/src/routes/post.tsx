import { useLoaderData } from "react-router-dom";

interface IPost {
  id: number;
  post_name: string;
  post_content: string;
  timestamp: Date;
  author: number;
}

export default function Post() {
  const post = useLoaderData() as IPost;

  return (
    <div>
      <h1>{post.post_name}</h1>
      <p>Author: {post.author}</p>
      <p>{post.post_content}</p>
    </div>
  );
}
