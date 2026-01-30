import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import { Brain, Trophy, Clock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Multiple Categories',
    description: 'Science, History, Geography, and more',
  },
  {
    icon: Clock,
    title: 'Timed Questions',
    description: 'Race against the clock',
  },
  {
    icon: Trophy,
    title: 'Difficulty Levels',
    description: 'Easy, Medium, or Hard',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track your performance',
  },
];

export const LandingPage = () => {
  const { setQuizState } = useQuiz();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-8 quiz-gradient rounded-3xl flex items-center justify-center quiz-shadow"
        >
          <Brain className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6"
        >
          <span className="quiz-gradient-text">QuizMaster</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          Test your knowledge across multiple categories with timed challenges and detailed performance analytics
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => setQuizState('category-select')}
            size="lg"
            className="quiz-gradient text-primary-foreground text-lg px-12 py-6 h-auto rounded-2xl quiz-shadow hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Start Quiz
          </Button>
        </motion.div>
      </motion.div>

      {/* Features grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 max-w-4xl mx-auto w-full"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="glass-card p-6 rounded-2xl text-center group hover:bg-card transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
