import QuizForm from "@/components/quiz/QuizForm";
import styles from "./page.module.scss";
import axios, { isAxiosError } from "axios";


interface QuizPageProps {
  params: Promise<{ id: string }>;
}


export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/quiz/${id}`
    );
    const quiz = response.data;
    return (
      <div className={styles.container}>
        <QuizForm quiz={quiz} />
      </div>
    );
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response?.status === 404) {
      return (
        <div className={styles.container}>
          <div className={styles.error}>
            <h1>Quiz Not Found</h1>
            <p>The quiz you are looking for does not exist.</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Error Loading Quiz</h1>
          <p>Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }
}
