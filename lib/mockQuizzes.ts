export interface QuizOption {
  id: string;
  text: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
}

export interface QuizResult {
  isCorrect: boolean;
  correctAnswerId: string;
  explanation: string;
}

export const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "2022 FIFA World Cup Winner",
    description: "Test your knowledge about the 2022 FIFA World Cup",
    category: "Sports",
    question: "Which country won the mondial of 2022?",
    options: [
      { id: "a", text: "Argentina" },
      { id: "b", text: "France" },
      { id: "c", text: "Ukraine" },
      { id: "d", text: "Brazil" },
    ],
    correctAnswerId: "a",
    explanation: "",
  },
  {
    id: "2",
    title: "Tea Origins",
    description: "Learn about the history of tea",
    category: "Tea Knowledge",
    question: "Where did tea originate?",
    options: [
      { id: "a", text: "India" },
      { id: "b", text: "China" },
      { id: "c", text: "Ukraine" },
      { id: "d", text: "Moldova" },
    ],
    correctAnswerId: "b",
    explanation: "",
  },
];


export function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find((quiz) => quiz.id === id);
}


export function getQuizStructure(id: string) {
  const quiz = getQuizById(id);
  if (!quiz) return null;

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    category: quiz.category,
    question: quiz.question,
    options: quiz.options,
  };
}


export function validateQuizAnswer(quizId: string, selectedAnswerId: string): QuizResult | null {
  const quiz = getQuizById(quizId);
  if (!quiz) 
    return null;

  return {
    isCorrect: selectedAnswerId === quiz.correctAnswerId,
    correctAnswerId: quiz.correctAnswerId,
    explanation: quiz.explanation,
  };
}
