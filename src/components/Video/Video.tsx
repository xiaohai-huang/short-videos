import { useEffect, useRef, useState } from "react";
import styles from "./Video.module.css";

type VideoProps = {
  id: string;
  src: string;
  active: boolean;
  live: boolean;
};

export default function Video({ id, src, active, live }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(active);

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
    <div className={styles.video}>
      {(active || live) && (
        <video
          ref={videoRef}
          className={styles.player}
          loop
          preload="auto"
          src={src}
          onClick={() => {
            setPlaying((prev) => !prev);
          }}
        />
      )}

      <h2 style={{ position: "absolute", bottom: 0, color: "white" }}>
        {live ? "live" : "die"}: {src.substring(src.length - 20)}
      </h2>
    </div>
  );
}
