import { redirect } from "react-router-dom";

async function checkLoggedInStatus() {
  const resp = await fetch("http://localhost:3000/check", {
    method: "GET",
    credentials: "include",
  });
  console.log(resp);
  return resp.status;
}

export async function loggedInLoader() {
  const status = await checkLoggedInStatus();
  if (status === 200) {
    return redirect("/dashboard");
  } else {
    return redirect("/log-in");
  }
}

export async function dashboardLoader() {
  const status = await checkLoggedInStatus();
  if (status === 200) {
    return { message: "Gello" };
  } else {
    return redirect("/log-in");
  }
}

export async function logInLoader() {
  const status = await checkLoggedInStatus();
  if (status !== 200) {
    return { message: "Gello" };
  } else {
    return redirect("/dashboard");
  }
}
