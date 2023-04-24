import { Link } from "react-router-dom";

import AnimateHeight from "@components/Tests/AnimateHeight";

function Messages() {
  return (
    <div
      style={{ height: "100%", overflow: "scroll", backgroundColor: "white" }}
    >
      <h1>I am the /messages Tab</h1>
      <Link to="1">to /messages/1</Link>
      <AnimateHeight />
    </div>
  );
}

export default Messages;
