import { notFound } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { getDataSource } from "@/lib/db";
import { Tea } from "@/entities/Tea";
import { getLikedTeaIds } from "@/app/actions/likeActions";
import LikeButton from "@/components/ui/LikeButton";
import styles from "./page.module.scss";

interface TeaPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const dataSource = await getDataSource();
  const teaRepository = dataSource.getRepository(Tea);
  const teas = await teaRepository.find();

  return teas.map((tea) => ({
    id: tea.id.toString(),
  }));
}

export default async function TeaPage({ params }: TeaPageProps) {
  const { id } = await params;
  const teaId = parseInt(id);

  if (isNaN(teaId)) {
    notFound();
  }

  const dataSource = await getDataSource();
  const teaRepository = dataSource.getRepository(Tea);
  const tea = await teaRepository.findOne({ where: { id: teaId } });

  if (!tea) {
    notFound();
  }

  const likedTeaIds = await getLikedTeaIds();
  const isLiked = likedTeaIds.includes(tea.id);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Back to all teas
      </Link>

      <div className={styles.teaDetail}>
        <div className={styles.imageSection}>
          <SafeImage
            primarySrc={tea.photoUrl}
            fallbackSrc="/brokenTeaImage.png"
            alt={tea.name}
            width={600}
            height={600}
            className={styles.image}
            loading="lazy"
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{tea.name}</h1>
            <LikeButton teaId={tea.id} initialIsLiked={isLiked} />
          </div>

          <div className={styles.meta}>
            <span className={styles.region}>
              <span className={styles.icon}>📍</span>
              {tea.region}
            </span>
            <span className={styles.likes}>
              <span className={styles.icon}>❤️</span>
              {tea.numberOfLikes} {tea.numberOfLikes === 1 ? "like" : "likes"}
            </span>
          </div>

          <div className={styles.price}>${Number(tea.price).toFixed(2)}</div>

          {tea.description && (
            <div className={styles.description}>
              <h2>About this tea</h2>
              <p>{tea.description}</p>
            </div>
          )}

          <div className={styles.actions}>
            <button className={styles.addToCart}>Add to Cart</button>
            <button className={styles.learnMore}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
