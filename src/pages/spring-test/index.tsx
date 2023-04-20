import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SpringTest() {
  return (
    <div
      style={{ backgroundColor: "lightblue", width: "100%", height: "100%" }}
    >
      <input />
      <div style={{ paddingTop: "100px" }} />
      <h1>First page</h1>
      <AnimatedHelloWorld />
      <div style={{ marginTop: "100px" }} />

      <Link to="../second">to ./second</Link>
    </div>
  );
}

function AnimatedHelloWorld() {
  const [show, setShow] = useState(true);
  const style = useSpring({
    opacity: show ? 1 : 0,
  });

  return (
    <animated.div onClick={() => setShow((prev) => !prev)} style={style}>
      Hello World
    </animated.div>
  );
}
