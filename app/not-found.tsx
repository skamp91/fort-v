import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center'>
      <div className='mb-8'>
        <div className='relative w-40 h-40 mx-auto mb-4'>
          <div className='absolute inset-0 bg-green-100 rounded-full'></div>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] w-24 h-24'>
            <div className='w-6 h-32 bg-green-800 absolute left-1/2 -translate-x-1/2 rounded-t-full'></div>
            <div className='w-24 h-24 bg-green-500 absolute bottom-0 rounded-full flex items-center justify-center'>
              <div className='w-16 h-16 bg-yellow-400 rounded-full'></div>
            </div>
          </div>
        </div>
        <h1 className='text-6xl font-bold text-green-600 mb-2'>404</h1>
        <h2 className='text-2xl font-semibold mb-4'>
          Diese Seite ist nicht gewachsen
        </h2>
        <p className='text-gray-500 max-w-md mx-auto mb-8'>
          Leider konnten wir die gesuchte Seite nicht finden. Vielleicht wurde
          sie entfernt, umbenannt oder ist vorübergehend nicht verfügbar.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Button asChild className='bg-green-600 hover:bg-green-700'>
          <Link href='/' className='flex items-center gap-2'>
            <Home className='h-4 w-4' />
            Zurück zur Startseite
          </Link>
        </Button>
        <Button asChild variant='outline'>
          <Link href='/gardens' className='flex items-center gap-2'>
            <Search className='h-4 w-4' />
            Gärten entdecken
          </Link>
        </Button>
        <Button
          asChild
          variant='ghost'
          className='text-green-600 hover:text-green-700 hover:bg-green-50'
        >
          <Link href='/contact' className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Kontakt aufnehmen
          </Link>
        </Button>
      </div>
    </div>
  );
}
