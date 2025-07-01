import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import '../../styles/Calendar.css';

interface EventCalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const EventCalendar = ({ selectedDate, setSelectedDate }: EventCalendarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Calendar
        onChange={(value) => setSelectedDate(value as Date)}
        value={selectedDate}
        className="cosmic-calendar"
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            
            let classes = 'calendar-tile';
            if (isToday) classes += ' calendar-tile-today';
            if (isSelected) classes += ' calendar-tile-selected';
            
            return classes;
          }
          return '';
        }}
      />
    </motion.div>
  );
};

export default EventCalendar;