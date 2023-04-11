import { useEffect, useRef, useState } from "react";
import styles from "./Video.module.css";

type VideoProps = {
  id: string;
  src: string;
  active: boolean;
  live: boolean;
  userId: string;
  description: string;
};

export default function Video({
  id,
  src,
  active,
  live,
  userId,
  description,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(active);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.play().catch((e) => {
        console.log(e);
        setPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    setPlaying(active);
  }, [active]);

  return (
    <div
      className={styles.video}
      video-id={id}
      is-live={live ? "" : undefined}
      is-active={active ? "" : undefined}
    >
      <img
        className={styles.cover}
        src="https://filetandvine.com/wp-content/uploads/2015/10/pix-vertical-placeholder.jpg"
        alt="cover"
      />

      <div className={styles.overlay}>
        <div className={styles.footer}>
          <h2 className={styles.userName}>@{userId}</h2>
          <p className={styles.description}>
            <span
              className={`${styles.content} ${
                !showMore ? styles["limit-2-lines"] : ""
              }`}
            >
              {description}
            </span>

            {isLongDescription(description) && (
              <>
                <span style={{ display: "block" }}>&nbsp;</span>
                <button
                  type="button"
                  className={styles.expandButton}
                  onClick={() => {
                    setShowMore((prev) => !prev);
                  }}
                >
                  {showMore ? "less" : "more"}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
      <div
        className={styles.playerIconContainer}
        onClick={() => {
          console.log("click on icon container");
          setPlaying((prev) => !prev);
        }}
      ></div>

      {(active || live) && (
        <video
          ref={videoRef}
          className={styles.player}
          loop
          preload="auto"
          src={src}
        />
      )}
    </div>
  );
}

function countWords(paragraph: string): number {
  // Use regular expression to match Chinese characters and word characters
  const matches = paragraph.match(/[\u4e00-\u9fff]|\b\w+\b/g);
  // Return the number of matches
  return matches ? matches.length : 0;
}
function isLongDescription(description: string) {
  return countWords(description) > 30;
}
