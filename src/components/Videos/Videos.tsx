import Video from "@components/Video/Video";
import { useRef, useState } from "react";
import styles from "./Videos.module.css";

type VideoData = {
  id: string;
  src: string;
};

const data: VideoData[] = [
  {
    id: "first",
    src: "https://storage.xiaohai-huang.net/random/videos/edited.mp4",
  },
  {
    id: "second",
    src: "https://assets.mixkit.co/videos/preview/mixkit-hand-takes-a-chocolate-bunny-from-beneath-the-bush-48604-large.mp4",
  },
  {
    id: "third",
    src: "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4",
  },
  {
    id: "4",
    src: "https://storage.xiaohai-huang.net/random/videos/The%20People%20Pleaser%20shorts.mp4",
  },
  {
    id: "5",
    src: "https://storage.xiaohai-huang.net/random/videos/Y2Mate.is%20-%20respect%20%F0%9F%92%AF%F0%9F%98%8D%F0%9F%98%B1%F0%9F%A5%B6-q1tK3aqNxUI-720p-1656406884815.mp4",
  },
];

function getActiveVideoIndex(container: HTMLDivElement) {
  const index = Math.round(container.scrollTop / container.clientHeight);
  return index;
}

export default function Videos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideoId, setActiveVideoId] = useState(data[0].id);

  const handleOnScroll = () => {
    if (containerRef.current) {
      const index = getActiveVideoIndex(containerRef.current);
      const id = data[index].id;
      setActiveVideoId(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onScroll={handleOnScroll}
    >
      {data.map((item) => (
        <Video
          key={item.id}
          src={item.src}
          active={item.id === activeVideoId}
        />
      ))}
    </div>
  );
}
