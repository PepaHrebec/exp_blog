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
export async function logInLoader() {
  const status = await checkLoggedInStatus();
  if (status !== 200) {
    return null;
  } else {
    return redirect("/");
  }
}

export async function logOutLoader() {
  const logOut = await fetch("http://localhost:3000/log-out", {
    method: "POST",
    credentials: "include",
  });
  console.log(logOut);
  return redirect("/log-in");
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

  const [post, comments] = await Promise.all([
    fetch(`http://localhost:3000/posts/${postId}`).then((res) => res.json()),
    fetch(`http://localhost:3000/comments/${postId}`).then((res) => res.json()),
  ]);
  return [post, comments];
}
