import Calendar from 'react-calendar';
import '../../styles/Calendar.css';
import GlassCard from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';

type EventCalendarProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const EventCalendar = ({ selectedDate, setSelectedDate }: EventCalendarProps) => {
  return (
    <GlassCard className="p-4">
      <motion.h2 
        className="text-2xl font-bold text-white text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore The Cosmos
      </motion.h2>
      <Calendar
        onChange={(value) => setSelectedDate(value as Date)}
        value={selectedDate}
        tileClassName="transition-transform transform hover:scale-110"
      />
    </GlassCard>
  );
};

export default EventCalendar;
