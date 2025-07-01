import { useSpaceEvents } from '../../hooks/useSpaceEvents';
import GlassCard from '../../components/ui/GlassCard';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { Scene } from '../../components/3d/Scene';
import { AnimatePresence, motion } from 'framer-motion';

type EventDisplayProps = {
  selectedDate: Date;
};

const EventDisplay = ({ selectedDate }: EventDisplayProps) => {
  const { data: event, isLoading, isError, error } = useSpaceEvents(selectedDate);

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        On This Day: {formattedDate}
      </h2>
      
      <GlassCard className="p-4 md:p-6 min-h-[500px] flex flex-col">
        <div className="w-full h-80 mb-6 rounded-lg bg-black overflow-hidden relative">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loader"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader text="Searching the archives..." />
              </motion.div>
            )}
            {!isLoading && <Scene />}
          </AnimatePresence>
        </div>
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {isError && (
              <motion.div key="error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <ErrorMessage message={error?.message || 'Could not fetch event.'} />
              </motion.div>
            )}
            {!isLoading && !isError && !event && (
               <motion.div key="no-event" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <ErrorMessage type="info" message="No significant event found for this day. Try another!" />
               </motion.div>
            )}
            {event && (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-brand-cyan">{event.title} ({event.year})</h3>
                <p className="text-light-blue mt-3 text-base md:text-lg leading-relaxed">{event.summary}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
};

export default EventDisplay;
