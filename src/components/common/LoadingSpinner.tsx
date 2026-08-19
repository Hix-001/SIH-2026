import React from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Processing legal intelligence...',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} border-4 border-judiciary-200 border-t-judiciary-800 dark:border-judiciary-800 dark:border-t-gold rounded-full`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Scale className="w-5 h-5 text-gold animate-pulse" />
        </div>
      </div>
      {message && (
        <p className="text-sm font-medium text-judiciary-800 dark:text-judiciary-200 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};
