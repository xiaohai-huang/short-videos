import React from "react";
import styles from "./LoadingBar.module.css";

interface LoadingBarProps {
  loading: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LoadingBar: React.FC<LoadingBarProps> = ({
  loading,
  className,
  style,
}) => {
  return (
    <div
      className={`${styles.loadingBar} ${
        loading ? styles.animating : ""
      } ${className}`}
      style={style}
    >
      <div className={styles.loadingBarInner}></div>
    </div>
  );
};

export default LoadingBar;
