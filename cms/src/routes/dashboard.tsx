import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <nav>
        <Link to={"/log-in"}>Log-in</Link>
      </nav>
      <h1>Dashboard</h1>
      <Outlet />
    </>
  );
}
