import { Loader2 } from 'lucide-react';
import React from 'react';

export const Loader = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-light-blue">
      <Loader2 className="animate-spin h-8 w-8 text-brand-cyan" />
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default Loader;
