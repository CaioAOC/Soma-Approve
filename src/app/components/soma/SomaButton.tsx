import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface SomaButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  icon?: ReactNode;
}

export function SomaButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  icon
}: SomaButtonProps) {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-5',
    lg: 'h-12 px-6 text-lg'
  };

  const variantClasses = {
    primary: 'gradient-purple-glow text-white hover:shadow-[0_4px_20px_rgba(140,82,255,0.6)]',
    secondary: 'border-2 border-[var(--soma-purple-primary)] text-[var(--soma-purple-primary)] hover:bg-[var(--soma-purple-primary)] hover:text-white',
    success: 'bg-gradient-to-r from-[var(--soma-success)] to-emerald-600 text-white hover:shadow-[0_4px_20px_rgba(16,185,129,0.5)]',
    danger: 'bg-gradient-to-r from-[var(--soma-error)] to-red-600 text-white hover:shadow-[0_4px_20px_rgba(239,68,68,0.5)]',
    ghost: 'bg-transparent text-white hover:bg-white/10'
  };

  return (
    <motion.button
      type={type}
      className={`
        relative inline-flex items-center justify-center gap-2 
        rounded-full font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && icon}
      <span>{children}</span>
    </motion.button>
  );
}
