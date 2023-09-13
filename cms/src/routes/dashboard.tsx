import { Link, Outlet } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <>
      <nav>
        <Link to={"/log-out"}>Log-out</Link>
      </nav>
      <Outlet />
    </>
  );
}
