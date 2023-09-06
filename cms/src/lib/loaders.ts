import { redirect } from "react-router-dom";

export async function loggedInLoader() {
  const resp = await fetch("http://localhost:3000/check", {
    method: "GET",
    credentials: "include",
  });
  console.log(resp);
  if (resp.status !== 401) {
    return redirect("/dashboard");
  } else {
    return redirect("/log-in");
  }
}

export function dashboardLoader() {}
