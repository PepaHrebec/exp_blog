import { Form } from "react-router-dom";

export default function LogInForm() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" />
        <button>Submit</button>
      </Form>
    </div>
  );
}
