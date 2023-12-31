import { redirect } from "react-router-dom";

export async function logInAction({ request }: { request: Request }) {
  const reqObj = await request.formData();
  const body = Object.fromEntries(reqObj);
  const bodyJSON = JSON.stringify(body);

  const resp = await fetch("http://localhost:3000/log-in", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJSON,
  });
  console.log(resp);
  const validResp = await resp.json();
  console.log(validResp);
  if (resp.status === 200) {
    return redirect("/");
  }
  return redirect("/log-in");
}

export async function postCreateAction({ request }: { request: Request }) {
  const reqObj = await request.formData();
  const body = Object.fromEntries(reqObj);
  const bodyJSON = JSON.stringify(body);
  const resp = await fetch("http://localhost:3000/posts", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJSON,
  });
  console.log(resp);
  const validResp = await resp.json();
  console.log(validResp);
  if (resp.status === 200) {
    return redirect(`/posts/${validResp._id}`);
  }
  return redirect("/posts/create");
}

export async function delCommentAction({ request }: { request: Request }) {
  const reqObj = await request.formData();
  const commentId = reqObj.get("commentId");
  const resp = await fetch(
    `http://localhost:3000/comments/${commentId}/delete`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(resp);
  const validResp = await resp.json();
  console.log(validResp);
  return null;
}

export async function updateActions({ request }: { request: Request }) {
  const reqObj = await request.formData();
  if (reqObj.get("actionType") === "delete") {
    const resp = await fetch(
      `http://localhost:3000/posts/${reqObj.get("postId")}/delete`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(resp);
    const validResp = await resp.json();
    console.log(validResp);
    if (resp.status === 200) {
      return redirect(`/posts/`);
    }
    return redirect("/posts/");
  } else {
    const body = Object.fromEntries(reqObj);
    const bodyJSON = JSON.stringify(body);
    const resp = await fetch(
      `http://localhost:3000/posts/${reqObj.get("postId")}/update`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyJSON,
      }
    );
    console.log(resp);
    const validResp = await resp.json();
    console.log(validResp);
    if (resp.status === 200) {
      return redirect(`/posts/${reqObj.get("postId")}`);
    }
    return redirect("/posts/");
  }
}
