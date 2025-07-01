import { useFutureEvents } from '../../hooks/useFutureEvents';
import GlassCard from '../../components/ui/GlassCard';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { Telescope } from 'lucide-react';
import { motion } from 'framer-motion';

const FutureSight = () => {
  const { data: events, isLoading, isError } = useFutureEvents();

  return (
    <GlassCard className="p-6 md:p-8 h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-brand-pink mb-6">FutureSight: What's Next?</h2>
      
      <div className="space-y-4">
        {isLoading && <Loader text="Gazing into the future..." />}
        {isError && <ErrorMessage message="Could not predict future events." />}
        
        {events && events.map((event, index) => (
          <motion.div 
            key={event.title} 
            className="bg-space-blue/60 p-4 rounded-lg flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Telescope className="text-brand-pink mt-1 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg text-white">{event.title}</p>
              <p className="text-sm text-light-blue">{new Date(event.event_date).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-sm text-light-blue/70 mt-1">Best Visibility: {event.visibility_region}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default FutureSight;
