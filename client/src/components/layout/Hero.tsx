import { motion } from 'framer-motion';
import { useNasaApod } from '../../hooks/useNasaApod';
import { ChevronDown, Sparkles } from 'lucide-react';
import LoadingScreen from '../ui/LoadingScreen';

const Hero = () => {
  const { data: apod, isLoading, isError } = useNasaApod();

  const scrollToExplore = () => {
    const element = document.querySelector('#explore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <LoadingScreen />
      </section>
    );
  }

  const backgroundImage = !isError && apod?.hdurl 
    ? apod.hdurl 
    : 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-950/70 via-void-950/50 to-void-950/90" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-stellar-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Sparkles className="h-16 w-16 text-stellar-400" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-16 w-16 text-nebula-400" />
              </div>
            </motion.div>
          </div>
          
          <h1 className="hero-text mb-6">
            Celestial Chronicles
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-void-300 max-w-3xl mx-auto leading-relaxed"
          >
            Journey through space and time. Discover the cosmic events, space missions, 
            and celestial phenomena that shaped our understanding of the universe.
          </motion.p>
        </motion.div>

        {/* APOD Info */}
        {!isError && apod && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="glass-card p-6 max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-lg font-semibold text-stellar-400 mb-2">
              Today's Cosmic View
            </h3>
            <p className="text-void-200 font-medium">
              {apod.title}
            </p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToExplore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cosmic-border glass-button text-lg px-8 py-4 bg-gradient-to-r from-stellar-500 to-nebula-500 text-white font-semibold"
          >
            Begin Your Journey
          </motion.button>
          
          <motion.button
            onClick={scrollToExplore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button text-lg px-8 py-4"
          >
            Explore Events
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToExplore}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-void-400 hover:text-stellar-400 transition-colors"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;