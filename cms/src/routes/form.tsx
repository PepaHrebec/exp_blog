import { Form, redirect } from "react-router-dom";

export async function formAction({ request }: { request: Request }) {
  // "http://localhost:3000/posts/64f60c0187ab9c82a26dd27f/comment"
  const formData = await request.formData();
  for (const key of formData.keys()) {
    console.log(key, " - ", formData.get(key));
  }
  return redirect("/");
}

export default function TryForm() {
  return (
    <div>
      <Form method="post">
        <input name="comment_content" type="text" />
        <input name="author" type="text" />
        <button>Submit</button>
      </Form>
    </div>
  );
}
