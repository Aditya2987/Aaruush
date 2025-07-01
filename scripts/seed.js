// scripts/seed.js
import 'dotenv/config'; // Modern way to load .env
import { createClient } from '@supabase/supabase-js';

// These will be loaded from your .env file
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// The rest of the script is the same...
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// scripts/seed.js

// ... (keep the import and supabase client setup at the top)

const events = [
  {
    title: 'Cassini Begins Orbit of Saturn',
    summary: 'After a seven-year journey, NASA\'s Cassini spacecraft successfully entered orbit around Saturn...',
    eventDate: '07-01',
    year: 2004,
    imageUrl: 'https://images.nasa.gov/images/PIA05389/PIA05389~medium.jpg',
    full_date: '2004-07-01' // NEW
  },
  {
    title: 'Viking 1 Lands on Mars',
    summary: 'NASA\'s Viking 1 performed the first successful landing on Mars...',
    eventDate: '07-20',
    year: 1976,
    imageUrl: 'https://images.nasa.gov/images/76-h-565/76-h-565~medium.jpg',
    full_date: '1976-07-20' // NEW
  },
  {
      title: 'Apollo 11 Lands on the Moon',
      summary: 'Neil Armstrong and Buzz Aldrin become the first humans to land on the Moon...',
      eventDate: '07-20',
      year: 1969,
      imageUrl: 'https://images.nasa.gov/images/as11-40-5875/as11-40-5875~medium.jpg',
      full_date: '1969-07-20' // NEW
  },
  {
      title: 'New Horizons Pluto Flyby',
      summary: 'NASA\'s New Horizons spacecraft performs the first-ever flyby of the dwarf planet Pluto...',
      eventDate: '07-14',
      year: 2015,
      imageUrl: 'https://images.nasa.gov/images/nh-pluto-in-false-color/nh-pluto-in-false-color~medium.jpg',
      full_date: '2015-07-14' // NEW
  }
];

// NEW: Data for the future_events table
const futureEvents = [
  {
    title: 'Perseids Meteor Shower Peak',
    description: 'The Perseids are one ofthe brightest meteor showers of the year, known for their fireballs.',
    event_date: '2025-08-13',
    visibility_region: 'Northern Hemisphere'
  },
  {
    title: 'Total Lunar Eclipse',
    description: 'A "blood moon" will be visible as the Earth passes directly between the Sun and Moon.',
    event_date: '2026-03-03',
    visibility_region: 'North America, Pacific Ocean'
  },
  {
    title: 'Total Solar Eclipse',
    description: 'A major total solar eclipse will cross over North Africa and the Middle East.',
    event_date: '2027-08-02',
    visibility_region: 'Spain, Morocco, Egypt'
  }
];

// NEW: Function to seed the new table
const seedFutureEvents = async () => {
  console.log('Seeding future events...');

  const { error: deleteError } = await supabase.from('future_events').delete().neq('id', 0);
  if (deleteError) {
      console.error('Error clearing future_events table:', deleteError);
      return;
  }

  const { data, error } = await supabase.from('future_events').insert(futureEvents);
  if (error) {
    console.error('Error seeding future_events:', error);
  } else {
    console.log('Future events seeded successfully!');
  }
};

// --- Modify the main function to run both seeders ---
const seedDatabase = async () => {
  console.log('Seeding historical events...');
  const { error: deleteError } = await supabase.from('events').delete().neq('id', 0);
  if (deleteError) {
      console.error('Error clearing events table:', deleteError);
      return;
  }
  console.log('Existing events cleared.');
  const { data, error } = await supabase.from('events').insert(events);
  if (error) {
    console.error('Error seeding historical events:', error);
  } else {
    console.log('Historical events seeded successfully!');
  }

  // NEW: Call the new seeder function
  await seedFutureEvents();
};

seedDatabase();