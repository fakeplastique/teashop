import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.skeleton}>
        <div className={styles.backButton}></div>
        <div className={styles.teaDetail}>
          <div className={styles.imageSection}>
            <div className={styles.imagePlaceholder}></div>
          </div>
          <div className={styles.infoSection}>
            <div className={styles.titlePlaceholder}></div>
            <div className={styles.metaPlaceholder}></div>
            <div className={styles.pricePlaceholder}></div>
            <div className={styles.descriptionPlaceholder}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.actionsPlaceholder}>
              <div className={styles.button}></div>
              <div className={styles.button}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
