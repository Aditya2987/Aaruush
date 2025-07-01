import React, { useState } from 'react';
import { useCosmicTimeline } from '../../hooks/useCosmicTimeline';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { AnimatePresence, motion } from 'framer-motion';

const CosmicTimeline = () => {
  const [birthDate, setBirthDate] = useState('');
  const [submittedDate, setSubmittedDate] = useState('');

  const { data: events, isLoading, isError, hasSearched } = useCosmicTimeline(submittedDate);

  const handleFetchTimeline = () => {
    if (!birthDate) return;
    setSubmittedDate(birthDate);
  };

  return (
    <GlassCard className="p-6 md:p-8 flex flex-col h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-brand-purple mb-2">Your Cosmic Timeline</h2>
      <p className="text-center text-light-blue/80 mb-6">See what happened in space during your lifetime.</p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <Input 
          type="date" 
          value={birthDate} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)} 
          className="w-full sm:w-auto"
        />
        <Button onClick={handleFetchTimeline} disabled={isLoading || !birthDate} className="w-full sm:w-auto">
          {isLoading ? 'Generating...' : 'Generate Timeline'}
        </Button>
      </div>

      <div className="flex-grow space-y-3 max-h-80 overflow-y-auto pr-2">
        {isLoading && <Loader text="Charting your cosmic journey..." />}
        {isError && <ErrorMessage message="Could not generate timeline." />}
        
        <AnimatePresence>
          {events && events.map((event, index) => (
            <motion.div 
              key={event.id} 
              className="bg-space-blue/60 p-3 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="font-bold text-brand-cyan text-sm">{new Date(event.full_date).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-md text-white">{event.title}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasSearched && !isLoading && events?.length === 0 && (
          <ErrorMessage type="info" message="No major events found in our database for this period." />
        )}
      </div>
    </GlassCard>
  );
};

export default CosmicTimeline;
