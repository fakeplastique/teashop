import { getDataSource } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { Tea } from "@/entities/Tea";
import { getLikedTeaIds } from "./actions/likeActions";
import TeaCard from "@/components/tea/TeaCard";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Initialize database and seed if needed
  const dataSource = await getDataSource();
  await seedDatabase();

  // Fetch all teas
  const teaRepository = dataSource.getRepository(Tea);
  const teas = await teaRepository.find({
    order: {
      numberOfLikes: "DESC",
      name: "ASC",
    },
  });

  // Get liked tea IDs from cookies
  const likedTeaIds = await getLikedTeaIds();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Premium Tea Collection</h1>
        <p className={styles.subtitle}>
          Discover exquisite teas from around the world
        </p>
      </header>

      <div className={styles.teaGrid}>
        {teas.map((tea) => (
          <TeaCard
            key={tea.id}
            tea={tea}
            isLiked={likedTeaIds.includes(tea.id)}
          />
        ))}
      </div>

      {teas.length === 0 && (
        <div className={styles.emptyState}>
          <p>No teas available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
