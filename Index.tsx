import { QuizProvider, useQuiz } from '@/context/QuizContext';
import { LandingPage } from '@/components/quiz/LandingPage';
import { CategorySelect } from '@/components/quiz/CategorySelect';
import { QuizInterface } from '@/components/quiz/QuizInterface';
import { ResultsPage } from '@/components/quiz/ResultsPage';

const QuizApp = () => {
  const { quizState } = useQuiz();

  switch (quizState) {
    case 'landing':
      return <LandingPage />;
    case 'category-select':
      return <CategorySelect />;
    case 'quiz':
      return <QuizInterface />;
    case 'results':
      return <ResultsPage />;
    default:
      return <LandingPage />;
  }
};

const Index = () => {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
};

export default Index;
