import LoadingBar from "@components/LoadingBar/LoadingBar";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./index.module.css";
import HomeIconFilled from "./nav-icons/home-filled.svg";
import HomeIconOutline from "./nav-icons/home-outline.svg";

import CommentIconOutline from "./nav-icons/comment-outline.svg";
import CommentFilled from "./nav-icons/comment-filled.svg";

const ROUTES = [
  { to: "/", label: "Home", icon: HomeIconOutline, activeIcon: HomeIconFilled },
  {
    to: "/messages",
    label: "Messages",
    icon: CommentIconOutline,
    activeIcon: CommentFilled,
  },
];

function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <footer className={styles.footer}>
        <LoadingBar className={styles.loadingBar} loading />
        {ROUTES.map((route) => (
          <NavLink key={route.to} to={route.to}>
            {({ isActive }) => (
              <div
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                <img
                  width="28px"
                  height="28px"
                  src={isActive ? route.activeIcon : route.icon}
                  alt={route.label}
                />
                <span>{route.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </footer>
    </div>
  );
}

export default Layout;
