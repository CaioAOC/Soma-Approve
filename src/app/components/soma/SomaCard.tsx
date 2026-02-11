import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SomaCardProps {
  children: ReactNode;
  elevation?: 'none' | 'low' | 'high';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function SomaCard({
  children,
  elevation = 'low',
  hover = false,
  padding = 'md',
  className = '',
  onClick
}: SomaCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const elevationClasses = {
    none: '',
    low: 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    high: 'shadow-[0_16px_48px_rgba(0,0,0,0.6)]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        glass rounded-2xl relative overflow-hidden
        ${paddingClasses[padding]}
        ${elevationClasses[elevation]}
        ${hover ? 'glass-hover cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { y: -6, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
