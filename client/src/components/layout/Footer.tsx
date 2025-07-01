import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Mail, Heart, Telescope, Calendar, Clock, Image } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Event Explorer', href: '#explore', icon: Telescope },
        { name: 'Cosmic Timeline', href: '#timeline', icon: Clock },
        { name: 'Future Events', href: '#future', icon: Calendar },
        { name: 'Space Gallery', href: '#gallery', icon: Image },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'NASA API', href: 'https://api.nasa.gov', external: true },
        { name: 'Space News', href: 'https://spacenews.com', external: true },
        { name: 'ESA Portal', href: 'https://www.esa.int', external: true },
        { name: 'SpaceX', href: 'https://www.spacex.com', external: true },
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'GitHub', href: '#', icon: Github, external: true },
        { name: 'Twitter', href: '#', icon: Twitter, external: true },
        { name: 'Contact', href: '#', icon: Mail, external: true },
      ]
    }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-void-950/80 backdrop-blur-xl">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 text-stellar-400" />
                </motion.div>
                <div className="absolute inset-0 animate-pulse">
                  <Sparkles className="h-8 w-8 text-nebula-400" />
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-gradient">
                Celestial Chronicles
              </h3>
            </div>
            
            <p className="text-void-300 mb-6 leading-relaxed">
              Journey through space and time. Discover the cosmic events that shaped our understanding of the universe.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-void-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>for space enthusiasts</span>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-void-300 hover:text-stellar-400 transition-colors group"
                        >
                          {Icon && <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />}
                          <span>{link.name}</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className="flex items-center space-x-2 text-void-300 hover:text-stellar-400 transition-colors group text-left"
                        >
                          {Icon && <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />}
                          <span>{link.name}</span>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-void-950/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-void-400">
              <span>© {currentYear} Celestial Chronicles</span>
              <span className="hidden md:inline">•</span>
              <span>Powered by NASA & Supabase</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-void-400">
              <button className="hover:text-stellar-400 transition-colors">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-stellar-400 transition-colors">
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:text-stellar-400 transition-colors">
                About
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-stellar-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;