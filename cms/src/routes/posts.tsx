import { useLoaderData, Link } from "react-router-dom";

interface IPost {
  _id: number;
  post_name: string;
  post_content: string;
  timestamp: Date;
  author: number;
}

export default function Posts() {
  const posts = useLoaderData() as IPost[];

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <h1>{post.post_name}</h1>
            <p>Author: {post.author}</p>
            <p>{post.post_content}</p>
            <Link to={`${post._id}`}>Link to the post</Link>
          </div>
        );
      })}
    </div>
  );
}
