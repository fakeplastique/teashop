import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Tea Not Found</h2>
        <p className={styles.message}>
          Oops! The tea you're looking for doesn't exist in our collection.
        </p>
        <Link href="/" className={styles.button}>
          Browse All Teas
        </Link>
      </div>
    </div>
  );
}
