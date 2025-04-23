'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GardenGalleryProps {
  images: string[];
}

export default function GardenGallery({ images }: GardenGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openFullscreen = (index: number) => {
    setFullscreenImage(index);
  };

  return (
    <div className='space-y-4'>
      <div className='relative aspect-[4/3] w-full overflow-hidden rounded-lg'>
        <img
          src={images[currentImage] || '/placeholder.svg'}
          alt={`Garten Bild ${currentImage + 1}`}
          className='h-full w-full object-cover'
        />
        <Button
          variant='outline'
          size='icon'
          className='absolute right-4 top-4 bg-white/80 hover:bg-white'
          onClick={() => openFullscreen(currentImage)}
        >
          <Expand className='h-4 w-4' />
          <span className='sr-only'>Vollbild anzeigen</span>
        </Button>
        {images.length > 1 && (
          <>
            <Button
              variant='outline'
              size='icon'
              className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white'
              onClick={prevImage}
            >
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Vorheriges Bild</span>
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white'
              onClick={nextImage}
            >
              <ChevronRight className='h-4 w-4' />
              <span className='sr-only'>Nächstes Bild</span>
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className='flex space-x-2 overflow-auto pb-2'>
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-md ${
                currentImage === index ? 'ring-2 ring-green-600' : ''
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={image || '/placeholder.svg'}
                alt={`Thumbnail ${index + 1}`}
                className='h-16 w-24 object-cover'
              />
            </button>
          ))}
        </div>
      )}

      <Dialog
        open={fullscreenImage !== null}
        onOpenChange={(open) => !open && setFullscreenImage(null)}
      >
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>
              Garten Bild {fullscreenImage !== null ? fullscreenImage + 1 : ''}
            </DialogTitle>
            <DialogDescription>
              Bild {fullscreenImage !== null ? fullscreenImage + 1 : ''} von{' '}
              {images.length}
            </DialogDescription>
          </DialogHeader>
          <div className='relative aspect-video w-full overflow-hidden'>
            {fullscreenImage !== null && (
              <img
                src={images[fullscreenImage] || '/placeholder.svg'}
                alt={`Garten Bild ${fullscreenImage + 1}`}
                className='h-full w-full object-contain'
              />
            )}
            {images.length > 1 && fullscreenImage !== null && (
              <>
                <Button
                  variant='outline'
                  size='icon'
                  className='absolute left-4 top-1/2 -translate-y-1/2'
                  onClick={() =>
                    setFullscreenImage((prev) =>
                      prev === 0 ? images.length - 1 : (prev as number) - 1,
                    )
                  }
                >
                  <ChevronLeft className='h-4 w-4' />
                  <span className='sr-only'>Vorheriges Bild</span>
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                  onClick={() =>
                    setFullscreenImage((prev) =>
                      prev === images.length - 1 ? 0 : (prev as number) + 1,
                    )
                  }
                >
                  <ChevronRight className='h-4 w-4' />
                  <span className='sr-only'>Nächstes Bild</span>
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
