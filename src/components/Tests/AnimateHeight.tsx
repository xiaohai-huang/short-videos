import React, { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

export default function AnimateHeight() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const transitions = useTransition(items, {
    from: { opacity: 1, height: "0%" },
    enter: { opacity: 1, height: "100%" },
    leave: { opacity: 0, height: "0%" },
  });

  const handleClick = (itemToDelete: string) => {
    setItems((items) => items.filter((item, i) => item !== itemToDelete));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "200px",
        backgroundColor: "lightblue",
      }}
    >
      {transitions((styles, item) => (
        <animated.div
          style={{ ...styles, border: "2px solid red" }}
          onClick={() => handleClick(item)}
        >
          {item}
        </animated.div>
      ))}
    </div>
  );
}
