import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';

const STATS = [
  { value: 4, label: 'Projects Delivered', suffix: '+', color: '#d0bcff' }, // primary
  { value: 2, label: 'Android Apps', suffix: '', color: '#4fd8eb' }, // cyan
  { value: 2, label: 'Web Apps', suffix: '', color: '#ccc2dc' }, // secondary
  { value: 100, label: 'Client Satisfaction', suffix: '%', color: '#e8b4b8' } // warm
];

const StatCard = ({ stat, index, hoveredIndex, setHoveredIndex }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  // Real-time Number Spring Engine
  const count = useMotionValue(0);
  const animatedCount = useSpring(count, { stiffness: 45, damping: 15, mass: 1 });
  const displayCount = useTransform(animatedCount, latest => Math.floor(latest));

  useEffect(() => {
     if (isInView) {
        // Staggered firing of the math system
        setTimeout(() => count.set(stat.value), index * 150);
     }
  }, [isInView, count, stat.value, index]);

  // 3D Tilt Variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXRaw = useTransform(y, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateYRaw = useTransform(x, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    x.set(0);
    y.set(0);
  };

  const isFocused = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", damping: 20 }}
      animate={{
        opacity: isOtherHovered ? 0.3 : 1,
        filter: isOtherHovered ? 'blur(6px)' : 'blur(0px)',
        scale: isFocused ? 1.05 : 1,
        y: isFocused ? -8 : 0,
        rotateX,
        rotateY,
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative w-full h-[220px] md:h-[260px] group cursor-default z-10"
    >
      <motion.div 
         className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-surface-lowest/40 backdrop-blur-xl border transition-all duration-500 flex flex-col items-center justify-center pointer-events-none"
         style={{ 
            boxShadow: isFocused ? `0 20px 50px -10px ${stat.color}30` : '0 10px 30px -10px rgba(0,0,0,0.5)',
            borderColor: isFocused ? `${stat.color}50` : 'var(--glass-border)'
         }}
      >
         {/* Internal Plasma Energy Flow */}
         <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-20"
               style={{ background: `conic-gradient(from 0deg, transparent, ${stat.color}, transparent)` }}
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
         </div>
         <div className="absolute inset-[1px] bg-surface-lowest/90 rounded-[2.5rem] z-0" />

         {/* Expanding Pulse Ring on Completion */}
         <AnimatePresence>
            {isInView && (
               <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 + 1, ease: "easeOut" }}
                  className="absolute w-[80px] h-[80px] rounded-full z-0 pointer-events-none"
                  style={{ border: `1px solid ${stat.color}` }}
               />
            )}
         </AnimatePresence>
         
         {/* Static Core Glow */}
         <div className="absolute w-[140px] h-[140px] rounded-full z-0 opacity-10 blur-[40px] transition-opacity duration-500 group-hover:opacity-30" style={{ backgroundColor: stat.color }} />

         {/* Content Layer (Lifted from background via transformZ for parallax shadow depth) */}
         <motion.div 
            className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ translateZ: 60 }}
         >
            <div className="flex items-baseline mb-3 justify-center">
               <motion.span 
                 className={`text-[4rem] md:text-[5rem] font-black font-manrope tracking-tighter drop-shadow-[0_0_15px_var(--glass-border)] transition-colors duration-300 ${isFocused ? 'text-[var(--text-main)]' : 'text-[var(--text-main)]/95'}`}
               >
                 {displayCount}
               </motion.span>
               <span 
                 className="text-3xl md:text-4xl font-black font-manrope ml-0.5 transition-colors duration-300 drop-shadow-md"
                 style={{ color: stat.color }}
               >
                 {stat.suffix}
               </span>
            </div>
            
            <motion.p 
               className="text-surface-variant font-bold font-inter tracking-[0.15em] text-[10px] md:text-[11px] uppercase text-center max-w-[140px] leading-relaxed relative"
               animate={{ opacity: isFocused ? 1 : 0.6, y: isFocused ? -2 : 0 }}
               transition={{ duration: 0.3 }}
            >
               {stat.label}
            </motion.p>
         </motion.div>

      </motion.div>
    </motion.div>
  );
};

export const Stats = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Custom coordinate system for ambient background parallax
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  
  const springBgX = useSpring(useTransform(bgX, [0, window.innerWidth], [-20, 20]), { stiffness: 50, damping: 20 });
  const springBgY = useSpring(useTransform(bgY, [0, window.innerHeight], [-20, 20]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    const trackMouse = (e) => {
      bgX.set(e.clientX);
      bgY.set(e.clientY);
    };
    window.addEventListener("mousemove", trackMouse);
    return () => window.removeEventListener("mousemove", trackMouse);
  }, [bgX, bgY]);

  return (
    <section className="py-32 px-6 relative w-full overflow-hidden bg-surface-lowest border-y border-white/5">
      
      {/* Background Ambience Layer */}
      <motion.div 
         className="absolute inset-0 pointer-events-none z-0"
         style={{ x: springBgX, y: springBgY }}
      >
         {/* Particles emulation via multiple radial depths */}
         <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(208,188,255,0.03),transparent_60%)] rounded-full blur-3xl opacity-50" />
         <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(79,216,235,0.02),transparent_60%)] rounded-full blur-3xl opacity-50" />
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10 mt-8">
         
         {/* Section Header */}
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="w-full text-center flex flex-col items-center"
         >
            <h2 className="text-4xl md:text-5xl font-black font-manrope text-white mb-6 tracking-wide drop-shadow-lg">
               System <span className="text-primary italic font-light drop-shadow-[0_0_20px_rgba(208,188,255,0.4)]">Metrics</span>
            </h2>
            <p className="text-surface-variant text-base md:text-lg tracking-wide max-w-2xl text-center leading-relaxed">
               Live tracking of engineering throughput, shipped architectures, and measurable outcomes.
            </p>
         </motion.div>

         {/* Interactive Data Grid */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 perspective-1000 pb-16">
           {STATS.map((stat, i) => (
             <StatCard 
               key={i} 
               stat={stat} 
               index={i} 
               hoveredIndex={hoveredIndex} 
               setHoveredIndex={setHoveredIndex} 
             />
           ))}
         </div>
      </div>
    </section>
  );
};
