import Link from "next/link";
import Image from "next/image";
import { Tea } from "@/entities/Tea";
import LikeButton from "../ui/LikeButton";
import styles from "./TeaCard.module.scss";

interface TeaCardProps {
  tea: Tea;
  isLiked: boolean;
}

export default function TeaCard({ tea, isLiked }: TeaCardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/tea/${tea.id}`} className={styles.imageWrapper}>
        <Image
          src={tea.photoUrl}
          alt={tea.name}
          width={400}
          height={300}
          className={styles.image}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <Link href={`/tea/${tea.id}`}>
            <h3 className={styles.title}>{tea.name}</h3>
          </Link>
          <LikeButton teaId={tea.id} initialIsLiked={isLiked} />
        </div>

        <p className={styles.region}>{tea.region}</p>

        {tea.description && (
          <p className={styles.description}>
            {tea.description.slice(0, 100)}
            {tea.description.length > 100 && "..."}
          </p>
        )}

        <div className={styles.footer}>
          <span className={styles.price}>${Number(tea.price).toFixed(2)}</span>
          <span className={styles.likes}>
            {tea.numberOfLikes} {tea.numberOfLikes === 1 ? "like" : "likes"}
          </span>
        </div>
      </div>
    </div>
  );
}
