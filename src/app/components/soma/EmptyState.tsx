import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { SomaCard } from './SomaCard';
import { SomaButton } from './SomaButton';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}: EmptyStateProps) {
  return (
    <SomaCard className={`text-center py-16 ${className}`}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--soma-purple-primary)]/20 mb-6"
      >
        <Icon className="w-10 h-10 text-[var(--soma-purple-primary)]" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-3"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[var(--soma-text-gray)] max-w-md mx-auto mb-6"
      >
        {description}
      </motion.p>

      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SomaButton variant="primary" onClick={onAction}>
            {actionLabel}
          </SomaButton>
        </motion.div>
      )}
    </SomaCard>
  );
}
