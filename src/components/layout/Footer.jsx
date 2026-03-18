import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import spotnodesLogo from '../../assets/spotnodeslogo.png';

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

        <div className="text-surface-variant text-sm flex gap-6">
          <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
            GitHub <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="#" className="hover:text-secondary transition-colors flex items-center gap-1">
            LinkedIn <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Twitter <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="text-surface-variant text-sm">
          &copy; {new Date().getFullYear()} Spotnodes Lab. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
