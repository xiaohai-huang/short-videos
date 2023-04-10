import { useEffect, useMemo, useRef, useState } from "react";
import "@utils/scrollend";
import Video from "@components/Video/Video";
import useEventListener from "@utils/useEventListener";

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
    src: "https://storage.xiaohai-huang.net/random/videos/yt1s.com%20-%20how%20to%20dry%20a%20cat%20quickly%20after%20bathing%20cats%20shorts.mp4",
  },
  {
    id: "two",
    src: "https://storage.xiaohai-huang.net/random/videos/yt1s.com%20-%20Atlas%20%20Up%20Up%20and%20Away.mp4",
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

function getVideos(offset: number = 0) {
  return new Promise<VideoData[]>((resolve) => {
    setTimeout(() => {
      resolve(data.map((item) => ({ ...item, id: `${offset}-${item.id}` })));
    }, 1000);
  });
}

function shouldLoadMore(activeVideoIndex: number, numVideos: number) {
  const numVideosLeft = numVideos - 1 - activeVideoIndex;
  return numVideosLeft <= 3;
}

const MAX_VIDEOS = 25;

export default function Videos() {
  const videosRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [activeVideoId, setActiveVideoId] = useState("");
  const activeVideoIndex = useMemo(() => {
    if (!activeVideoId) return -1;
    return videos.findIndex((video) => video.id === activeVideoId);
  }, [activeVideoId, videos]);
  const [page, setPage] = useState(1);
  const [pendingVideos, setPendingVideos] = useState<VideoData[]>([]);
  const [scrolling, setScrolling] = useState(false);
  const [loading, setLoading] = useState(false);

  useEventListener(videosRef, "scroll", (e) => {
    setScrolling(true);
  });

  // Determine the active video once user stops scrolling
  useEventListener(videosRef, "scrollend", (e) => {
    setScrolling(false);
    const videosContainer = e.target as HTMLDivElement;
    const activeVideo = Array.from(videosContainer.children).find((child) => {
      const { top } = child.getBoundingClientRect();
      return -1 <= top && top <= 1;
    });

    if (!activeVideo) return;
    setActiveVideoId(activeVideo.getAttribute("video-id") ?? "");
    if (videos.length > MAX_VIDEOS) {
      // TODO: make sure videos around the active video are preserved
      setVideos((prev) => prev.slice(-MAX_VIDEOS));
    }
  });

  // fetch videos and add them to pending videos list
  useEffect(() => {
    let mount = true;
    setLoading(true);
    getVideos(page)
      .then((data) => {
        if (!mount) return;
        setPendingVideos((prev) => [...prev, ...data]);
      })
      .finally(() => setLoading(false));
    return () => {
      mount = false;
    };
  }, [page]);

  useEffect(() => {
    if (scrolling || pendingVideos.length === 0) return;

    console.log("I can add more videos cuz I am not scrolling.");
    setVideos((prev) => [...prev, ...pendingVideos]);
    setPendingVideos([]);
  }, [scrolling, pendingVideos]);

  // Increment the page when reach the near end of the videos
  useEffect(() => {
    if (
      pendingVideos.length === 0 &&
      !loading &&
      videos.length &&
      shouldLoadMore(activeVideoIndex, videos.length)
    ) {
      console.log("increment page");
      setPage((prev) => prev + 1);
    }
  }, [pendingVideos.length, loading, activeVideoIndex, videos.length]);

  // Initial load, set the first video as the active video
  useEffect(() => {
    if (activeVideoId === "" && videos.length) setActiveVideoId(videos[0].id);
  }, [activeVideoId, videos]);

  return (
    <div className={styles.container}>
      <div className={styles.videos} ref={videosRef}>
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
        <button>pending: {pendingVideos.length}</button>
        <button>index: {activeVideoIndex}</button>
        <button>id: {activeVideoId}</button>
        <button>{loading ? "loading..." : "done"}</button>
      </footer>
    </div>
  );
}
