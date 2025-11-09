import { getDataSource } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { StaticPage } from "@/entities/StaticPage";
import styles from "./page.module.scss";

// This page will be statically generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default async function TeaRulesPage() {
  const dataSource = await getDataSource();
  await seedDatabase();

  const staticPageRepository = dataSource.getRepository(StaticPage);
  const page = await staticPageRepository.findOne({
    where: { slug: "tea-rules" },
  });

  if (!page) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Page Not Found</h1>
          <p>The tea rules page could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        <div className={styles.footer}>
          <p className={styles.note}>
            These guidelines are suggestions. Feel free to experiment and find
            what works best for your taste!
          </p>
        </div>
      </article>
    </div>
  );
}
