import Video from "@components/Video/Video";
import { useEffect, useRef, useState } from "react";
import styles from "./Videos.module.css";

type VideoData = {
  id: string;
  src: string;
};

const data: VideoData[] = [
  {
    id: "zero",
    src: "https://storage.xiaohai-huang.net/random/videos/Did%20you%20know%20you%20are%20using%20these%20right%20now_%20%23shorts.mp4",
  },
  {
    id: "one",
    src: "https://assets.mixkit.co/videos/preview/mixkit-hand-takes-a-chocolate-bunny-from-beneath-the-bush-48604-large.mp4",
  },
  {
    id: "two",
    src: "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4",
  },
  {
    id: "three",
    src: "https://storage.xiaohai-huang.net/random/videos/The%20People%20Pleaser%20shorts.mp4",
  },
  {
    id: "four",
    src: "https://storage.xiaohai-huang.net/random/videos/Y2Mate.is%20-%20respect%20%F0%9F%92%AF%F0%9F%98%8D%F0%9F%98%B1%F0%9F%A5%B6-q1tK3aqNxUI-720p-1656406884815.mp4",
  },
  {
    id: "five",
    src: "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4",
  },
  {
    id: "six",
    src: "https://storage.xiaohai-huang.net/random/videos/Friends%20%E2%9D%A4%EF%B8%8F%F0%9F%98%81%40loganpaulvlogs%20%40FriendlyNeighborhoodEvan.mp4",
  },
];

// odd number only
const MAX_PLAYERS = 3;

function isPlayerLive(activeVideoIndex: number, index: number) {
  const extra = Math.floor((MAX_PLAYERS - 1) / 2);
  const live =
    activeVideoIndex - extra <= index && index <= activeVideoIndex + extra;

  return live;
}

function getActiveVideoIndex(container: HTMLDivElement) {
  const index = Math.round(container.scrollTop / container.clientHeight);
  return index;
}

function getVideos(offset: number = 0) {
  return new Promise<VideoData[]>((resolve) => {
    setTimeout(() => {
      resolve(data.map((item) => ({ ...item, id: `${offset}-${item.id}` })));
    }, 0);
  });
}

function shouldLoadMore(activeVideoIndex: number, numVideos: number) {
  if (activeVideoIndex === -1) return false;

  return activeVideoIndex >= numVideos - 3;
}

export default function Videos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [activeVideoIndex, setActiveVideoIndex] = useState(-1);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pendingVideos, setPendingVideos] = useState<VideoData[]>([]);
  const [scrolling, setScrolling] = useState(false);

  const updateActiveVideo = (videos: VideoData[]) => {
    if (containerRef.current) {
      const index = getActiveVideoIndex(containerRef.current);
      const id = videos[index].id;
      setActiveVideoId(id);
      setActiveVideoIndex(index);
    }
  };

  const handleOnScroll = () => {
    updateActiveVideo(videos);
    if (containerRef.current) {
      if (
        Math.round(containerRef.current.scrollTop) %
          containerRef.current.clientHeight ===
        0
      ) {
        setScrolling(false);
      } else {
        setScrolling(true);
      }
    }
  };

  useEffect(() => {
    if (shouldLoadMore(activeVideoIndex, videos.length)) {
      setOffset((prev) => prev + 10);
    }
  }, [activeVideoIndex, videos.length]);

  // fetch more videos
  useEffect(() => {
    let mount = true;
    setLoading(true);
    getVideos(offset)
      .then((data) => {
        if (!mount) return;
        setPendingVideos(data);
      })
      .finally(() => setLoading(false));

    return () => {
      mount = false;
    };
  }, [offset]);

  useEffect(() => {
    if (!scrolling && pendingVideos.length) {
      setTimeout(() => {
        setVideos((prev) => [...prev.slice(-5), ...pendingVideos]);
        setPendingVideos([]);
      }, 300);
    }
  }, [pendingVideos, scrolling]);

  return (
    <div className={styles.container}>
      <div
        className={styles.videos}
        ref={containerRef}
        onScroll={handleOnScroll}
      >
        {videos.map((item, i) => (
          <Video
            key={item.id}
            id={item.id}
            src={item.src}
            active={item.id === activeVideoId}
            live={isPlayerLive(activeVideoIndex, i)}
          />
        ))}
      </div>
      <footer className={styles.footer}>
        <button>Hello</button>
        <button>Hello</button>
        <button>Hello</button>
        <button>Hello</button>
      </footer>
    </div>
  );
}
