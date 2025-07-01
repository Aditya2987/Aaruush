import { motion } from 'framer-motion';
import { Image, ExternalLink, Download } from 'lucide-react';

const SpaceGallery = () => {
  // Sample gallery data - in a real app, this would come from an API
  const galleryItems = [
    {
      id: 1,
      title: 'Hubble Deep Field',
      description: 'A glimpse into the distant universe showing thousands of galaxies.',
      imageUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg',
      category: 'Deep Space',
    },
    {
      id: 2,
      title: 'Saturn\'s Rings',
      description: 'Detailed view of Saturn\'s magnificent ring system.',
      imageUrl: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg',
      category: 'Planets',
    },
    {
      id: 3,
      title: 'Nebula Formation',
      description: 'Stellar nursery where new stars are born.',
      imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
      category: 'Nebulae',
    },
    {
      id: 4,
      title: 'Mars Surface',
      description: 'High-resolution imagery from Mars rovers.',
      imageUrl: 'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg',
      category: 'Mars',
    },
    {
      id: 5,
      title: 'International Space Station',
      description: 'Humanity\'s outpost in low Earth orbit.',
      imageUrl: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg',
      category: 'Space Stations',
    },
    {
      id: 6,
      title: 'Solar Eclipse',
      description: 'The moon perfectly blocking the sun\'s light.',
      imageUrl: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg',
      category: 'Solar System',
    },
  ];

  const categories = ['All', 'Deep Space', 'Planets', 'Nebulae', 'Mars', 'Space Stations', 'Solar System'];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-title">Cosmic Gallery</h2>
        <p className="text-xl text-void-300 max-w-3xl mx-auto">
          Explore stunning imagery from space missions, telescopes, and astronomical observations that capture the beauty of our universe.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button text-sm px-4 py-2"
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group glass-card overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="glass-button p-3"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="glass-button p-3"
                  >
                    <Download className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-stellar-400 bg-stellar-400/10 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <Image className="h-4 w-4 text-void-400" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-void-300 text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cosmic-border glass-button bg-gradient-to-r from-stellar-500 to-nebula-500 text-white font-semibold px-8 py-3"
        >
          Load More Images
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SpaceGallery;