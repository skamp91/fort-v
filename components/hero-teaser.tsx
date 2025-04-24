'use client';

import type React from 'react';

import type { ReactNode } from 'react';
import { UIImage } from '@/components/ui-image';
import { cn } from '@/lib/utils';

interface HeroTeaserProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  overlayOpacity?: number;
  overlayColor?: string;
  height?: 'small' | 'medium' | 'large';
  fixedHeight?: string; // Wird für Abwärtskompatibilität beibehalten
  mobileHeight?: string; // Neue Prop für mobile Höhe
  desktopHeight?: string; // Neue Prop für Desktop-Höhe
  maxHeight?: string; // Neue Prop für maximale Höhe auf sehr großen Bildschirmen
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
  className?: string;
}

export function HeroTeaser({
  title,
  description,
  imageSrc,
  imageAlt,
  overlayOpacity = 0.6,
  overlayColor = '#0f172a',
  height = 'medium',
  fixedHeight,
  mobileHeight,
  desktopHeight,
  maxHeight = '400px', // Standard-Maximalhöhe für große Bildschirme
  align = 'center',
  children,
  className,
}: HeroTeaserProps) {
  // Define height classes
  const heightClasses = {
    small: 'py-12 md:py-16',
    medium: 'py-16 md:py-24',
    large: 'py-20 md:py-32 lg:py-40',
  };

  // Define alignment classes
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  // Fallback image if the provided one doesn't load
  const fallbackImage = '/placeholder.svg?height=800&width=1600';

  // Responsive Höhen-Styles
  const responsiveHeightStyle: React.CSSProperties = {};

  if (mobileHeight || desktopHeight || fixedHeight || maxHeight) {
    // Wenn fixedHeight gesetzt ist, verwende es als Fallback
    if (fixedHeight) {
      responsiveHeightStyle.height = fixedHeight;
    }

    // Wenn mobileHeight gesetzt ist, erstelle eine CSS-Variable für mobile Höhe
    if (mobileHeight) {
      responsiveHeightStyle['--mobile-height'] = mobileHeight;
    }

    // Wenn desktopHeight gesetzt ist, erstelle eine CSS-Variable für Desktop-Höhe
    if (desktopHeight) {
      responsiveHeightStyle['--desktop-height'] = desktopHeight;
    }

    // Wenn maxHeight gesetzt ist, erstelle eine CSS-Variable für maximale Höhe
    if (maxHeight) {
      responsiveHeightStyle['--max-height'] = maxHeight;
    }
  }

  return (
    <section
      className={cn('relative py-12 md:py-20 lg:py-28', className)}
      style={responsiveHeightStyle}
    >
      <div className='absolute inset-0 z-0'>
        <UIImage
          src={imageSrc || fallbackImage}
          alt={imageAlt}
          aspectRatio='wide'
          overlay
          overlayOpacity={overlayOpacity}
          overlayColor={overlayColor}
        />
      </div>
      <div
        className={cn(
          'container relative z-10 px-4 flex items-center',
          !(mobileHeight || desktopHeight || fixedHeight || maxHeight) &&
            heightClasses[height],
          (mobileHeight || desktopHeight || fixedHeight || maxHeight) &&
            'h-full',
        )}
      >
        <div
          className={cn(
            'flex flex-col max-w-3xl',
            alignClasses[align],
            align === 'center' && 'mx-auto',
          )}
        >
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white mb-4'>
            {title}
          </h1>
          {description && (
            <p className='text-xl text-white/80 mb-6'>{description}</p>
          )}
          {children && <div className='z-10 relative mt-2'>{children}</div>}
        </div>
      </div>
    </section>
  );
}
