import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, User, Github, Smartphone } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

import zoooxImg from '../../assets/zooox.png';
import booktranspoImg from '../../assets/booktranspo.png';
import linkpadImg from '../../assets/Linkpad.png';
import umrahchaloImg from '../../assets/umrahchalo.png';

const PROJECTS = [
  {
    id: 'zooox',
    title: 'ZOOOX',
    type: 'Full Product',
    tech: ['React Native', 'TypeScript', 'GraphQL'],
    desc: 'Production-grade cashback and analytics platform built with scalable architecture and real-time data systems.',
    fullDesc: 'ZOOOX is a powerful production-scale cashback and analytics platform. Built leveraging a robust React Native and TypeScript mobile frontend communicating seamlessly with a strongly optimized GraphQL backend. It features innovative Gmail integration for automated receipt parsing and data extraction to provide users with instantaneous real-time spend tracking and analytics.',
    features: ['React Native mobile architecture', 'GraphQL-powered optimized backend', 'Automated Gmail data extraction', 'Real-time analytics engine'],
    image: zoooxImg, 
    color: '#d0bcff', // primary
    links: [
      { text: 'Mobile App', url: 'https://play.google.com/store/apps/details?id=xyz.zooox&hl=en_IN' },
      { text: 'Web Platform', url: 'https://zooox.xyz/' }
    ]
  },
  {
    id: 'booktranspo',
    title: 'Book Transpo',
    type: 'Android System',
    tech: ['Android', 'AI', 'Google Maps'],
    desc: 'A logistics and ride-booking platform with real-time features and AI-powered voice interactions.',
    fullDesc: 'Book Transpo is an advanced logistics and ride-booking platform engineered to handle complex routing with absolute reliability. It deeply integrates Google Maps for high-frequency geolocation and routing logic. An embedded AI voice-based booking system allows seamless accessibility. The entire backend is highly secured with scalable APIs processing real-time data transport.',
    features: ['AI voice-based booking system', 'Google Maps geolocation routing', 'Highly scalable secured backend APIs', 'Real-time transport optimization'],
    image: booktranspoImg,
    color: '#4fd8eb', // cyan
    links: [
      { text: 'Play Store App', url: 'https://play.google.com/store/apps/details?id=com.booktranspo.users&pcampaignid=web_share' }
    ]
  },
  {
    id: 'linkpad',
    title: 'LinkPad',
    type: 'Web Tool',
    tech: ['Web', 'UI/UX', 'Performance'],
    desc: 'A super fast and minimal link management tool built purely for productivity and quick access.',
    fullDesc: 'LinkPad strips away unnecessary bloat to offer an incredibly fast and lightweight link management solution. Engineered directly for productivity, it features a hyper-minimalist, clean UI allowing users to effortlessly organize and instantly access their critical URLs without friction.',
    features: ['Hyper-fast lightweight architecture', 'Clean minimalist UI', 'Instant link organization data flow'],
    image: linkpadImg,
    color: '#ccc2dc', // secondary
    links: [
      { text: 'Live Tool', url: 'https://akhilesh-va.github.io/LinkPad/' }
    ]
  },
  {
    id: 'umrahchalo',
    title: 'Umrah Chalo',
    type: 'Production Web',
    tech: ['React.js', 'MongoDB', 'WebSockets'],
    desc: 'A real-world deployed platform strictly designed for usability, performance, and heavy business needs.',
    fullDesc: 'Umrah Chalo is a robust production-ready platform built to serve actual business environments and heavy user traffic. The codebase strictly prioritizes flawless responsive design scaling seamlessly from mobile to desktop. Every interaction focuses on intuitive user experience and high-speed payload delivery.',
    features: ['Fully responsive viewport scaling', 'Optimized for high business conversion', 'Production deployment stability'],
    image: umrahchaloImg,
    color: '#e8b4b8', // warm
    links: [
      { text: 'Live Website', url: 'https://www.umrachalo.com/' }
    ]
  }
];

const SECONDARY_PROJECTS = [
  {
    title: 'BidCraft Agent',
    desc: 'AI-powered RFP responder built for intelligent document workflows and generation.',
    tech: ['React Native', 'Firebase', 'AI', 'PDF Ingestion'],
    links: [
      { type: 'App', url: 'https://drive.google.com/drive/folders/1EV98jy2Hsh90v3Z3aENWw1hMH0LxbJyf' },
      { type: 'GitHub', url: 'https://github.com/Akhilesh-va/BidCraft-Agent-App' }
    ]
  },
  {
    title: 'MockInMinutes',
    desc: 'AI interview assistant delivering real-time voice-based mock interactions.',
    tech: ['React Native', 'AI Engine', 'Voice Sync'],
    links: [
      { type: 'App', url: 'https://drive.google.com/drive/folders/1EV98jy2Hsh90v3Z3aENWw1hMH0LxbJyf' }
    ]
  },
  {
    title: 'Your Bag Buddy AI',
    desc: 'Smart travel checklist app generating highly optimized manifests via AI.',
    tech: ['Kotlin', 'Jetpack Compose', 'Smart AI'],
    links: [
      { type: 'GitHub', url: 'https://github.com/Akhilesh-va/YourBagBuddyAI' }
    ]
  },
  {
    title: 'Arena (Gaming App)',
    desc: 'A community-driven Android architecture handling live real-time gamer messaging.',
    tech: ['Firebase Sync', 'Real-time scalable structure'],
    links: [
      { type: 'GitHub', url: 'https://github.com/Akhilesh-va/Arena-' }
    ]
  }
];

const PORTFOLIOS = [
  { 
     name: 'Akhilesh Singh Maurya', 
     role: 'Android Engineer', 
     url: 'https://akhileshdev.me',
     image: '/akhilesh.png'
  },
  { 
     name: 'Mohd Hadi', 
     role: 'Web Platform Engineer', 
     url: 'https://mohdhadi.online',
     image: '/hadi.jpeg' 
  }
];

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-8px", "8px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-8px", "8px"]);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-container-${project.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-[320px] cursor-pointer group z-10 perspective-1000"
    >
      <motion.div 
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-surface-lowest/70 border backdrop-blur-md transition-colors duration-500"
        style={{
          boxShadow: isHovered ? `0 20px 50px -15px ${project.color}40` : '0 10px 30px rgba(0,0,0,0.5)',
          borderColor: isHovered ? `${project.color}50` : 'rgba(255,255,255,0.05)'
        }}
        animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
           <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20"
              style={{ background: `conic-gradient(from 0deg, transparent, ${project.color}, transparent)` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
           />
        </div>

        <div className="absolute inset-[1px] bg-surface-lowest/90 rounded-[2.5rem] z-0" />

        <motion.div 
           layoutId={`image-${project.id}`}
           className="absolute top-0 right-0 left-0 h-[55%] w-full bg-cover mb-4 bg-center overflow-hidden z-0"
           style={{ backgroundImage: `url(${project.image})`, transformOrigin: "center" }}
           animate={{ scale: isHovered ? 1.1 : 1.01 }}
           transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
           <motion.div 
             className="absolute inset-0 mix-blend-overlay pointer-events-none"
             style={{ backgroundColor: project.color }}
             initial={{ opacity: 0 }}
             animate={{ opacity: isHovered ? 0.3 : 0 }}
             transition={{ duration: 0.5 }}
           />
           <div className="absolute top-1/2 bottom-0 left-0 right-0 bg-gradient-to-t from-surface-lowest to-transparent pointer-events-none z-10" />
        </motion.div>

        <motion.div 
           className="absolute bottom-0 left-0 w-full h-[55%] px-7 pb-8 pt-4 flex flex-col justify-end z-20 pointer-events-none"
           style={{ x: translateX, y: translateY, transformStyle: "preserve-3d" }}
        >
           <div className="flex flex-wrap gap-2 mb-3 items-center min-h-[28px]">
              <span className="px-3 py-1 bg-primary/20 border border-primary/20 text-primary text-[10px] uppercase tracking-wider font-bold rounded-full backdrop-blur-md shadow-lg pointer-events-none">
                 {project.type}
              </span>
              
              {project.tech.slice(0, 3).map((tech, idx) => (
                 <motion.span 
                    key={tech} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    transition={{ delay: isHovered ? idx * 0.08 : 0, duration: 0.3, type: "spring", stiffness: 200 }}
                    className="px-3 py-1 bg-white/10 border border-white/10 text-white/90 text-[10px] uppercase tracking-wider font-semibold rounded-full backdrop-blur-md pointer-events-none"
                 >
                    {tech}
                 </motion.span>
              ))}
           </div>

           <motion.h3 
              layoutId={`title-${project.id}`}
              className="text-xl md:text-[22px] font-black font-manrope text-white mb-2 tracking-wide origin-left"
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.4 }}
           >
              {project.title}
           </motion.h3>

           <p className="text-surface-variant text-sm line-clamp-1 font-inter pr-16 leading-relaxed transition-opacity">
              {project.desc}
           </p>
        </motion.div>
        
        <motion.div 
           className="absolute bottom-6 right-6 z-30 pointer-events-none drop-shadow-2xl"
           animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.6,
              x: isHovered ? translateX.get() * 2 : 10,
              y: isHovered ? translateY.get() * 2 : 10
           }}
           transition={{ type: "spring", damping: 15, stiffness: 200 }}
        >
           <div 
             className="w-12 h-12 rounded-full flex items-center justify-center text-surface-lowest bg-white transition-colors border border-white"
             style={{ boxShadow: isHovered ? `0 0 30px ${project.color}70` : 'none' }}
           >
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
           </div>
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedProject]);

  return (
    <section id="projects" className="min-h-screen py-32 px-6 w-full bg-surface-lowest relative flex flex-col justify-center border-t border-outline-variant/30 overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-surface-lowest to-surface-lowest" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12">
        
        {/* Header Intro */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex flex-col mb-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-manrope mb-6 text-white drop-shadow-md">
            Shipped <span className="text-secondary italic">Products</span>
          </h2>
          <p className="text-surface-variant text-lg max-w-3xl leading-relaxed">
            A highly curated showcase of real-world systems engineered for speed, scalability, and performance. 
            We build platforms intended to survive actual business environments and heavy user traffic.
          </p>
        </motion.div>

        {/* 1. Featured Core Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-1000 relative">
          {PROJECTS.map((project, i) => (
            <ProjectCard 
               key={project.id} 
               project={project} 
               index={i} 
               onClick={setSelectedProject} 
            />
          ))}
        </div>

        {/* 2. Directory: Personal Portfolios & View All */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="w-full mt-10 md:mt-20 pt-16 border-t border-white/5 flex flex-col lg:flex-row gap-16 lg:gap-24"
        >
           
           {/* Portfolios Column */}
           <div className="lg:w-1/3">
             <h3 className="text-2xl font-black font-manrope text-white mb-8 tracking-wide">
                Personal <span className="text-primary italic">Portfolios</span>
             </h3>
             <div className="flex flex-col gap-4">
                {PORTFOLIOS.map((person, i) => (
                   <a 
                     key={i} 
                     href={person.url} 
                     target="_blank" 
                     rel="noreferrer"
                     className="glass-panel p-5 rounded-[1.5rem] border border-white/5 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.03] hover:shadow-[0_15px_40px_-10px_rgba(208,188,255,0.15)] transition-all duration-300 group flex items-center justify-between cursor-pointer overflow-hidden relative"
                   >
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `linear-gradient(to right, #d0bcff, transparent)` }} />
                     
                     <div className="flex items-center gap-4 relative z-10 w-full">
                        <div className="w-[52px] h-[52px] shrink-0 rounded-full overflow-hidden border border-white/15 group-hover:border-primary/60 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all duration-500 flex items-center justify-center bg-surface-lowest">
                           <img src={person.image} alt={person.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                           <User className="hidden w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 pr-6">
                          <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-primary transition-colors">{person.name}</h4>
                          <p className="text-[10px] text-surface-variant uppercase tracking-widest font-bold mt-1 opacity-70">{person.role}</p>
                        </div>
                     </div>
                     <ArrowUpRight className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 z-10 text-surface-variant group-hover:text-primary group-hover:rotate-12 transition-all duration-300" />
                   </a>
                ))}
             </div>
           </div>

           {/* More Projects Directory Column */}
           <div className="lg:w-2/3">
             <h3 className="text-2xl font-black font-manrope text-white mb-8 tracking-wide">
                Broader <span className="text-secondary italic">Explorations</span>
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SECONDARY_PROJECTS.map((proj, i) => (
                   <div key={i} className="glass-panel p-6 rounded-[1.5rem] border border-white/5 hover:border-white/15 hover:bg-white/[0.02] flex flex-col justify-between relative overflow-hidden group transition-all duration-500">
                      
                      <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                         <div className="flex items-start justify-between mb-2">
                           <h4 className="text-white font-bold text-lg group-hover:text-white transition-colors">{proj.title}</h4>
                         </div>
                         <p className="text-surface-variant text-sm font-inter line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed tracking-wide transition-opacity duration-300 group-hover:opacity-70">
                           {proj.desc}
                         </p>
                      </div>
                      
                      {/* Tech Tags - fade out and shift down slightly on hover */}
                      <div className="flex flex-wrap gap-2 mt-auto relative z-10 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2 pointer-events-auto group-hover:pointer-events-none">
                         {proj.tech.map((t, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-full border border-white/10 bg-surface-highest text-[9px] uppercase tracking-wider font-bold text-white/50">
                               {t}
                            </span>
                         ))}
                      </div>

                      {/* Hover Action Links overlay! Replaces tags perfectly */}
                      <div className="absolute bottom-6 left-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 ease-out z-20 pointer-events-none group-hover:pointer-events-auto">
                         {proj.links && proj.links.map((link, ldx) => (
                            <a key={ldx} href={link.url} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-surface-lowest hover:bg-white/10 hover:border-white/30 text-[10px] uppercase tracking-widest font-bold text-white transition-all shadow-xl backdrop-blur-md hover:-translate-y-0.5" onClick={(e) => e.stopPropagation()}>
                               {link.type === 'GitHub' && <Github className="w-3.5 h-3.5" />}
                               {link.type === 'App' && <Smartphone className="w-3.5 h-3.5" />}
                               {link.type === 'Live' && <ExternalLink className="w-3.5 h-3.5" />}
                               {link.type}
                            </a>
                         ))}
                      </div>

                   </div>
                ))}
             </div>
           </div>

        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden"
          >
             <motion.div 
                className="absolute inset-0 bg-surface-lowest/70 backdrop-blur-2xl" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(null)}
             />
             
             <motion.div 
                layoutId={`card-container-${selectedProject.id}`}
                className="relative w-full max-w-6xl h-[90vh] md:h-[700px] bg-surface-lowest border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
             >
                <motion.button 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface-highest/80 border border-white/10 flex items-center justify-center text-white z-50 hover:bg-white/20 hover:scale-105 transition-all shadow-xl backdrop-blur-md"
                  onClick={() => setSelectedProject(null)}
                >
                   <X className="w-6 h-6" />
                </motion.button>
                
                {/* Modal Visual Cover Pane */}
                <div className="w-full md:w-1/2 h-[35%] md:h-full relative overflow-hidden bg-surface-highest">
                   <motion.div 
                      layoutId={`image-${selectedProject.id}`}
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${selectedProject.image})` }} 
                   />
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface-lowest hidden md:block" />
                   <div className="absolute inset-0 bg-gradient-to-t from-transparent to-surface-lowest md:hidden" />
                   
                   <div 
                      className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-40 transition-colors" 
                      style={{ backgroundColor: selectedProject.color }}
                   />
                </div>
                
                {/* Modal Data Details Pane with Anchored Links */}
                <div className="w-full md:w-1/2 h-[65%] md:h-full flex flex-col bg-surface-lowest relative">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none mix-blend-screen opacity-[0.04]"
                        style={{ background: `radial-gradient(circle at top right, ${selectedProject.color}, transparent 70%)` }}
                   />

                   {/* Scrollable Center Content */}
                   <div className="p-8 md:p-14 flex-1 overflow-y-auto custom-scrollbar z-10">
                      <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.1, duration: 0.4 }}
                         className="flex flex-wrap gap-2 mb-8 items-center"
                      >
                         <span className="px-4 py-1.5 bg-primary/20 border border-primary/20 text-primary text-[11px] uppercase tracking-wider font-bold rounded-full">{selectedProject.type}</span>
                         {selectedProject.tech.map(tech => (
                           <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 text-[10px] uppercase font-semibold rounded-full tracking-widest">
                              {tech}
                           </span>
                         ))}
                      </motion.div>

                      <motion.h3 
                         layoutId={`title-${selectedProject.id}`}
                         className="text-4xl md:text-5xl font-black font-manrope text-white mb-8 leading-[1.1] tracking-wide"
                      >
                         {selectedProject.title}
                      </motion.h3>
                      
                      <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.2, duration: 0.5 }}
                      >
                         <h4 className="text-white/50 font-bold mb-3 uppercase tracking-[0.2em] text-[10px]">Architectural Overview</h4>
                         <p className="text-surface-variant text-base md:text-lg leading-relaxed mb-10 font-inter">
                            {selectedProject.fullDesc}
                         </p>
                         
                         <h4 className="text-white/50 font-bold mb-4 uppercase tracking-[0.2em] text-[10px]">Core Integrated Features</h4>
                         <ul className="space-y-4 mb-4 grid grid-cols-1 md:grid-cols-1 gap-x-6">
                            {selectedProject.features.map(feat => (
                               <li key={feat} className="flex items-start gap-4 text-white/90 font-medium text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-[0_0_10px_rgba(208,188,255,0.8)]" style={{ backgroundColor: selectedProject.color }} />
                                  {feat}
                               </li>
                            ))}
                         </ul>
                      </motion.div>
                   </div>
                   
                   {/* Permanently Visible Action Footer */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3, duration: 0.5 }}
                     className="p-8 pt-4 md:p-14 md:pt-6 border-t border-white/5 bg-surface-lowest shrink-0 z-20 flex flex-col sm:flex-row gap-4"
                   >
                      {selectedProject.links && selectedProject.links.map((link, i) => (
                         <a key={i} href={link.url} target="_blank" rel="noreferrer" className="w-full sm:w-min" style={{ display: 'block' }}>
                            <MagneticButton className="w-full sm:w-auto px-8 py-5 flex items-center justify-center gap-3 text-sm tracking-wide font-bold hover:bg-white/10 bg-white/5 border border-white/20 transition-colors rounded-2xl relative overflow-hidden group">
                               <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: `linear-gradient(to right, ${selectedProject.color}, ${selectedProject.color}40)` }} />
                               <span className="relative z-10 text-white whitespace-nowrap pointer-events-none">{link.text}</span>
                               <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform pointer-events-none" />
                            </MagneticButton>
                         </a>
                      ))}
                   </motion.div>

                </div>
             </motion.div>
             
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
