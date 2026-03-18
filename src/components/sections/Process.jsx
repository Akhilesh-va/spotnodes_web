import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'Discover', desc: 'Understanding requirements, goals, and technical constraints.' },
  { num: '02', title: 'Plan', desc: 'Architecture design, tech stack selection, and milestone mapping.' },
  { num: '03', title: 'Build', desc: 'Agile development with clean, scalable, and documented code.' },
  { num: '04', title: 'Test', desc: 'Rigorous QA, performance profiling, and security auditing.' },
  { num: '05', title: 'Deliver', desc: 'Deployment to production and robust post-launch support.' }
];

export const Process = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Draw line animation
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1
        }
      });

      // Animate steps
      gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
        
        // Dot highlight
        const dot = step.querySelector('.process-dot');
        gsap.to(dot, {
          backgroundColor: '#4cd7f6',
          boxShadow: '0 0 20px 5px rgba(76, 215, 246, 0.4)',
          borderColor: '#4cd7f6',
          scrollTrigger: {
            trigger: step,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 relative w-full overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black font-manrope mb-4">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-surface-variant">A proven methodology from concept to deployment.</p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Background Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-surface-high" />
          
          {/* Animated Draw Line */}
          <div ref={lineRef} className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] h-0 bg-gradient-to-b from-primary to-secondary z-0" />

          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {STEPS.map((step, i) => (
              <div 
                key={i} 
                className={`process-step flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Left Desktop */}
                <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'} opacity-0`}>
                  {i % 2 !== 0 && (
                    <div className="glass-panel p-8 rounded-2xl group hover:border-white/20 transition-colors">
                      <span className="text-5xl font-black text-white/5 group-hover:text-primary/10 transition-colors absolute top-4 right-4">{step.num}</span>
                      <h3 className="text-2xl font-bold font-manrope text-white mb-2">{step.title}</h3>
                      <p className="text-surface-variant font-inter leading-relaxed">{step.desc}</p>
                    </div>
                  )}
                </div>

                {/* Center Node */}
                <div className="relative flex items-center justify-center -ml-[3px] md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="process-dot w-6 h-6 rounded-full bg-surface-lowest border-2 border-surface-high relative z-20 transition-colors duration-300" />
                  <div className="md:hidden absolute w-px h-full bg-transparent" />
                </div>

                {/* Content Right Desktop / Mobile Main Content */}
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                   {i % 2 === 0 || window.innerWidth < 768 ? (
                     <div className="glass-panel p-6 md:p-8 rounded-2xl group hover:border-white/20 transition-colors relative h-full">
                       <span className="text-5xl font-black text-white/5 group-hover:text-primary/10 transition-colors absolute top-4 right-4">{step.num}</span>
                       <h3 className="text-xl md:text-2xl font-bold font-manrope text-white mb-2 relative z-10">{step.title}</h3>
                       <p className="text-surface-variant text-sm md:text-base font-inter leading-relaxed relative z-10">{step.desc}</p>
                     </div>
                   ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
