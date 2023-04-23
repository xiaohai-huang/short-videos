import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

export default function AnimateHeight() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const transitions = useTransition(items, {
    from: { opacity: 1, height: "50%" },
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
        height: "100%",
        backgroundColor: "lightblue",
      }}
    >
      {transitions((styles, item) => (
        <animated.div style={styles} onClick={() => handleClick(item)}>
          <div
            style={{ border: "2px solid red", width: "100%", height: "100%" }}
          >
            {item}
          </div>
        </animated.div>
      ))}
    </div>
  );
}
