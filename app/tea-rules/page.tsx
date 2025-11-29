import { getDataSource } from "@/lib/db";
import { StaticPage } from "@/entities/StaticPage";
import EditableContent from "@/components/admin/EditableContent";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function TeaRulesPage() {
  const dataSource = await getDataSource();

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
        <EditableContent initialContent={page.content} pageSlug="tea-rules" />

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
