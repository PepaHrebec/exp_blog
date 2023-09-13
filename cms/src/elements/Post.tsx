import { Form, useLoaderData } from "react-router-dom";

interface IPost {
  _id: string;
  post_name: string;
  post_content: string;
  timestamp: Date;
  author: number;
}

interface IComment {
  _id: string;
  comment_content: string;
  timestamp: Date;
  author: string;
  post: string;
}

export default function Post() {
  const [post, comments] = useLoaderData() as [IPost, IComment[]];

  return (
    <div>
      <h1>{post.post_name}</h1>
      <p>Author: {post.author}</p>
      <p>{post.post_content}</p>
      <h2>Comments:</h2>
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>Author: {comment.author}</p>
              <p>{comment.comment_content}</p>
              <Form method="POST">
                <input
                  type="text"
                  name="commentId"
                  defaultValue={comment._id}
                  hidden
                />
                <button>Delete Comment</button>
              </Form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
