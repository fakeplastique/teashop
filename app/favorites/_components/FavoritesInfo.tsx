"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import styles from "./FavoritesInfo.module.scss";

export default function FavoritesInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.infoButton}
        aria-label="Learn about favorites"
      >
        ℹ️ How favorites work
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <h2>About Your Favorites</h2>
          <p>
            When you click the heart icon on a tea, it's saved to your
            favorites using browser cookies. This means:
          </p>
          <ul>
            <li>Your favorites are stored locally on your device</li>
            <li>They persist between sessions</li>
            <li>Each like also increments the tea's global like counter</li>
            <li>Other users can see how many total likes each tea has</li>
          </ul>

          <div className={styles.techInfo}>
            <h3>Technical Implementation</h3>
            <p>
              This feature demonstrates several Next.js 15 and React 19 concepts:
            </p>
            <ul>
              <li>
                <strong>useOptimistic:</strong> Provides instant UI feedback
                before server confirmation
              </li>
              <li>
                <strong>Server Actions:</strong> Handle like toggling and
                cookie management
              </li>
              <li>
                <strong>React Portal:</strong> This modal renders outside the
                normal DOM hierarchy
              </li>
              <li>
                <strong>z-index:</strong> Ensures the modal appears above all
                other content
              </li>
              <li>
                <strong>Cookies:</strong> Store user preferences persistently
              </li>
            </ul>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.closeButton}
          >
            Got it!
          </button>
        </div>
      </Modal>
    </>
  );
}
