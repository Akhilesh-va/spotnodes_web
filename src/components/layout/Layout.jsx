import React, { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { CustomCursor } from '../ui/CustomCursor';

export const Layout = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="relative min-h-screen w-full bg-surface-lowest flex flex-col selection:bg-primary-container/30">
        <CustomCursor />
        {children}
      </div>
    </ReactLenis>
  );
};
