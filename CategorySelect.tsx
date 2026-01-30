import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import { categories, difficultyConfig, Category, Difficulty } from '@/data/quizData';
import { ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryColors: Record<Category, string> = {
  science: 'from-blue-500 to-cyan-500',
  history: 'from-amber-500 to-orange-500',
  geography: 'from-emerald-500 to-green-500',
  sports: 'from-rose-500 to-red-500',
  entertainment: 'from-violet-500 to-purple-500',
  general: 'from-teal-500 to-cyan-500',
};

export const CategorySelect = () => {
  const { 
    setQuizState, 
    selectCategory, 
    selectedCategory, 
    selectedDifficulty, 
    setDifficulty,
    startQuiz 
  } = useQuiz();

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuizState('landing')}
          className="rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-display font-bold">Choose Your Quiz</h1>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full flex-1">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Select Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => selectCategory(category.id)}
                className={cn(
                  "relative p-6 rounded-2xl text-left transition-all duration-300 group overflow-hidden",
                  selectedCategory === category.id
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "hover:scale-[1.02]"
                )}
              >
                {/* Background gradient */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                  categoryColors[category.id]
                )} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-display font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                {/* Selected indicator */}
                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}

                {/* Border */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl border-2 transition-colors",
                  selectedCategory === category.id
                    ? "border-primary"
                    : "border-border group-hover:border-primary/30"
                )} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Difficulty */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Select Difficulty</h2>
          <div className="flex flex-wrap gap-4">
            {(Object.entries(difficultyConfig) as [Difficulty, typeof difficultyConfig.easy][]).map(([key, config]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDifficulty(key)}
                className={cn(
                  "px-6 py-4 rounded-xl border-2 transition-all duration-300 flex-1 min-w-[140px]",
                  selectedDifficulty === key
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/30"
                )}
              >
                <div className="font-display font-semibold mb-1">{config.label}</div>
                <div className="text-sm text-muted-foreground">
                  {config.timePerQuestion}s per question
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            onClick={startQuiz}
            disabled={!selectedCategory}
            size="lg"
            className="quiz-gradient text-primary-foreground px-12 py-6 h-auto text-lg rounded-2xl disabled:opacity-50 quiz-shadow hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Start Quiz
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
