import { useEffect, useRef, useState } from "react";
import styles from "./Video.module.css";

type VideoProps = {
  src: string;
  active: boolean;
};

export default function Video({ src, active }: VideoProps) {
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
      <video
        loop
        onClick={() => {
          setPlaying((prev) => !prev);
        }}
        ref={videoRef}
        className={styles.player}
        src={src}
      />
    </div>
  );
}
