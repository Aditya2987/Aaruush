import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

type TimelineEvent = { id: number; title: string; full_date: string; };

const fetchTimeline = async (birthDate: string): Promise<TimelineEvent[]> => {
  if (!birthDate) return [];
  
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('events')
    .select('id, title, full_date')
    .gte('full_date', birthDate)
    .lte('full_date', today)
    .order('full_date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const useCosmicTimeline = (birthDate: string) => {
  const queryInfo = useQuery<TimelineEvent[], Error>({
    queryKey: ['cosmicTimeline', birthDate],
    queryFn: () => fetchTimeline(birthDate),
    enabled: !!birthDate, // Only run query if birthDate is set
  });

  return { ...queryInfo, hasSearched: !!birthDate };
};
