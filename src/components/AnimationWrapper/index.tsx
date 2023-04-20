import { type ReactElement, useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import {
  NavigationType,
  useLocation,
  useNavigationType,
  useOutlet,
  type Location,
} from "react-router-dom";

export default function AnimationWrapper() {
  const stack = useStack();

  const transitions = useTransition(stack, {
    from: stack.length === 1 ? { x: "0%" } : { x: "100%" },
    enter: { x: "0%" },
    leave: {
      x: "100%",
    },
  });

  return transitions((style, item) => (
    <animated.div
      style={{
        ...style,
        position: "absolute",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {item.component}
    </animated.div>
  ));
}

type Stack = (Location & {
  component: ReactElement | null;
})[];
function useStack() {
  const location = useLocation();
  const outlet = useOutlet();
  const action = useNavigationType();
  const [stack, setStack] = useState<Stack>([]);

  useEffect(() => {
    setStack((prev) => {
      switch (action) {
        case NavigationType.Push: {
          return [...prev, { ...location, component: outlet }];
        }
        case NavigationType.Pop: {
          // pop the top element to display the element under it
          if (prev.at(-2)?.key === location.key) {
            // the user clicks the back button, pop the card at the top
            return prev.slice(0, -1);
          }
          if (prev.find((item) => item.key === location.key) === undefined) {
            // the page is first loaded
            // or
            // the user clicks the forward button
            return [...prev, { ...location, component: outlet }];
          }
          return prev.slice(0, -1);
        }
        default: {
          return prev;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, action]);

  return stack;
}
