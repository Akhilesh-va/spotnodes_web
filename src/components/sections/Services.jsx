import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, Smartphone, Gamepad2, TrendingUp, ChevronDown } from 'lucide-react';

const services = [
  {
    id: 'web',
    title: 'Web Engineering',
    icon: Globe,
    tech: ['React', 'Next.js', 'Node.js', 'Express', 'Spring', 'Tailwind', 'Framer Motion', 'GSAP', 'MongoDB', 'PostgreSQL'],
    color: '#d0bcff' 
  },
  {
    id: 'app',
    title: 'App Engineering',
    icon: Smartphone,
    tech: ['Kotlin', 'Java', 'Jetpack Compose', 'React Native', 'Android SDK', 'REST APIs'],
    color: '#ccc2dc'
  },
  {
    id: 'game',
    title: 'Game Engineering',
    icon: Gamepad2,
    tech: ['Three.js', 'Unity', 'WebGL', '3D Rendering', 'Physics Engines'],
    color: '#4fd8eb' 
  },
  {
    id: 'aso',
    title: 'ASO & Growth',
    icon: TrendingUp,
    tech: ['Keyword Optimization', 'App Ranking', 'Store Listing', 'Conversion Optimization', 'Analytics'],
    color: '#e8b4b8' 
  }
];

// Pre-generated static particles to avoid hydration mismatches
const staticParticles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  opacity: Math.random() * 0.3 + 0.1,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * -20,
}));

const ParallaxBackground = ({ mouseX, mouseY }) => {
  // Translate mouse movements into subtle parallax shifts for the background
  const x = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);
  const y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [20, -20]);
  
  const springX = useSpring(x, { stiffness: 40, damping: 20 });
  const springY = useSpring(y, { stiffness: 40, damping: 20 });

  return (
    <motion.div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ x: springX, y: springY }}
    >
       {/* Ambient soft glow radiating from center */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
       
       {/* Floating neural particles */}
       {staticParticles.map((p) => (
         <motion.div
           key={p.id}
           className="absolute rounded-full bg-white"
           style={{
             left: `${p.x}%`,
             top: `${p.y}%`,
             width: p.size,
             height: p.size,
             opacity: p.opacity,
           }}
           animate={{
             y: [0, -30, 0],
             x: [0, Math.random() * 20 - 10, 0]
           }}
           transition={{
             duration: p.duration,
             repeat: Infinity,
             ease: "linear",
             delay: p.delay
           }}
         />
       ))}

       {/* Subliminal idle veins sprawling the background for deep depth */}
       <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <path d="M 20% 0 Q 30% 50% 10% 100%" stroke="white" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M 80% 0 Q 70% 50% 90% 100%" stroke="white" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M 50% 20% Q 20% 40% 0 30%" stroke="white" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M 50% 80% Q 80% 60% 100% 70%" stroke="white" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
       </svg>
    </motion.div>
  );
};

const VeinNode = ({ service, index, isActive, activeNode, setActiveNode, isMobile }) => {
  const half = Math.ceil(service.tech.length / 2);
  const leftTechs = service.tech.slice(0, half);
  const rightTechs = service.tech.slice(half);

  const getPositions = (techs, direction) => {
     return techs.map((tech, i) => {
        const total = techs.length;
        const yOffset = total === 1 ? 0 : (i - (total - 1) / 2) * 50; 
        
        // Extended Veins: Reach deeply into the left/right empty space (200px base + staggering)
        // This makes the active network look vast and expansive without pushing the core layout.
        const xOffset = direction * (180 + Math.abs(yOffset) * 0.8 + (i % 2 === 0 ? 50 : 0));
        return { name: tech, x: xOffset, y: yOffset };
     });
  };

  const desktopNodes = [
     ...getPositions(leftTechs, -1),
     ...getPositions(rightTechs, 1)
  ];

  return (
    <div 
      className={`relative flex flex-col items-center w-full transition-all duration-700 z-10 ${!isActive && activeNode ? 'opacity-10 scale-95 blur-[2px]' : 'opacity-100 scale-100 blur-0'}`}
      onMouseEnter={() => !isMobile && setActiveNode(service.id)}
      onMouseLeave={() => !isMobile && setActiveNode(null)}
      onClick={() => isMobile && setActiveNode(isActive ? null : service.id)}
      style={{ zIndex: isActive ? 50 : 10 }}
    >
      {/* --------------------- */}
      {/* DESKTOP VEIN SYSTEM */}
      {/* --------------------- */}
      {!isMobile && (
        <div className="relative flex flex-col items-center justify-center w-full max-w-[1400px] mx-auto">
           {/* The Deep Radial Glow for the active element */}
           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full blur-[100px] z-[-1]"
             initial={{ width: 0, height: 0, opacity: 0 }}
             animate={{ 
               width: isActive ? 600 : 0, 
               height: isActive ? 400 : 0, 
               opacity: isActive ? 0.15 : 0 
             }}
             style={{ backgroundColor: service.color }}
             transition={{ duration: 1, ease: 'easeOut' }}
           />

           {/* Branching SVG Paths (Extended) */}
           <div className="absolute top-[40px] left-1/2 z-0 w-0 h-0 pointer-events-none overflow-visible">
              <svg className="overflow-visible absolute inset-0">
                 <AnimatePresence>
                     {isActive && desktopNodes.map((node, i) => {
                        const isLeft = node.x < 0;
                        const direction = isLeft ? -1 : 1;
                        const startX = direction * 35; 
                        const startY = 0;
                        const endX = node.x;
                        const endY = node.y;
                        
                        // Sweeping organic S-curve into the negative space
                        const cp1x = startX + direction * 60; 
                        const cp1y = startY + (endY * 0.2); 
                        const cp2x = endX - direction * 60; 
                        const cp2y = endY - (endY * 0.2);
                        
                        const d = `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${node.x},${node.y}`;
                        
                        return (
                           <g key={i}>
                              <motion.path
                                 d={d}
                                 fill="transparent"
                                 stroke={service.color}
                                 strokeWidth="1"
                                 initial={{ pathLength: 0, opacity: 0 }}
                                 animate={{ pathLength: 1, opacity: 0.3 }}
                                 exit={{ pathLength: 0, opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.04 }}
                              />
                              
                              {/* Energy Flow Animation */}
                              <motion.path
                                 d={d}
                                 fill="transparent"
                                 stroke="var(--text-main)"
                                 strokeWidth="2.5"
                                 strokeLinecap="round"
                                 pathLength="100"
                                 strokeDasharray="4 96" 
                                 initial={{ strokeDashoffset: 0, opacity: 0 }}
                                 animate={{ strokeDashoffset: -100, opacity: [0, 1, 1, 0] }}
                                 exit={{ opacity: 0 }}
                                 transition={{ duration: 1.5 + (i * 0.05), repeat: Infinity, ease: 'linear', delay: 0.4 }}
                                 style={{ filter: `drop-shadow(0 0 10px ${service.color})` }}
                              />
                           </g>
                        );
                     })}
                 </AnimatePresence>
              </svg>
           </div>

           {/* Pulse Node Core */}
           <motion.div 
             className="relative z-20 flex flex-col items-center justify-center cursor-pointer"
             animate={{ scale: isActive ? 1.25 : 1 }}
             transition={{ type: "spring", damping: 15 }}
           >
              <div 
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-surface-lowest/80 border backdrop-blur-2xl relative transition-all duration-500 overflow-hidden"
                style={{ 
                  boxShadow: isActive ? `0 0 40px ${service.color}50, inset 0 0 20px ${service.color}30` : `0 0 15px var(--glass-border)`,
                  borderColor: isActive ? `${service.color}80` : 'var(--glass-border)'
                }}
              >
                 <service.icon 
                   className="w-7 h-7 relative z-10 transition-colors duration-300" 
                   style={{ color: isActive ? 'var(--text-main)' : service.color, filter: isActive ? `drop-shadow(0 0 5px ${service.color})` : 'none' }} 
                 />
                 
                 <AnimatePresence>
                   {isActive && (
                     <motion.div 
                        className="absolute inset-0 rounded-full bg-white/10 mix-blend-overlay"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                     />
                   )}
                 </AnimatePresence>
                 <AnimatePresence>
                   {isActive && (
                     <motion.div 
                        className="absolute inset-0 rounded-full border border-white/30"
                        style={{ borderColor: service.color }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                     />
                   )}
                 </AnimatePresence>
              </div>

              {/* Service Title */}
              <div className="mt-4 text-center pointer-events-none">
                 <h3 
                   className="text-xs md:text-sm font-bold font-manrope tracking-widest uppercase transition-all duration-300"
                   style={{ 
                     textShadow: isActive ? `0 0 20px ${service.color}` : 'none',
                     color: 'var(--text-main)',
                     opacity: isActive ? 1 : 0.4
                   }}
                 >
                   {service.title}
                 </h3>
              </div>
           </motion.div>

           {/* Branch Tech Endpoints */}
           <AnimatePresence>
              {isActive && desktopNodes.map((node, i) => (
                 <motion.div
                    key={i}
                    className="absolute z-[60] pointer-events-auto"
                    style={{ left: '50%', top: '40px' }} // Origin locked to pulse node center
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
                    exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                    transition={{ type: "spring", damping: 16, stiffness: 100, delay: i * 0.04 }}
                 >
                    <motion.div 
                       animate={{ y: [-3, 3, -3] }} 
                       transition={{ repeat: Infinity, duration: 4 + (i % 2), ease: "easeInOut" }}
                       className="px-4 py-[6px] rounded-full backdrop-blur-xl bg-surface-lowest/90 border whitespace-nowrap -translate-x-1/2 -translate-y-1/2 hover:scale-110 hover:bg-white/10 transition-transform cursor-pointer"
                       style={{ 
                         borderColor: `${service.color}40`, 
                         boxShadow: `0 0 20px ${service.color}15`
                       }}
                    >
                       <span className="text-[11px] font-bold text-white/95 font-inter tracking-wider uppercase">{node.name}</span>
                    </motion.div>
                 </motion.div>
              ))}
           </AnimatePresence>
        </div>
      )}

      {/* --------------------- */}
      {/* MOBILE STACKED ACCORDION */}
      {/* --------------------- */}
      {isMobile && (
        <div 
           className="w-full glass-panel border bg-surface-lowest/40 rounded-3xl p-5 relative overflow-hidden transition-all duration-300"
           style={{ 
             boxShadow: isActive ? `0 0 20px ${service.color}20` : 'none',
             borderColor: isActive ? `${service.color}40` : 'var(--glass-border)'
           }}
        >
           <div className="flex items-center justify-between z-10 relative">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-[var(--glass-border)] flex items-center justify-center bg-surface-lowest relative overflow-hidden">
                    <service.icon className="w-4 h-4 text-[var(--text-main)] z-10" />
                  </div>
                  <h3 className="text-base font-bold font-manrope text-[var(--text-main)] tracking-wide" style={{ textShadow: isActive ? `0 0 10px ${service.color}50` : "none" }}>
                    {service.title}
                  </h3>
               </div>
               <motion.div animate={{ rotate: isActive ? 180 : 0 }}>
                  <ChevronDown className="w-5 h-5 text-surface-variant" />
               </motion.div>
           </div>
           
           <AnimatePresence>
             {isActive && (
               <motion.div 
                 initial={{ opacity: 0, height: 0, marginTop: 0 }}
                 animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                 exit={{ opacity: 0, height: 0, marginTop: 0 }}
                 className="flex flex-wrap gap-2 overflow-hidden"
               >
                 {service.tech.map((tech, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", damping: 20, delay: i * 0.03 }}
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-surface-low text-[10px] font-bold tracking-wide uppercase text-white/90"
                      style={{ boxShadow: `0 0 10px ${service.color}10` }}
                    >
                      {tech}
                    </motion.div>
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export const Services = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check(); 
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const hasActiveNode = activeNode !== null;

  return (
    <section 
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen py-32 px-6 relative w-full border-t border-outline-variant/30 overflow-hidden bg-surface-lowest flex flex-col justify-center"
    >
      
      {/* Background Interactive Environment */}
      <ParallaxBackground mouseX={mouseX} mouseY={mouseY} />

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-20 w-full"
        >
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-black font-manrope mb-4 text-white tracking-tight drop-shadow-lg">
            Core <span className="text-primary italic">Systems</span>
          </h2>
          <p className="text-surface-variant text-base md:text-lg leading-relaxed">
            Hover over a central system node below. Watch the precise tech stacks organically flow into the expansive ecosystem.
          </p>
        </motion.div>

        {/* Central Spine Interactive Layout */}
        <div className="relative w-full max-w-5xl flex flex-col items-center z-10">
           
           {!isMobile && (
              <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-white/5 rounded-full z-0 overflow-hidden pointer-events-none mix-blend-screen shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                 <motion.div 
                    className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-transparent via-primary to-transparent"
                    animate={{ top: ['-50%', '150%'] }}
                    transition={{ 
                      duration: hasActiveNode ? 1.0 : 3.5, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                    style={{ filter: 'drop-shadow(0 0 15px rgba(208,188,255,1))' }}
                 />
                 <motion.div 
                    className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-secondary to-transparent"
                    animate={{ top: ['-30%', '130%'] }}
                    transition={{ 
                      duration: hasActiveNode ? 0.7 : 2.5, 
                      repeat: Infinity, 
                      ease: 'linear', 
                      delay: hasActiveNode ? 0.4 : 1 
                    }}
                    style={{ filter: 'drop-shadow(0 0 10px rgba(204,194,220,1))' }}
                 />
              </div>
           )}

           {/* Vertical stack for nodes */}
           <div className="flex flex-col w-full gap-10 md:gap-10 lg:max-w-full z-10 relative mt-4">
              {services.map((service, index) => (
                 <VeinNode 
                    key={service.id} 
                    service={service} 
                    index={index} 
                    isActive={activeNode === service.id}
                    activeNode={activeNode}
                    setActiveNode={setActiveNode}
                    isMobile={isMobile}
                 />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
