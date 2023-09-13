import { Link, Outlet } from "react-router-dom";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <>
      <nav className={styles.dashNav}>
        <Link to={"/"}>JoeCMS</Link>
        <Link to={"/log-out"}>Log-out</Link>
      </nav>
      <Outlet />
    </>
  );
}
