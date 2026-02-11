import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  bg: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function KPICard({ label, value, icon, color, bg, trend, className = '' }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] transition-all ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--soma-text-gray)] mb-1">{label}</p>
          <h2 className="text-3xl font-bold mb-2">{value}</h2>
          
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-[var(--soma-success)]' : 'text-[var(--soma-error)]'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        <motion.div 
          className={`p-3 rounded-xl ${bg}`}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className={color}>{icon}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
