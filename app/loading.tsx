import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.teaCup}>🍵</div>
        <div className={styles.loadingText}>Brewing your tea...</div>
      </div>
    </div>
  );
}
