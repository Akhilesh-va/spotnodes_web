import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Antigravity } from '../ui/Antigravity';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const Hero = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Reveal main content after 1.5 seconds (gives the intro 1.2s + 0.3s transition buffer)
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  const elementFadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', damping: 25, stiffness: 120 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      
      {/* Background Nebula Mesh (Now pure Framer Motion) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/20 to-secondary-container/20 blur-[100px]" 
        />
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95, textShadow: "0px 0px 5px rgba(208, 188, 255, 0.1)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              textShadow: "0px 0px 40px rgba(208, 188, 255, 0.4)",
              transition: { duration: 0.8, ease: "easeOut" }
            }}
            exit={{ 
              opacity: 0, 
              y: -20, 
              filter: 'blur(10px)',
              transition: { duration: 0.6, ease: "anticipate" } 
            }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <h1 className="text-4xl md:text-5xl font-black font-manrope text-white tracking-[0.2em] uppercase">
              Spotnodes Lab
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content (Hidden until intro is gone to avoid overlap) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        // Wait for the exit transition to finish gracefully, then spring staggered UI in
        animate={!showIntro ? "show" : "hidden"}
        // pointer-events none during intro so user can't hover invisible buttons
        className={`relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center ${showIntro ? 'pointer-events-none invisible' : 'visible'}`}
      >
        
        <Antigravity delay={0}>
          <motion.div variants={elementFadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant bg-surface-low/50 backdrop-blur-md mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary-fixed text-sm font-inter tracking-wider uppercase">Spotnodes Lab</span>
          </motion.div>
        </Antigravity>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black font-manrope tracking-tighter leading-[1.05] mb-6 max-w-5xl">
          {'We Engineer Scalable'.split(' ').map((word, i) => (
             <span key={i} className="inline-block overflow-hidden pb-2 mr-4">
               <motion.span variants={wordVariants} className="inline-block text-white">
                 {word}
               </motion.span>
             </span>
          ))}
          <br className="hidden md:block"/>
          
          <span className="inline-block overflow-hidden pb-4 relative">
             <motion.span 
               variants={wordVariants} 
               className="inline-block relative z-10"
             >
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] inline-block pb-2 px-1"
                  // Slower gradient cycling after it elegantly drops in
                  animate={{ backgroundPosition: ["0% center", "200% center"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
                >
                  Digital Products
                </motion.span>
                
                {/* Subtle soft pulse glow behind the final word after it enters */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.1, 0.8] }}
                  transition={{ delay: 2.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-secondary/30 blur-[40px] rounded-full -z-10"
                />
             </motion.span>
          </span>
        </h1>

        <motion.p variants={elementFadeUp} className="text-lg md:text-xl text-surface-variant max-w-3xl mx-auto mb-10 font-inter leading-relaxed">
          From high-performance Android applications to modern web platforms, we craft reliable, scalable, and user-focused digital experiences.
        </motion.p>

        <motion.div variants={elementFadeUp} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer">
            <MagneticButton className="px-8 py-4 text-lg hover:bg-white/5 transition-colors group">
              <span className="flex items-center gap-3">
                Start a Project 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>
          </div>
          
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 text-lg font-manrope font-bold text-white border border-outline-variant hover:border-white/20 hover:bg-white/5 rounded-xl transition-all duration-300 flex items-center gap-2 group relative overflow-hidden cursor-pointer">
             <div className="absolute inset-0 bg-white/5 items-start justify-center translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
             <span className="relative z-10 flex items-center gap-2">
               View Our Work
               <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
             </span>
          </button>
        </motion.div>
        
        <motion.p variants={elementFadeUp} className="text-sm text-surface-variant/80 font-medium tracking-wide flex items-center gap-2">
          <span className="w-8 h-[1px] bg-surface-variant/30" />
          Trusted by startups and growing businesses
          <span className="w-8 h-[1px] bg-surface-variant/30" />
        </motion.p>
      </motion.div>
      
      {/* Floating Elements / Antigravity UI decorations - Reveal simultaneously with Main Component */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={!showIntro ? "show" : "hidden"}
        className="absolute inset-0 pointer-events-none"
      >
        <Antigravity className="absolute top-[25%] left-[5%] hidden lg:block" delay={0.5}>
           <motion.div variants={elementFadeUp} className="px-5 py-3 rounded-full border border-white/10 bg-surface-low/60 backdrop-blur-md rotate-[-6deg] shadow-[0_0_30px_rgba(208,188,255,0.1)]">
              <span className="text-secondary font-manrope font-bold text-sm tracking-wide">Android</span>
           </motion.div>
        </Antigravity>
        
        <Antigravity className="absolute bottom-[25%] right-[8%] hidden lg:block" delay={1.5}>
           <motion.div variants={elementFadeUp} className="px-5 py-3 rounded-full border border-white/10 bg-surface-low/60 backdrop-blur-md rotate-[8deg] shadow-[0_0_30px_rgba(208,188,255,0.1)]">
              <span className="text-primary font-manrope font-bold text-sm tracking-wide">Web</span>
           </motion.div>
        </Antigravity>

        <Antigravity className="absolute top-[18%] right-[15%] hidden lg:block" delay={2.5}>
           <motion.div variants={elementFadeUp} className="px-5 py-3 rounded-full border border-white/10 bg-surface-low/40 backdrop-blur-md rotate-[12deg]">
              <span className="text-secondary-fixed font-manrope font-semibold text-xs tracking-wider">React Native</span>
           </motion.div>
        </Antigravity>
      </motion.div>
      
    </section>
  );
};
