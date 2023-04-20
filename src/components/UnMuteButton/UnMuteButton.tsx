import UnmuteIcon from "./unmute-icon.webp";
import styles from "./UnMuteButton.module.css";

type UnMuteButtonProps = {
  onClick: () => void;
};

function UnMuteButton({ onClick }: UnMuteButtonProps) {
  return (
    <div className={styles.unmute}>
      <button onClick={onClick}>
        <div className={styles.icon}>
          <img src={UnmuteIcon} alt="unmute" />
        </div>
        <div>Unmute</div>
      </button>
    </div>
  );
}

export default UnMuteButton;
