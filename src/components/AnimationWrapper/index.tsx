import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import {
  NavigationType,
  useLocation,
  useNavigationType,
  useOutlet,
} from "react-router-dom";

export default function AnimationWrapper() {
  const location = useLocation();
  const outlet = useOutlet();
  const [elements, setElements] = useState(() => ({
    [location.pathname]: outlet,
  }));
  const action = useNavigationType();
  const pushConfig = {
    from: { x: "100%", zIndex: 2 },
    enter: { x: "0%" },
    leave: {
      x: "0.0001%",
      zIndex: 1,
    },
  };

  const popConfig = {
    from: { x: "0%" },
    enter: { x: "0%" },
    leave: { x: "100%", zIndex: 2 },
  };

  const transitions = useTransition(location.pathname, {
    ...(action === NavigationType.Push ? pushConfig : popConfig),
    onStart: () => {
      setElements((prev) => ({ ...prev, [location.pathname]: outlet }));
    },
  });

  return transitions((style, pathname) => (
    <animated.div
      style={{
        ...style,
        position: "absolute",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {elements[pathname]}
    </animated.div>
  ));
}
