import { motion } from 'framer-motion';
import { Calendar, Clock, Telescope } from 'lucide-react';
import { useSpaceEvents } from '../../hooks/useSpaceEvents';
import EventCalendar from '../features/EventCalendar';
import EventDisplay from '../features/EventDisplay';
import LoadingScreen from '../ui/LoadingScreen';

interface EventExplorerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const EventExplorer = ({ selectedDate, setSelectedDate }: EventExplorerProps) => {
  const { data: event, isLoading } = useSpaceEvents(selectedDate);

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-title">Explore Cosmic History</h2>
        <p className="text-xl text-void-300 max-w-3xl mx-auto">
          Journey through time and discover the astronomical events that shaped our understanding of the universe.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="h-6 w-6 text-stellar-400" />
              <h3 className="text-xl font-display font-bold">Select a Date</h3>
            </div>
            <EventCalendar 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
            />
          </div>
        </motion.div>

        {/* Event Display Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-6 min-h-[600px]">
            <div className="flex items-center space-x-3 mb-6">
              <Telescope className="h-6 w-6 text-nebula-400" />
              <h3 className="text-xl font-display font-bold">
                {selectedDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
            </div>
            
            {isLoading ? (
              <LoadingScreen text="Searching cosmic archives..." />
            ) : (
              <EventDisplay selectedDate={selectedDate} />
            )}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { icon: Clock, label: 'Years of History', value: '60+' },
          { icon: Telescope, label: 'Space Missions', value: '500+' },
          { icon: Calendar, label: 'Cosmic Events', value: '1000+' },
        ].map((stat, index) => (
          <div key={stat.label} className="glass-card p-6 text-center">
            <stat.icon className="h-8 w-8 text-stellar-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
            <div className="text-void-300">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default EventExplorer;