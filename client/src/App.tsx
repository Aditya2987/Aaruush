import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Loader from './components/ui/Loader';

// Lazy load the main components
const APOD = lazy(() => import('./features/apod/APOD'));
const EventDisplay = lazy(() => import('./features/event/EventDisplay'));
const EventCalendar = lazy(() => import('./features/calendar/EventCalendar'));
const CosmicTimeline = lazy(() => import('./features/timeline/CosmicTimeline'));
const FutureSight = lazy(() => import('./features/futuresight/FutureSight'));

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<Loader text="Loading NASA's Picture of the Day..." />}>
          <APOD />
        </Suspense>
        
        <motion.main 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section className="lg:col-span-2" variants={itemVariants}>
            <Suspense fallback={<Loader />}>
              <EventDisplay selectedDate={selectedDate} />
            </Suspense>
          </motion.section>

          <motion.aside className="lg:col-span-1 sticky top-8" variants={itemVariants}>
             <Suspense fallback={<Loader />}>
                <EventCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
             </Suspense>
          </motion.aside>
        </motion.main>

        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <motion.div variants={itemVariants}>
                <Suspense fallback={<Loader />}>
                    <CosmicTimeline />
                </Suspense>
            </motion.div>
            <motion.div variants={itemVariants}>
                <Suspense fallback={<Loader />}>
                    <FutureSight />
                </Suspense>
            </motion.div>
        </motion.section>
        
        <footer className="text-center text-light-blue/50 mt-20 pb-8">
            <p>Celestial Chronicles - Reimagined</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
