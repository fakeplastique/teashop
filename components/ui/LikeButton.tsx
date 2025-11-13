"use client";

import { useState, useOptimistic, useTransition } from "react";
import styles from "./LikeButton.module.scss";

interface LikeButtonProps {
  teaId: number;
  initialIsLiked: boolean;
}

export default function LikeButton({ teaId, initialIsLiked }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(initialIsLiked);
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    liked,
    (state) => !state
  );

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      setOptimisticLiked(!liked);
      try {
        const response = await fetch(`/api/like`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teaId: teaId }),
            credentials: 'include'
        });
        

        if (response.ok) {
          setLiked(!liked);
        } else {
          console.error('Failed to toggle like. Status:', response.status);
        }
      } catch (error) {
        console.error('Failed to toggle like.', error);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      className={`${styles.likeButton} ${optimisticLiked ? styles.liked : ""} ${
        isPending ? styles.pending : ""
      }`}
      aria-label={optimisticLiked ? "Unlike" : "Like"}
      disabled={isPending}
    >
      <span className={styles.heart}>{optimisticLiked ? "❤️" : "🤍"}</span>
    </button>
  );
}
