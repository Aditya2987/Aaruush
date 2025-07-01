import { useState, Suspense, lazy, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import ParticleField from './components/effects/ParticleField';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy load sections for better performance
const EventExplorer = lazy(() => import('./components/sections/EventExplorer'));
const CosmicTimeline = lazy(() => import('./components/sections/CosmicTimeline'));
const FutureSight = lazy(() => import('./components/sections/FutureSight'));
const SpaceGallery = lazy(() => import('./components/sections/SpaceGallery'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-void-950">
      <ParticleField />
      
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-32 pb-32"
        >
          {/* Event Explorer Section */}
          <motion.section 
            id="explore"
            variants={sectionVariants}
            className="container mx-auto px-4"
          >
            <Suspense fallback={<LoadingScreen />}>
              <EventExplorer 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
              />
            </Suspense>
          </motion.section>

          {/* Cosmic Timeline Section */}
          <motion.section 
            id="timeline"
            variants={sectionVariants}
            className="container mx-auto px-4"
          >
            <Suspense fallback={<LoadingScreen />}>
              <CosmicTimeline />
            </Suspense>
          </motion.section>

          {/* Future Events Section */}
          <motion.section 
            id="future"
            variants={sectionVariants}
            className="container mx-auto px-4"
          >
            <Suspense fallback={<LoadingScreen />}>
              <FutureSight />
            </Suspense>
          </motion.section>

          {/* Space Gallery Section */}
          <motion.section 
            id="gallery"
            variants={sectionVariants}
            className="container mx-auto px-4"
          >
            <Suspense fallback={<LoadingScreen />}>
              <SpaceGallery />
            </Suspense>
          </motion.section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default App;