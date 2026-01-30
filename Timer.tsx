import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  timeRemaining: number;
  timeLimit: number;
}

export const Timer = ({ timeRemaining, timeLimit }: TimerProps) => {
  const percentage = (timeRemaining / timeLimit) * 100;
  const isWarning = percentage <= 50 && percentage > 25;
  const isDanger = percentage <= 25;

  const getTimerColor = () => {
    if (isDanger) return 'bg-destructive';
    if (isWarning) return 'bg-warning';
    return 'quiz-gradient';
  };

  const getTextColor = () => {
    if (isDanger) return 'text-destructive';
    if (isWarning) return 'text-warning';
    return 'text-primary';
  };

  return (
    <div className="glass-card rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className={cn("w-5 h-5", getTextColor())} />
          <span className="text-sm font-medium text-muted-foreground">Time Remaining</span>
        </div>
        <motion.span
          key={timeRemaining}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={cn(
            "text-2xl md:text-3xl font-display font-bold tabular-nums",
            getTextColor(),
            isDanger && "timer-pulse"
          )}
        >
          {timeRemaining}s
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getTimerColor())}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};
