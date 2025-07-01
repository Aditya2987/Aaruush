import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ApodData = {
  title: string;
  url: string;
  hdurl: string;
  media_type: 'image' | 'video';
};

const fetchAPOD = async (): Promise<ApodData> => {
  const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  const { data } = await axios.get<ApodData>(url);

  if (data.media_type === 'image') {
    return data;
  } else {
    // Provide a beautiful fallback if APOD is a video
    return {
      title: "A Glimpse into the Void",
      hdurl: "/src/assets/fallback-hero.jpg",
      url: "/src/assets/fallback-hero.jpg",
      media_type: 'image'
    };
  }
};

export const useNasaApod = () => {
  return useQuery<ApodData, Error>({
    queryKey: ['apod'],
    queryFn: fetchAPOD,
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });
};
