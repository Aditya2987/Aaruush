import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';

type ButtonProps = React.ComponentPropsWithoutRef<typeof motion.button>;

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      className={clsx(
        'bg-brand-purple text-white font-bold py-3 px-6 rounded-lg transition-all',
        'hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 focus:ring-offset-space-dark',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
