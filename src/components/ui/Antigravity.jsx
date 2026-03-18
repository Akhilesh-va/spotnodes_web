import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Antigravity = ({ children, className = '', delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Randomize slightly the duration and y amount for true anti-gravity feel
    const randomY = 10 + Math.random() * 15;
    const randomDuration = 3 + Math.random() * 2;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: `-=${randomY}`,
        duration: randomDuration,
        delay: delay,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};
