import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  text?: string;
  fullScreen?: boolean;
}

const LoadingScreen = ({ text = 'Loading cosmic data...', fullScreen = false }: LoadingScreenProps) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-void-950 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-12';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-16 w-16 text-stellar-400 mx-auto" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-16 w-16 text-nebula-400" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-display font-bold text-gradient">
            Celestial Chronicles
          </h3>
          
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="h-5 w-5 animate-spin text-stellar-400" />
            <p className="text-void-300">{text}</p>
          </div>

          <div className="w-64 h-1 bg-void-800 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-stellar-400 to-nebula-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;