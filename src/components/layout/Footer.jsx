import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import spotnodesLogo from '../../assets/spotnodeslogo.png';

const SocialDropdown = ({ title, links, colorClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative z-50 flex items-center justify-center p-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`cursor-pointer transition-colors flex items-center gap-1 ${isOpen ? colorClass : 'text-surface-variant hover:text-[var(--text-main)]'}`}>
        {title} <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: "spring", stiffness: 300 }}><ArrowUpRight className="w-3 h-3" /></motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(5px)' }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 min-w-[140px] bg-surface-lowest/90 backdrop-blur-3xl border border-[var(--glass-border)] rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col gap-1 overflow-hidden pointer-events-auto"
          >
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[var(--glass-border)] transition-colors text-xs font-bold ${colorClass}`}
              >
                {link.name}
                <ArrowUpRight className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full border-t border-outline-variant/30 py-8 px-6 bg-surface-lowest">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div 
           className="flex items-center gap-3 cursor-pointer group"
           onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <motion.div
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img src={spotnodesLogo} alt="Spotnodes Logo" className="w-8 h-8 object-contain drop-shadow-md grayscale group-hover:grayscale-0 transition-all duration-500" />
          </motion.div>
          <span className="text-[var(--text-main)] transition-colors duration-500 font-manrope font-bold text-xl group-hover:text-primary">Spotnodes Lab</span>
        </div>

        <div className="text-surface-variant text-sm flex gap-4 md:gap-6 items-center relative z-40">
          <SocialDropdown 
             title="GitHub" 
             colorClass="text-primary"
             links={[
               { name: 'Hadi', url: 'https://github.com/mohdhadi01' },
               { name: 'Akhilesh', url: 'https://github.com/Akhilesh-va' }
             ]} 
          />
          <SocialDropdown 
             title="LinkedIn" 
             colorClass="text-secondary"
             links={[
               { name: 'Hadi', url: 'https://www.linkedin.com/in/mohd-hadi-5a4638226/' },
               { name: 'Akhilesh', url: 'https://www.linkedin.com/in/akhilesh2002/' }
             ]} 
          />
          <SocialDropdown 
             title="Instagram" 
             colorClass="text-[#e8b4b8]"
             links={[
               { name: 'Hadi', url: 'https://www.instagram.com/mysterbyte/' },
               { name: 'Akhilesh', url: 'https://www.instagram.com/engg.vlogs/' }
             ]} 
          />
        </div>

        <div className="text-surface-variant text-sm">
          &copy; {new Date().getFullYear()} Spotnodes Lab. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
