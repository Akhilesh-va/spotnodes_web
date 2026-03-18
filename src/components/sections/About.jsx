import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

export const About = () => {
  const [activeMember, setActiveMember] = useState('default');

  return (
    <>
      <section id="about" className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 relative border-t border-outline-variant/30 overflow-hidden">
        
        {/* Background glow for the central section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[50vh] bg-surface-lowest rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center w-full"
          >
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-black font-manrope mb-4 text-white">
              Meet the <span className="text-secondary italic">Core Team</span>
            </h2>
            <p className="text-surface-variant text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              A tight-knit unit of engineers focused on high-performance logic, clean architecture, and flawless precision.
            </p>
          </motion.div>

          {/* Top Side: Shared Interactive Image Container (SQUARE) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] mx-auto rounded-2xl md:rounded-[2rem] overflow-hidden glass-panel border border-primary/20 bg-surface-low/30 shadow-[0_0_40px_rgba(208,188,255,0.15)] relative shrink-0"
            // Floating effect combined with entrance animation
            animate={{ y: [-5, 5, -5] }}
            transition={{ 
                duration: 0.8,
                delay: 0.2, // entrance delay (stagger after header)
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" } // float config
            }}
          >
             <AnimatePresence>
               {/* Default State: Animated "?" */}
               {activeMember === 'default' && (
                 <motion.div
                   key="default"
                   initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                   animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                   exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                   transition={{ duration: 0.5, type: 'spring' }}
                   className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                 >
                   <motion.div 
                     animate={{ 
                       scale: [0.95, 1.05, 0.95],
                       textShadow: [
                         "0px 0px 40px rgba(208, 188, 255, 0.2)",
                         "0px 0px 80px rgba(208, 188, 255, 0.6)",
                         "0px 0px 40px rgba(208, 188, 255, 0.2)"
                       ]
                     }}
                     transition={{
                       repeat: Infinity,
                       duration: 4,
                       ease: "easeInOut"
                     }}
                     className="text-7xl md:text-8xl font-black font-manrope text-surface-variant/40 leading-none mb-3"
                   >
                     ?
                   </motion.div>
                   <motion.p 
                     animate={{ opacity: [0.3, 0.8, 0.3] }}
                     transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                     className="text-surface-variant uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold"
                   >
                     Who are we?
                   </motion.p>
                 </motion.div>
               )}

               {/* Hover State: Akhilesh */}
               {activeMember === 'akhilesh' && (
                 <motion.img
                   key="akhilesh"
                   src="/akhilesh.png"
                   alt="Akhilesh Singh Maurya"
                   className="absolute inset-0 w-full h-full object-cover object-center"
                   initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                   animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                   exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95, transition: { duration: 0.4 } }}
                   transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} 
                   whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
                 />
               )}

               {/* Hover State: Hadi */}
               {activeMember === 'hadi' && (
                 <motion.img
                   key="hadi"
                   src="/hadi.jpeg"
                   alt="Mohd Hadi"
                   className="absolute inset-0 w-full h-full object-cover object-center"
                   initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                   animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                   exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95, transition: { duration: 0.4 } }}
                   transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                   whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
                 />
               )}
             </AnimatePresence>

             {/* Overlay gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/80 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
             <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-[2rem] pointer-events-none z-10" />
          </motion.div>

          {/* Bottom Side: Team Member Cards */}
          <div className="w-full grid md:grid-cols-2 gap-4 lg:gap-6 shrink-0 mt-2">
            
            {/* Akhilesh Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-panel p-5 md:p-6 rounded-3xl relative group border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
              onMouseEnter={() => setActiveMember('akhilesh')}
              onMouseLeave={() => setActiveMember('default')}
            >
              <div className="absolute top-0 right-6 w-12 h-1 bg-primary rounded-b-full scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out opacity-50" />
              
              <div>
                 <h3 className="text-xl md:text-2xl font-bold font-manrope text-white mb-1 transition-colors duration-300 group-hover:text-primary">
                    Akhilesh Singh Maurya
                 </h3>
                 <p className="text-secondary-fixed text-xs font-inter font-medium tracking-wide mb-3">
                    Android Engineer
                 </p>
                 
                 {/* 2-Line About */}
                 <div className="mb-4">
                    <p className="text-surface-variant text-xs md:text-sm leading-relaxed line-clamp-2">
                       Builds robust Android applications engineered for performance and scalability. Highly reliable solo developer who pushes stable apps to the Play Store.
                    </p>
                 </div>
              </div>

              <div>
                 <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-white/10">
                    <div>
                       <span className="text-[9px] uppercase tracking-widest block mb-1 font-bold text-surface-variant">Experience</span>
                       <span className="text-lg font-bold font-manrope text-white">1 Year</span>
                    </div>
                    <div>
                       <span className="text-[9px] uppercase tracking-widest block mb-1 font-bold text-surface-variant">Highlights</span>
                       <span className="text-xs font-medium text-white/80 line-clamp-2 leading-tight">2 production apps on Play Store</span>
                    </div>
                 </div>

                 <a href="/Akhilesh_Singh_Maurya.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-xs font-semibold group/btn hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl">
                    <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-1 transition-transform" />
                    Resume
                 </a>
              </div>
            </motion.div>

            {/* Hadi Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-panel p-5 md:p-6 rounded-3xl relative group border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
              onMouseEnter={() => setActiveMember('hadi')}
              onMouseLeave={() => setActiveMember('default')}
            >
              <div className="absolute top-0 right-6 w-12 h-1 bg-primary rounded-b-full scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out opacity-50" />
              
              <div>
                 <h3 className="text-xl md:text-2xl font-bold font-manrope text-white mb-1 transition-colors duration-300 group-hover:text-primary">
                    Mohd Hadi
                 </h3>
                 <p className="text-secondary-fixed text-xs font-inter font-medium tracking-wide mb-3">
                    Web & Cross-platform
                 </p>
                 
                 {/* 2-Line About */}
                 <div className="mb-4">
                    <p className="text-surface-variant text-xs md:text-sm leading-relaxed line-clamp-2">
                       Crafts modern, lightning-fast web and cross-platform applications. Solo developer executing flawless deployments with clean, scalable technical systems.
                    </p>
                 </div>
              </div>

              <div>
                 <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-white/10">
                    <div>
                       <span className="text-[9px] uppercase tracking-widest block mb-1 font-bold text-surface-variant">Experience</span>
                       <span className="text-lg font-bold font-manrope text-white">2 Years</span>
                    </div>
                    <div>
                       <span className="text-[9px] uppercase tracking-widest block mb-1 font-bold text-surface-variant">Highlights</span>
                       <span className="text-xs font-medium text-white/80 line-clamp-2 leading-tight">Deployed multiple web applications</span>
                    </div>
                 </div>

                 <a href="/hadi%20resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-xs font-semibold group/btn hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl">
                    <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-1 transition-transform" />
                    Resume
                 </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Engineering Philosophy Block stays below outside 100vh height */}
      <section className="py-24 px-6 w-full relative -mt-10 overflow-hidden">
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1 }}
           className="max-w-4xl mx-auto glass-panel p-8 md:p-14 rounded-[2.5rem] relative text-center group border border-white/5 hover:border-white/10 transition-colors duration-500 z-10"
         >
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           
           <h3 className="text-lg md:text-xl uppercase tracking-widest text-surface-variant font-bold mb-6 relative z-10">
             Our Engineering Philosophy
           </h3>
           
           <p className="text-2xl md:text-4xl font-manrope font-bold text-white mb-10 leading-tight relative z-10">
             We are not just developers — <br className="hidden md:block"/>
             <span className="text-gradient">we are engineers who build complete products.</span>
           </p>

           <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-left relative z-10 max-w-3xl mx-auto mb-10">
             <div className="flex items-start gap-4 p-5 bg-surface-lowest/50 rounded-2xl border border-white/5 hover:bg-surface-lowest/80 transition-colors">
                 <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                <p className="text-surface-variant text-sm leading-relaxed">
                  Worked as <strong className="text-white">single developers in startups</strong>, managing the full stack from logic down to deployment.
                </p>
             </div>
             <div className="flex items-start gap-4 p-5 bg-surface-lowest/50 rounded-2xl border border-white/5 hover:bg-surface-lowest/80 transition-colors">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0 animate-pulse" />
                <p className="text-surface-variant text-sm leading-relaxed">
                  Owned full product lifecycle, building under real constraints and deadlines.
                </p>
             </div>
             <div className="flex items-start gap-4 p-5 bg-surface-lowest/50 rounded-2xl border border-white/5 hover:bg-surface-lowest/80 transition-colors md:col-span-2">
                <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                <p className="text-surface-variant text-sm leading-relaxed max-w-lg">
                  Relentlessly focused on scalability, performance, and usability for environments where speed matters.
                </p>
             </div>
           </div>

           <p className="text-lg md:text-xl font-medium font-inter text-surface-variant relative z-10">
             We don’t just write code — <br/>
             <strong className="text-primary italic mt-2 inline-block">we engineer solutions that work in the real world.</strong>
           </p>
         </motion.div>
      </section>
    </>
  );
};
