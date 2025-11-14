import Link from "next/link";
import { mockQuizzes } from "@/lib/mockQuizzes";
import styles from "./page.module.scss";


export default function QuizListPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quizzes</h1>
      </div>
      <div className={styles.quizGrid}>
        {mockQuizzes.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/quiz/${quiz.id}`}
            className={styles.quizCard}
          >
            <div className={styles.cardHeader}>
              <span className={styles.category}>{quiz.category}</span>
            </div>
            <h2 className={styles.quizTitle}>{quiz.title}</h2>
            <p className={styles.description}>{quiz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
