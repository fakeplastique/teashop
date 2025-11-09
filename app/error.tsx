"use client";

import { useEffect } from "react";
import styles from "./error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>☕</div>
        <h1 className={styles.title}>Oops! Something went wrong</h1>
        <p className={styles.message}>
          We spilled the tea! An error occurred while loading the page.
        </p>
        {error.message && (
          <div className={styles.errorDetails}>
            <code>{error.message}</code>
          </div>
        )}
        <div className={styles.actions}>
          <button onClick={reset} className={styles.retryButton}>
            Try Again
          </button>
          <a href="/" className={styles.homeButton}>
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
