import { useEffect, useMemo, useRef, useState } from "react";
import "@utils/scrollend";
import Video from "@components/Video/Video";
import useEventListener from "@utils/useEventListener";
import getVideos, { VideoData } from "@api/getVideos";

import styles from "./Videos.module.css";

// odd number only
const MAX_PLAYERS = 7;

function isPlayerLive(activeVideoIndex: number, index: number) {
  const extra = Math.floor((MAX_PLAYERS - 1) / 2);
  const live =
    activeVideoIndex - extra <= index && index <= activeVideoIndex + extra;

  return live;
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
  const [muted, setMuted] = useState(false);

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
            description={item.description}
            userId={item.user_id}
            active={item.id === activeVideoId}
            live={isPlayerLive(activeVideoIndex, i)}
            muted={muted}
            onUnMute={() => setMuted(false)}
            onPlayError={(errorName) => {
              if (errorName === "NotAllowedError") {
                setMuted(true);
              }
            }}
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
