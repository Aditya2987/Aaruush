import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

type SpaceEvent = {
  id: number;
  title: string;
  summary: string;
  year: number;
};

const fetchEventForDate = async (date: Date): Promise<SpaceEvent | null> => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateString = `${month}-${day}`;

  const { data, error } = await supabase
    .from('events')
    .select('id, title, summary, year')
    .eq('eventDate', dateString)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useSpaceEvents = (date: Date) => {
  return useQuery<SpaceEvent | null, Error>({
    queryKey: ['spaceEvent', date.toDateString()],
    queryFn: () => fetchEventForDate(date),
  });
};
