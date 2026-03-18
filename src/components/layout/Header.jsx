import React, { useState, useEffect } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import spotnodesLogo from '../../assets/spotnodeslogo.png';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#projects' },
    { name: 'Team', href: '#about' }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-surface-lowest/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div 
             className="flex items-center gap-3 z-50 cursor-pointer group"
             onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
             <motion.div
               whileHover={{ rotate: 180, scale: 1.2 }}
               whileTap={{ scale: 0.9 }}
               transition={{ type: "spring", stiffness: 300, damping: 15 }}
             >
               <img src={spotnodesLogo} alt="Spotnodes Logo" className="w-8 h-8 object-contain drop-shadow-md" />
             </motion.div>
             <span className="text-[var(--text-main)] transition-colors duration-500 font-manrope font-bold text-xl md:text-2xl tracking-tight group-hover:text-primary">Spotnodes Lab</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[var(--text-main)]/70 hover:text-[var(--text-main)] text-sm font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
            <ThemeToggle />
            <div onClick={scrollToContact} className="cursor-pointer">
              <MagneticButton className="px-6 py-2.5 text-sm">
                Let's Talk
              </MagneticButton>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50 flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="text-[var(--text-main)] p-2 transition-colors duration-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface-lowest/95 backdrop-blur-xl pt-32 px-6 pb-6 flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8 mb-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-2xl font-manrope font-bold text-[var(--text-main)] transition-colors duration-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div onClick={scrollToContact} className="w-full max-w-sm mt-4">
              <MagneticButton className="px-8 py-4 text-lg w-full">
                Start Project
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
