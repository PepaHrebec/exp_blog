import { Form, useLoaderData } from "react-router-dom";

interface IPost {
  _id: string;
  post_name: string;
  post_content: string;
  timestamp: Date;
  author: number;
}

export default function PostUpdate() {
  const post = useLoaderData() as IPost[];
  console.log(post);

  return (
    <div>
      <Form method="post">
        <label htmlFor="post_name">Post name</label>
        <input
          id="post_name"
          name="post_name"
          type="text"
          defaultValue={post[0].post_name}
        />
        <label htmlFor="post_content">Content:</label>
        <input
          id="post_content"
          name="post_content"
          type="text"
          defaultValue={post[0].post_content}
        />
        <input type="text" name="postId" defaultValue={post[0]._id} hidden />
        <button name="actionType" value={"submit"}>
          Submit
        </button>
        <button name="actionType" value={"delete"}>
          Delete
        </button>
      </Form>
    </div>
  );
}
