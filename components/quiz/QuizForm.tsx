"use client";

import { useState } from "react";
import styles from "./QuizForm.module.scss";
import axios from "axios";


interface QuizOption {
  id: string;
  text: string;
}


interface QuizData {
  id: string;
  title: string;
  description: string;
  category: string;
  question: string;
  options: QuizOption[];
}


export interface QuizResult {
  isCorrect: boolean;
  correctAnswerId: string;
  explanation: string;
}

interface QuizFormProps {
  quiz: QuizData;
}


export default function QuizForm({ quiz }: QuizFormProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAnswer) {
      alert("Please select an answer");
      return;
    }

    setIsSubmitting(true);

    try {
      
      const response = await axios.post(`/api/quiz/process/${quiz.id}`, {selectedAnswerId : selectedAnswer});
      const data = response.data;
      setResult(data);
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer("");
    setResult(null);
  };

  return (
    <div className={styles.quizForm}>
      <div className={styles.header}>
        <span className={styles.category}>{quiz.category}</span>
        <h1 className={styles.title}>{quiz.title}</h1>
        <p className={styles.description}>{quiz.description}</p>
      </div>

      <div className={styles.questionSection}>
        <h2 className={styles.question}>{quiz.question}</h2>

        {!result ? (
          <form onSubmit={handleSubmit}>
            <div className={styles.options}>
              {quiz.options.map((option) => (
                <label
                  key={option.id}
                  className={`${styles.option} ${
                    selectedAnswer === option.id ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className={styles.radio}
                  />
                  <span className={styles.optionText}>{option.text}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedAnswer}
              className={styles.submitButton}
            >
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </button>
          </form>
        ) : (
          <div className={styles.result}>
            <div
              className={`${styles.resultBadge} ${
                result.isCorrect ? styles.correct : styles.incorrect
              }`}
            >
              {result.isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </div>

            <div className={styles.answerReview}>
              <h3>Your Answer:</h3>
              <div className={styles.options}>
                {quiz.options.map((option) => {
                  const isSelectedAnswer = selectedAnswer === option.id;
                  const isCorrectAnswer = result.correctAnswerId === option.id;

                  return (
                    <div
                      key={option.id}
                      className={`${styles.option} ${styles.reviewOption} ${
                        isCorrectAnswer ? styles.correctAnswer : ""
                      } ${
                        isSelectedAnswer && !result.isCorrect
                          ? styles.incorrectAnswer
                          : ""
                      }`}
                    >
                      <span className={styles.optionText}>{option.text}</span>
                      {isCorrectAnswer && (
                        <span className={styles.badge}>Correct Answer</span>
                      )}
                      {isSelectedAnswer && !result.isCorrect && (
                        <span className={styles.badge}>Your Answer</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.explanation}>
              <h3>Explanation:</h3>
              <p>{result.explanation}</p>
            </div>

            <button onClick={handleTryAgain} className={styles.tryAgainButton}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
