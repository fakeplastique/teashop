"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/app/actions/likeActions";
import styles from "./LikeButton.module.scss";

interface LikeButtonProps {
  teaId: number;
  initialIsLiked: boolean;
}

export default function LikeButton({ teaId, initialIsLiked }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    initialIsLiked,
    (state, _newState: boolean) => !state
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLiked(!optimisticLiked);
      await toggleLike(teaId);
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
