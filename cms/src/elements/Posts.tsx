import { useLoaderData, Link } from "react-router-dom";
import * as dayjs from "dayjs";
import styles from "./posts.module.css";

interface IPost {
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

export default function Posts() {
  const posts = useLoaderData() as IPost[];

  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <p>{dayjs(post.timestamp).format("DD/MM/YYYY")}</p>
            <h2>{post.post_name}</h2>
            <p>Author: {post.author.username}</p>
            <p className={styles.content}>{post.post_content}</p>
            <Link to={`${post._id}`}>Link to the post</Link>
          </div>
        );
      })}
    </div>
  );
}
