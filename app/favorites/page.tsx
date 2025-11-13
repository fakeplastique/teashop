import { getDataSource } from "@/lib/db";
import { Tea } from "@/entities/Tea";
import { getLikedTeaIds } from "@/app/actions/likeActions";
import TeaCard from "@/components/tea/TeaCard";
import FavoritesInfo from "./_components/FavoritesInfo";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const likedTeaIds = await getLikedTeaIds();

  if (likedTeaIds.length === 0) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Your Favorites</h1>
          <p className={styles.subtitle}>
            Teas you've liked will appear here
          </p>
        </header>

        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💔</div>
          <h2>No favorites yet</h2>
          <p>Start exploring our tea collection and like your favorites!</p>
          <a href="/" className={styles.browseButton}>
            Browse Teas
          </a>
        </div>
      </div>
    );
  }

  const dataSource = await getDataSource();
  const teaRepository = dataSource.getRepository(Tea);
  const favoriteTeas = await teaRepository
    .createQueryBuilder("tea")
    .where("tea.id IN (:...ids)", { ids: likedTeaIds })
    .orderBy("tea.numberOfLikes", "DESC")
    .getMany();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Favorites</h1>
        <p className={styles.subtitle}>
          You have {favoriteTeas.length} favorite{" "}
          {favoriteTeas.length === 1 ? "tea" : "teas"}
        </p>
        <FavoritesInfo />
      </header>

      <div className={styles.teaGrid}>
        {favoriteTeas.map((tea) => (
          <TeaCard key={tea.id} tea={tea} isLiked={true} />
        ))}
      </div>
    </div>
  );
}
