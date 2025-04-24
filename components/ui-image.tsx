'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  fill?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  hoverEffect?: 'zoom' | 'brighten' | 'darken' | 'none';
  onClick?: () => void;
}

export function UIImage({
  src,
  alt,
  width,
  height,
  aspectRatio = 'auto',
  fill = false,
  rounded = 'md',
  className = '',
  containerClassName = '',
  priority = false,
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.3,
  hoverEffect = 'none',
  onClick,
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  // Define aspect ratio classes
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: '',
  };

  // Define rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Define hover effect classes
  const hoverEffectClasses = {
    zoom: 'group-hover:scale-110',
    brighten: 'group-hover:brightness-110',
    darken: 'group-hover:brightness-75',
    none: '',
  };

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      className={cn(
        'overflow-hidden relative group',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
        roundedClasses[rounded],
        containerClassName,
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      {error ? (
        <div className='w-full h-full flex items-center justify-center bg-gray-100 text-gray-400'>
          Bild konnte nicht geladen werden
        </div>
      ) : (
        <>
          <img
            src={src || '/placeholder.svg'}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'w-full h-full object-cover transition-all duration-300',
              hoverEffectClasses[hoverEffect],
              !isLoaded && 'opacity-0',
              isLoaded && 'opacity-100',
              className,
            )}
          />
          {!isLoaded && (
            <div className='absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center'>
              <div className='w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin'></div>
            </div>
          )}
          {overlay && isLoaded && (
            <div
              className='absolute inset-0 transition-opacity duration-300 group-hover:opacity-0'
              style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
            ></div>
          )}
        </>
      )}
    </div>
  );
}
