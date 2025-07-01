import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import React from 'react';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={clsx("glass-card", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
