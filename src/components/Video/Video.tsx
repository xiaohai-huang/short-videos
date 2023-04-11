import UnMuteButton from "@components/UnMuteButton/UnMuteButton";
import { useEffect, useRef, useState } from "react";
import styles from "./Video.module.css";

type VideoProps = {
  id: string;
  src: string;
  active: boolean;
  live: boolean;
  userId: string;
  description: string;
  muted: boolean;
  onUnMute: () => void;
  onPlayError: (errorName: string) => void;
};

export default function Video({
  id,
  src,
  active,
  live,
  userId,
  description,
  muted,
  onUnMute,
  onPlayError,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(active);
  const [showMore, setShowMore] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const descriptionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.play().catch((e: DOMException) => {
        if (videoRef.current) {
          onPlayError(e.name);
          if (e.name === "NotAllowedError") {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        }
      });
    } else {
      videoRef.current.pause();
    }
  }, [onPlayError, playing]);

  useEffect(() => {
    setPlaying(active && !showPlayIcon);
  }, [active, showPlayIcon]);

  return (
    <div
      className={styles.video}
      video-id={id}
      is-live={live ? "" : undefined}
      is-active={active ? "" : undefined}
    >
      {/* Cover Image */}
      <img
        className={styles.cover}
        src="https://filetandvine.com/wp-content/uploads/2015/10/pix-vertical-placeholder.jpg"
        alt="cover"
      />

      {/* Overlay */}
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

            <span
              ref={descriptionRef}
              style={{ visibility: "hidden", position: "absolute" }}
              className={`${styles.content} ${styles["limit-2-lines"]}`}
            >
              {description}
            </span>

            {isLongDescription(descriptionRef.current) && (
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

      {/* Play Icon */}
      <div
        className={styles.playerIconContainer}
        onClick={() => {
          setPlaying((prev) => !prev);
          setShowPlayIcon((prev) => !prev);
        }}
      >
        {showPlayIcon && <img src="/images/play-icon.png" alt="play" />}
      </div>

      {/* UnMute Button */}
      {muted && (
        <UnMuteButton
          onClick={() => {
            onUnMute();
          }}
        />
      )}

      {/* Video Player */}
      {(active || live) && (
        <video
          muted={muted}
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

function isLongDescription(descriptionElement: HTMLElement | null) {
  if (!descriptionElement) return false;
  const { scrollHeight, offsetHeight } = descriptionElement;
  return scrollHeight > offsetHeight;
}
