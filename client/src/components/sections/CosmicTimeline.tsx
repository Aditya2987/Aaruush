import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Calendar, Sparkles } from 'lucide-react';
import { useCosmicTimeline } from '../../hooks/useCosmicTimeline';
import LoadingScreen from '../ui/LoadingScreen';

const CosmicTimeline = () => {
  const [birthDate, setBirthDate] = useState('');
  const [submittedDate, setSubmittedDate] = useState('');
  const { data: events, isLoading, isError, hasSearched } = useCosmicTimeline(submittedDate);

  const handleGenerateTimeline = () => {
    if (birthDate) {
      setSubmittedDate(birthDate);
    }
  };

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-title">Your Cosmic Timeline</h2>
        <p className="text-xl text-void-300 max-w-3xl mx-auto">
          Discover the incredible space events that happened during your lifetime and see how the cosmos evolved alongside you.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-stellar-400" />
              <h3 className="text-xl font-display font-bold">Personal Timeline</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-void-300 mb-2">
                  Your Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-xl focus:border-stellar-400 focus:outline-none transition-colors"
                />
              </div>
              
              <motion.button
                onClick={handleGenerateTimeline}
                disabled={!birthDate || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cosmic-border glass-button bg-gradient-to-r from-stellar-500 to-nebula-500 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Timeline</span>
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Timeline Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-6 min-h-[600px]">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-nebula-400" />
              <h3 className="text-xl font-display font-bold">Your Cosmic Journey</h3>
            </div>

            <div className="h-[500px] overflow-y-auto pr-4">
              {isLoading && <LoadingScreen text="Charting your cosmic journey..." />}
              
              {isError && (
                <div className="text-center py-12">
                  <div className="text-red-400 mb-4">Unable to generate timeline</div>
                  <p className="text-void-400">Please try again with a different date.</p>
                </div>
              )}

              {hasSearched && !isLoading && events?.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-void-400 mx-auto mb-4" />
                  <div className="text-void-300 mb-2">No events found</div>
                  <p className="text-void-400">Try a different birth date to see cosmic events.</p>
                </div>
              )}

              <AnimatePresence>
                {events && events.length > 0 && (
                  <div className="space-y-4">
                    {events.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 pb-6"
                      >
                        {/* Timeline line */}
                        {index < events.length - 1 && (
                          <div className="absolute left-3 top-8 w-0.5 h-full bg-gradient-to-b from-stellar-400 to-transparent" />
                        )}
                        
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-2 w-6 h-6 bg-gradient-to-r from-stellar-400 to-nebula-400 rounded-full border-2 border-void-950" />
                        
                        {/* Event content */}
                        <div className="bg-void-800/30 rounded-xl p-4 border border-white/5">
                          <div className="text-sm text-stellar-400 font-mono mb-1">
                            {new Date(event.full_date).toLocaleDateString('en-US', {
                              timeZone: 'UTC',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h4 className="text-white font-semibold">{event.title}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CosmicTimeline;