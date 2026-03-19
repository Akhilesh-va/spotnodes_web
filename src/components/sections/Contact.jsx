import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../ui/MagneticButton';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const containerRef = useRef(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.contact-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (status === 'error') setStatus('idle'); // Clear error state on new input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Strict Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill out all fields.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error('Missing VITE_GOOGLE_APPS_SCRIPT_URL. Add it to your .env and restart the dev server.');
      }

      const payload = new URLSearchParams();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("message", formData.message);

      const res = await fetch(scriptUrl, {
        method: 'POST',
        // Google Apps Script Web Apps don't reliably support CORS for fetch().
        // Use fire-and-forget submission; validate success via the Sheet.
        mode: 'no-cors',
        body: payload,
      });

      // With no-cors the response is opaque; if fetch didn't throw, we assume submission reached the endpoint.
      void res;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Automatically reset success visual state after completion to allow another payload
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
      setErrorMsg(error?.message || 'Failed to send. Try again.');
    }
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 px-6 relative w-full overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="contact-element inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant bg-surface-low/50 backdrop-blur-md mb-8">
          <Mail className="w-4 h-4 text-secondary" />
          <span className="text-secondary-fixed text-sm font-inter tracking-wider uppercase">Get In Touch</span>
        </div>

        <h2 className="contact-element text-5xl md:text-7xl font-black font-manrope mb-8">
          Let’s Build Something <br/><span className="text-gradient">Great Together</span>
        </h2>
        
        <p className="contact-element text-surface-variant max-w-2xl mx-auto text-lg mb-16">
          Whether you're looking to build a new product or scale an existing platform, our team is ready to deliver engineering excellence.
        </p>

        <motion.form 
           className="contact-element max-w-2xl mx-auto text-left relative" 
           onSubmit={handleSubmit}
           animate={{ opacity: status === 'loading' ? 0.6 : 1, y: status === 'success' ? -10 : 0 }}
           transition={{ duration: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="group relative">
              <input 
                type="text" 
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-surface-low border border-white/10 rounded-xl px-5 py-4 text-white font-inter focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 peer transition-all duration-300 disabled:opacity-50"
                placeholder=" "
              />
              <label htmlFor="name" className="absolute left-5 top-4 text-surface-variant text-sm transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondary peer-focus:bg-surface-lowest peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-surface-lowest peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
                Your Name
              </label>
            </div>
            
            <div className="group relative">
              <input 
                type="email" 
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-surface-low border border-white/10 rounded-xl px-5 py-4 text-white font-inter focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 peer transition-all duration-300 disabled:opacity-50"
                placeholder=" "
              />
              <label htmlFor="email" className="absolute left-5 top-4 text-surface-variant text-sm transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondary peer-focus:bg-surface-lowest peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-surface-lowest peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
                Email Address
              </label>
            </div>
          </div>
          
          <div className="group relative mb-8">
            <textarea 
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full bg-surface-low border border-white/10 rounded-xl px-5 py-4 text-white font-inter focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 peer transition-all duration-300 resize-none disabled:opacity-50"
              placeholder=" "
            ></textarea>
            <label htmlFor="message" className="absolute left-5 top-4 text-surface-variant text-sm transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondary peer-focus:bg-surface-lowest peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-surface-lowest peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
              Project Details
            </label>
          </div>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 flex items-center justify-center gap-2 text-error text-sm font-semibold p-3 rounded-lg bg-error/10 border border-error/20"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center w-full relative">
            <motion.div
              whileTap={status !== 'loading' ? { scale: 0.95 } : {}}
              className="w-full relative group"
            >
               <MagneticButton
                 type="submit"
                 disabled={status === 'loading'}
                 className="w-full md:w-auto px-12 py-5 text-lg group bg-secondary text-on-secondary rounded-xl font-bold tracking-wide shadow-lg border-0 transition-all duration-500 overflow-hidden min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed"
                 style={{
                   backgroundColor: status === 'success' ? '#22c55e' : '',
                   boxShadow: status === 'success' ? '0 0 30px rgba(34,197,94,0.4)' : ''
                 }}
               >
                 <motion.div 
                   className="absolute inset-0 bg-[#ffffff]/20"
                   initial={{ x: '-100%' }}
                   animate={{ x: status === 'loading' ? '100%' : '-100%' }}
                   transition={{ repeat: status === 'loading' ? Infinity : 0, duration: 1, ease: 'linear' }}
                 />
                 
                 <div className="flex items-center justify-center gap-3 relative z-10 w-full h-full">
                   {status === 'idle' || status === 'error' ? (
                     <>
                       Send Message
                       <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </>
                   ) : status === 'loading' ? (
                     <>
                       Sending...
                       <Loader2 className="w-5 h-5 animate-spin" />
                     </>
                   ) : (
                     <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2 text-[#ffffff] font-bold"
                     >
                       Message Sent ✅
                     </motion.div>
                   )}
                 </div>
               </MagneticButton>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
