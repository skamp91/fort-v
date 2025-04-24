'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import Navbar from '@/components/navbar';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Verzögere das Rendering des Inhalts, bis die Hydration abgeschlossen ist
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Stelle sicher, dass wir während der Hydration einen konsistenten Zustand haben
  if (!mounted) {
    return (
      <>
        <Navbar />
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </>
    );
  }

  return (
    <NextThemesProvider {...props}>
      <Navbar />
      {children}
    </NextThemesProvider>
  );
}
