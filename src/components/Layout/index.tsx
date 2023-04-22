import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import LoadingBar from "@components/LoadingBar/LoadingBar";

import styles from "./index.module.css";
import HomeIconFilled from "./nav-icons/home-filled.svg";
import HomeIconOutline from "./nav-icons/home-outline.svg";

import CommentIconOutline from "./nav-icons/comment-outline.svg";
import CommentIconFilled from "./nav-icons/comment-filled.svg";

import UserIconOutline from "./nav-icons/user-outline.svg";
import UserIconFilled from "./nav-icons/user-filled.svg";

const ROUTES = [
  { to: "/", label: "Home", icon: HomeIconOutline, activeIcon: HomeIconFilled },
  {
    to: "/messages",
    label: "Messages",
    icon: CommentIconOutline,
    activeIcon: CommentIconFilled,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: UserIconOutline,
    activeIcon: UserIconFilled,
  },
] as const;

// footer height in px
const FOOTER_HEIGHT = 60;

function Layout() {
  const location = useLocation();
  // Only show footer when the current route is one of the four main routes
  const showFooter = !!ROUTES.find((route) => route.to === location.pathname);
  const transitions = useTransition(showFooter, {
    from: { height: `${FOOTER_HEIGHT / 2}px` },
    enter: { height: `${FOOTER_HEIGHT}px` },
    leave: { height: "0px" },
  });
  return (
    <div
      className={styles.container}
      // @ts-ignore
      style={{ "--footer-height": `${FOOTER_HEIGHT}px` }}
    >
      <div className={styles.content}>
        <Outlet />
      </div>
      {transitions(
        (style, show) =>
          show && (
            <animated.div style={style}>
              <footer className={styles.footer}>
                <LoadingBar className={styles.loadingBar} loading />
                {ROUTES.map((route) => (
                  <NavLink key={route.to} to={route.to}>
                    {({ isActive }) => (
                      <div
                        className={`${styles.navItem} ${
                          isActive ? styles.active : ""
                        }`}
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
            </animated.div>
          )
      )}
    </div>
  );
}

export default Layout;
