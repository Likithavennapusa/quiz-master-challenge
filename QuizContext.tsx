import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Question, Category, Difficulty, getRandomQuestions, difficultyConfig } from '@/data/quizData';

export interface QuizAnswer {
  questionId: number;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number;
  timeLimit: number;
}

export type QuizState = 'landing' | 'category-select' | 'quiz' | 'results';

interface QuizContextType {
  // State
  quizState: QuizState;
  selectedCategory: Category | null;
  selectedDifficulty: Difficulty;
  questions: Question[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  timeRemaining: number;
  isTimerRunning: boolean;
  
  // Actions
  setQuizState: (state: QuizState) => void;
  selectCategory: (category: Category) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  startQuiz: () => void;
  answerQuestion: (selectedAnswer: number, timeSpent: number) => void;
  skipQuestion: (timeSpent: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  setTimeRemaining: (time: number) => void;
  setIsTimerRunning: (running: boolean) => void;
  
  // Computed
  totalScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  totalTimeSpent: number;
  averageTimePerQuestion: number;
  percentageScore: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const QUESTIONS_PER_QUIZ = 5;

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState>('landing');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const selectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  }, []);

  const startQuiz = useCallback(() => {
    if (!selectedCategory) return;
    
    const quizQuestions = getRandomQuestions(selectedCategory, selectedDifficulty, QUESTIONS_PER_QUIZ);
    const timeLimit = difficultyConfig[selectedDifficulty].timePerQuestion;
    
    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(timeLimit);
    setIsTimerRunning(true);
    setQuizState('quiz');
  }, [selectedCategory, selectedDifficulty]);

  const answerQuestion = useCallback((selectedAnswer: number, timeSpent: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
      timeLimit: currentQuestion.timeLimit,
    };

    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  }, [questions, currentQuestionIndex]);

  const skipQuestion = useCallback((timeSpent: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: null,
      isCorrect: false,
      timeSpent,
      timeLimit: currentQuestion.timeLimit,
    };

    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  }, [questions, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(difficultyConfig[selectedDifficulty].timePerQuestion);
      setIsTimerRunning(true);
    }
  }, [currentQuestionIndex, questions.length, selectedDifficulty]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTimeRemaining(difficultyConfig[selectedDifficulty].timePerQuestion);
      setIsTimerRunning(true);
    }
  }, [currentQuestionIndex, selectedDifficulty]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setTimeRemaining(difficultyConfig[selectedDifficulty].timePerQuestion);
      setIsTimerRunning(true);
    }
  }, [questions.length, selectedDifficulty]);

  const submitQuiz = useCallback(() => {
    setIsTimerRunning(false);
    setQuizState('results');
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizState('landing');
    setSelectedCategory(null);
    setSelectedDifficulty('medium');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(0);
    setIsTimerRunning(false);
  }, []);

  // Computed values
  const correctAnswers = answers.filter(a => a?.isCorrect).length;
  const incorrectAnswers = answers.filter(a => a && !a.isCorrect && a.selectedAnswer !== null).length;
  const skippedAnswers = answers.filter(a => a?.selectedAnswer === null).length;
  const totalScore = correctAnswers * 10;
  const totalTimeSpent = answers.reduce((acc, a) => acc + (a?.timeSpent || 0), 0);
  const averageTimePerQuestion = answers.length > 0 ? totalTimeSpent / answers.length : 0;
  const percentageScore = questions.length > 0 ? (correctAnswers / questions.length) * 100 : 0;

  return (
    <QuizContext.Provider
      value={{
        quizState,
        selectedCategory,
        selectedDifficulty,
        questions,
        currentQuestionIndex,
        answers,
        timeRemaining,
        isTimerRunning,
        setQuizState,
        selectCategory,
        setDifficulty,
        startQuiz,
        answerQuestion,
        skipQuestion,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        submitQuiz,
        resetQuiz,
        setTimeRemaining,
        setIsTimerRunning,
        totalScore,
        correctAnswers,
        incorrectAnswers,
        skippedAnswers,
        totalTimeSpent,
        averageTimePerQuestion,
        percentageScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
