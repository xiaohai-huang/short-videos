import useTitle from "@utils/useTitle";
import { Link, useParams } from "react-router-dom";

const COLORS = [
  "#9DA5F3",
  "#84FFCC",
  "#4BFF8C",
  "#A842C8",
  "#FFD1AE",
  "#4E694B",
  "#7F98CE",
  "#918F79",
  "#A0A95E",
  "#160593",
];

function AnimationDetails() {
  const { id } = useParams();
  useTitle(`Title: ${id}`);
  return (
    <div
      style={{
        backgroundColor: COLORS[Number(id)],
        width: "100%",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <h1 style={{ fontSize: "80px", textAlign: "center" }}>{id}</h1>
      <textarea />
      {COLORS.map((_, i) => (
        <div key={i} style={{ fontSize: "60px" }}>
          <Link to={`../${i}`}>to /{i}</Link>
        </div>
      ))}
    </div>
  );
}

export default AnimationDetails;
