import { Form } from "react-router-dom";

export default function PostCreate() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="post_name">Post name</label>
        <input id="post_name" name="post_name" type="text" />
        <label htmlFor="post_content">Content:</label>
        <input id="post_content" name="post_content" type="text" />
        <button>Submit</button>
      </Form>
    </div>
  );
}
