import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MagneticButton = ({ children, className = '', onClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(button, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.3); // Magnetic pull strength
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-surface-lowest font-manrope font-bold overflow-hidden group ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-[#ffffff]/20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
      <span className="relative z-10">{children}</span>
    </button>
  );
};
