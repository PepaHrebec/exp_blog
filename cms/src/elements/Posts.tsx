import { useLoaderData, Link } from "react-router-dom";
import styles from "./posts.module.css";

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
    <div className={styles.postList}>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <h2>{post.post_name}</h2>
            <p>Author: {post.author}</p>
            <p className={styles.content}>{post.post_content}</p>
            <Link to={`${post._id}`}>Link to the post</Link>
          </div>
        );
      })}
    </div>
  );
}
