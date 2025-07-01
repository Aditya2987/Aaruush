import { clsx } from 'clsx';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'bg-space-blue/80 text-white p-3 rounded-lg border-2 border-transparent',
        'focus:outline-none focus:border-brand-cyan focus:bg-space-blue',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
};

export default Input;
