import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Telescope, Calendar, Clock, Image, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Explore', href: '#explore', icon: Telescope },
    { name: 'Timeline', href: '#timeline', icon: Clock },
    { name: 'Future', href: '#future', icon: Calendar },
    { name: 'Gallery', href: '#gallery', icon: Image },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-void-950/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Sparkles className="h-8 w-8 text-stellar-400" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-8 w-8 text-nebula-400" />
              </div>
            </div>
            <span className="text-2xl font-display font-bold text-gradient">
              Celestial Chronicles
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 glass-button text-sm"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass-button p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-void-950/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-stellar-400" />
                      <span className="text-lg">{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;