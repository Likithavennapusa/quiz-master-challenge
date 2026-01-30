import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import { categories } from '@/data/quizData';
import { Trophy, Target, Clock, RotateCcw, Home, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  correct: 'hsl(142, 76%, 36%)',
  incorrect: 'hsl(0, 84%, 60%)',
  skipped: 'hsl(220, 14%, 70%)',
};

export const ResultsPage = () => {
  const {
    questions,
    answers,
    selectedCategory,
    selectedDifficulty,
    correctAnswers,
    incorrectAnswers,
    skippedAnswers,
    totalScore,
    totalTimeSpent,
    averageTimePerQuestion,
    percentageScore,
    resetQuiz,
    setQuizState,
  } = useQuiz();

  const category = categories.find(c => c.id === selectedCategory);

  const pieData = [
    { name: 'Correct', value: correctAnswers, color: COLORS.correct },
    { name: 'Incorrect', value: incorrectAnswers, color: COLORS.incorrect },
    { name: 'Skipped', value: skippedAnswers, color: COLORS.skipped },
  ].filter(d => d.value > 0);

  const timeData = questions.map((q, index) => ({
    name: `Q${index + 1}`,
    time: answers[index]?.timeSpent || 0,
    limit: q.timeLimit,
  }));

  const getGrade = () => {
    if (percentageScore >= 90) return { grade: 'A+', emoji: '🏆', message: 'Outstanding!' };
    if (percentageScore >= 80) return { grade: 'A', emoji: '🌟', message: 'Excellent!' };
    if (percentageScore >= 70) return { grade: 'B', emoji: '👍', message: 'Good job!' };
    if (percentageScore >= 60) return { grade: 'C', emoji: '📚', message: 'Keep practicing!' };
    return { grade: 'D', emoji: '💪', message: 'Don\'t give up!' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {gradeInfo.emoji}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            {gradeInfo.message}
          </h1>
          <p className="text-xl text-muted-foreground">
            {category?.icon} {category?.name} • {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
          </p>
        </motion.div>

        {/* Score Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <ScoreCard
            icon={Trophy}
            label="Total Score"
            value={`${totalScore}pts`}
            color="primary"
          />
          <ScoreCard
            icon={Target}
            label="Accuracy"
            value={`${Math.round(percentageScore)}%`}
            color="success"
          />
          <ScoreCard
            icon={Clock}
            label="Total Time"
            value={`${Math.round(totalTimeSpent)}s`}
            color="warning"
          />
          <ScoreCard
            icon={Trophy}
            label="Grade"
            value={gradeInfo.grade}
            color="accent"
          />
        </motion.div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-3xl p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Answer Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-3xl p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Time per Question</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    formatter={(value: number) => [`${value}s`, 'Time Spent']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="time" fill="hsl(173, 80%, 40%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Average: {Math.round(averageTimePerQuestion)}s per question
            </p>
          </motion.div>
        </div>

        {/* Question Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-3xl p-6 mb-12"
        >
          <h3 className="font-display font-semibold text-lg mb-6">Question Review</h3>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const answer = answers[index];
              const isCorrect = answer?.isCorrect;
              const isSkipped = answer?.selectedAnswer === null;

              return (
                <div
                  key={question.id}
                  className={cn(
                    "p-4 rounded-xl border-2",
                    isCorrect ? "border-success/30 bg-success/5" :
                    isSkipped ? "border-muted bg-muted/20" :
                    "border-destructive/30 bg-destructive/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                      isCorrect ? "bg-success text-success-foreground" :
                      isSkipped ? "bg-muted text-muted-foreground" :
                      "bg-destructive text-destructive-foreground"
                    )}>
                      {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        <span className="text-muted-foreground">Q{index + 1}:</span> {question.question}
                      </p>
                      <div className="text-sm space-y-1">
                        {!isSkipped && (
                          <p className={cn(
                            isCorrect ? "text-success" : "text-destructive"
                          )}>
                            Your answer: {question.options[answer?.selectedAnswer ?? 0]}
                          </p>
                        )}
                        {!isCorrect && (
                          <p className="text-success">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-muted-foreground">
                          Time spent: {answer?.timeSpent || 0}s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            onClick={() => setQuizState('category-select')}
            variant="outline"
            size="lg"
            className="rounded-xl"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Another Quiz
          </Button>
          <Button
            onClick={resetQuiz}
            size="lg"
            className="quiz-gradient text-primary-foreground rounded-xl hover:opacity-90"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

interface ScoreCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'primary' | 'success' | 'warning' | 'accent';
}

const ScoreCard = ({ icon: Icon, label, value, color }: ScoreCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-2xl p-4 md:p-6 text-center"
    >
      <div className={cn(
        "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center",
        colorClasses[color]
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-2xl md:text-3xl font-display font-bold mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
};
