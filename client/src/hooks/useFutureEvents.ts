import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

type FutureEvent = { title: string; event_date: string; visibility_region: string; };

const fetchUpcomingEvents = async (): Promise<FutureEvent[]> => {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('future_events')
    .select('*')
    .gte('event_date', today)
    .order('event_date', { ascending: true })
    .limit(4);

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

export const useFutureEvents = () => {
    return useQuery<FutureEvent[], Error>({
        queryKey: ['futureEvents'],
        queryFn: fetchUpcomingEvents,
        staleTime: 6 * 60 * 60 * 1000, // Cache for 6 hours
    });
};
