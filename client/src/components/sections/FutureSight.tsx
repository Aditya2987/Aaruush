import { motion } from 'framer-motion';
import { Telescope, MapPin, Calendar, Eye } from 'lucide-react';
import { useFutureEvents } from '../../hooks/useFutureEvents';
import LoadingScreen from '../ui/LoadingScreen';

const FutureSight = () => {
  const { data: events, isLoading, isError } = useFutureEvents();

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-title">FutureSight</h2>
        <p className="text-xl text-void-300 max-w-3xl mx-auto">
          Peer into the cosmic future. Discover upcoming astronomical events and celestial phenomena you won't want to miss.
        </p>
      </motion.div>

      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <Eye className="h-6 w-6 text-nebula-400" />
          <h3 className="text-2xl font-display font-bold">Upcoming Cosmic Events</h3>
        </div>

        {isLoading && <LoadingScreen text="Gazing into the cosmic future..." />}
        
        {isError && (
          <div className="text-center py-12">
            <Telescope className="h-12 w-12 text-void-400 mx-auto mb-4" />
            <div className="text-void-300 mb-2">Unable to load future events</div>
            <p className="text-void-400">The cosmic forecast is temporarily unavailable.</p>
          </div>
        )}

        {events && events.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cosmic-border bg-void-800/20 rounded-xl p-6 hover:bg-void-800/30 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-stellar-400 to-nebula-400 rounded-full flex items-center justify-center">
                      <Telescope className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                    
                    <div className="flex items-center space-x-4 text-sm text-void-300 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-sm text-stellar-400 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>Best visibility: {event.visibility_region}</span>
                    </div>
                    
                    {event.description && (
                      <p className="text-void-300 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {events && events.length === 0 && !isLoading && !isError && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-void-400 mx-auto mb-4" />
            <div className="text-void-300 mb-2">No upcoming events</div>
            <p className="text-void-400">Check back later for new cosmic phenomena.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FutureSight;