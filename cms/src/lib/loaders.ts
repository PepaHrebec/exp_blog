import { Params, redirect } from "react-router-dom";

async function checkLoggedInStatus() {
  const resp = await fetch("http://localhost:3000/check", {
    method: "GET",
    credentials: "include",
  });
  console.log(resp);
  return resp.status;
}

// used for log-in route
export async function logInComponentLoader() {
  const status = await checkLoggedInStatus();
  if (status !== 200) {
    return null;
  } else {
    return redirect("/");
  }
}

// used for dashboard route
export async function dashboardLoader() {
  const status = await checkLoggedInStatus();
  if (status === 200) {
    return null;
  } else {
    return redirect("/log-in");
  }
}

export async function postsLoader() {
  const postsJSON = await fetch("http://localhost:3000/posts");
  const posts = await postsJSON.json();
  return posts;
}

export async function postLoader(params: Params) {
  const postId = params.postId;
  const postJSON = await fetch(`http://localhost:3000/posts/${postId}`);
  const post = await postJSON.json();
  return post;
}
