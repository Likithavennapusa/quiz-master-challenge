import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import { difficultyConfig } from '@/data/quizData';
import { cn } from '@/lib/utils';
import { Timer } from './Timer';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

export const QuizInterface = () => {
  const {
    questions,
    currentQuestionIndex,
    answers,
    selectedDifficulty,
    timeRemaining,
    setTimeRemaining,
    isTimerRunning,
    setIsTimerRunning,
    answerQuestion,
    skipQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
  } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const timeLimit = difficultyConfig[selectedDifficulty].timePerQuestion;

  // Reset selection and timer when question changes
  useEffect(() => {
    setSelectedOption(currentAnswer?.selectedAnswer ?? null);
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex, currentAnswer]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      if (timeRemaining <= 1) {
        // Time's up - auto skip
        const timeSpent = timeLimit;
        if (!currentAnswer) {
          skipQuestion(timeSpent);
        }
        
        if (currentQuestionIndex < questions.length - 1) {
          nextQuestion();
        } else {
          submitQuiz();
        }
        setTimeRemaining(timeLimit);
      } else {
        setTimeRemaining(timeRemaining - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, currentQuestionIndex, timeLimit, currentAnswer, questions.length, nextQuestion, skipQuestion, submitQuiz, setTimeRemaining]);

  const handleOptionSelect = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex);
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    answerQuestion(optionIndex, Math.min(timeSpent, timeLimit));
  }, [answerQuestion, questionStartTime, timeLimit]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      if (selectedOption === null && !currentAnswer) {
        const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
        skipQuestion(Math.min(timeSpent, timeLimit));
      }
      nextQuestion();
    } else {
      submitQuiz();
    }
  }, [currentQuestionIndex, questions.length, selectedOption, currentAnswer, questionStartTime, timeLimit, skipQuestion, nextQuestion, submitQuiz]);

  const handlePrevious = useCallback(() => {
    previousQuestion();
  }, [previousQuestion]);

  if (!currentQuestion) return null;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 md:py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto w-full mb-6">
        {/* Progress bar */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full quiz-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Timer */}
        <Timer 
          timeRemaining={timeRemaining} 
          timeLimit={timeLimit} 
        />
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-6 md:p-10 quiz-shadow"
            >
              {/* Question text */}
              <h2 className="text-xl md:text-2xl font-display font-semibold mb-8 text-center">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="grid gap-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionSelect(index)}
                    className={cn(
                      "p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 group",
                      selectedOption === index
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    )}
                  >
                    <span
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-display font-semibold text-sm transition-colors shrink-0",
                        selectedOption === index
                          ? "quiz-gradient text-primary-foreground"
                          : "bg-secondary group-hover:bg-primary/20"
                      )}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-base md:text-lg">{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-3xl mx-auto w-full mt-8">
        {/* Question dots */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                index === currentQuestionIndex
                  ? "quiz-gradient text-primary-foreground"
                  : answers[index]
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="rounded-xl"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className={cn(
              "rounded-xl",
              isLastQuestion 
                ? "quiz-gradient text-primary-foreground hover:opacity-90" 
                : ""
            )}
          >
            {isLastQuestion ? (
              <>
                Submit Quiz
                <Send className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
