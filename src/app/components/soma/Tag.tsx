import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Tag({ 
  children, 
  selected = false, 
  onToggle, 
  onRemove,
  variant = 'default',
  className = '' 
}: TagProps) {
  const variants = {
    default: selected 
      ? 'gradient-purple text-white' 
      : 'bg-white/5 text-[var(--soma-text-gray)] hover:text-white',
    success: selected
      ? 'bg-[var(--soma-success)] text-white'
      : 'bg-[var(--soma-success)]/20 text-[var(--soma-success)]',
    warning: selected
      ? 'bg-[var(--soma-warning)] text-black'
      : 'bg-[var(--soma-warning)]/20 text-[var(--soma-warning)]',
    error: selected
      ? 'bg-[var(--soma-error)] text-white'
      : 'bg-[var(--soma-error)]/20 text-[var(--soma-error)]',
    info: selected
      ? 'bg-[var(--soma-info)] text-white'
      : 'bg-[var(--soma-info)]/20 text-[var(--soma-info)]'
  };

  const handleClick = () => {
    if (onToggle) onToggle();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
        text-sm font-medium transition-all
        ${onToggle ? 'cursor-pointer' : ''}
        ${variants[variant]}
        ${className}
      `}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}
