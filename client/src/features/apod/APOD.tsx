import { useNasaApod } from '../../hooks/useNasaApod';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { motion } from 'framer-motion';

const APOD = () => {
  const { data: apod, isLoading, isError } = useNasaApod();

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] glass-card flex items-center justify-center">
        <Loader text="Contacting NASA..." />
      </div>
    );
  }
  
  if (isError || !apod) {
    return (
      <div className="w-full h-[50vh] glass-card flex items-center justify-center">
        <ErrorMessage message="Could not fetch NASA's Picture of the Day." />
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-[50vh] rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center animate-subtle-pulse"
      style={{ backgroundImage: `url(${apod.hdurl})` }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-space-dark/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-10">
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {apod.title}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-light-blue mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Celestial Chronicles
        </motion.p>
      </div>
    </motion.div>
  );
};

export default APOD;
