import { motion, AnimatePresence } from 'framer-motion';
import { useSpaceEvents } from '../../hooks/useSpaceEvents';
import { Scene } from '../3d/Scene';
import { Calendar, Clock, Info } from 'lucide-react';
import LoadingScreen from '../ui/LoadingScreen';

interface EventDisplayProps {
  selectedDate: Date;
}

const EventDisplay = ({ selectedDate }: EventDisplayProps) => {
  const { data: event, isLoading, isError, error } = useSpaceEvents(selectedDate);

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* 3D Scene */}
      <div className="relative h-80 rounded-xl overflow-hidden bg-void-950 border border-white/10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <LoadingScreen text="Searching cosmic archives..." />
            </motion.div>
          ) : (
            <motion.div
              key="scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <Scene />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Event Content */}
      <AnimatePresence mode="wait">
        {isError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <div className="text-red-400 mb-4">
              <Info className="h-8 w-8 mx-auto mb-2" />
              Error loading event
            </div>
            <p className="text-void-400">{error?.message || 'Could not fetch event data.'}</p>
          </motion.div>
        )}

        {!isLoading && !isError && !event && (
          <motion.div
            key="no-event"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <Calendar className="h-12 w-12 text-void-400 mx-auto mb-4" />
            <div className="text-void-300 mb-2">No cosmic event found</div>
            <p className="text-void-400">
              No significant astronomical event recorded for {formattedDate}. Try selecting another date!
            </p>
          </motion.div>
        )}

        {event && (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 text-sm text-void-400">
              <Clock className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display font-bold text-gradient">
              {event.title} ({event.year})
            </h3>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-void-200 text-lg leading-relaxed">
                {event.summary}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="bg-void-800/30 rounded-xl p-4 border border-white/5">
                <div className="text-sm text-stellar-400 font-medium mb-1">Event Year</div>
                <div className="text-xl font-bold">{event.year}</div>
              </div>
              <div className="bg-void-800/30 rounded-xl p-4 border border-white/5">
                <div className="text-sm text-stellar-400 font-medium mb-1">Date</div>
                <div className="text-xl font-bold">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDisplay;