import { AlertTriangle, Info } from 'lucide-react';
import React from 'react';

type ErrorMessageProps = {
  message: string;
  type?: 'error' | 'info';
};

export const ErrorMessage = ({ message, type = 'error' }: ErrorMessageProps) => {
  const isError = type === 'error';
  const Icon = isError ? AlertTriangle : Info;
  const colorClass = isError ? 'text-red-400' : 'text-cyan-400';

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <Icon className={`h-10 w-10 ${colorClass}`} />
      <p className={`text-xl ${isError ? 'text-red-300' : 'text-light-blue'}`}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
