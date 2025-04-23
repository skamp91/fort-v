'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flower, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { href: '/', label: 'Startseite' },
    { href: '/about', label: 'Über uns' },
    { href: '/events', label: 'Veranstaltungen' },
    { href: '/gardens', label: 'Freie Gärten' },
    { href: '/contact', label: 'Kontakt' },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='container flex h-16 items-center px-4 md:px-6'>
        <Link href='/' className='flex items-center gap-2'>
          {/* <Flower className='h-6 w-6 text-green-600' /> */}
          <img
            src='/schriftlogo-removebg-preview.png'
            alt='Fort V e.V. Logo'
            className='h-12 md:inline-block'
          />
        </Link>
        <nav className='ml-auto hidden md:flex gap-6'>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                pathname === route.href ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='md:hidden ml-auto'>
            <Button variant='outline' size='icon' className='rounded-full'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right'>
            <div className='flex flex-col gap-6 mt-8'>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-green-600 ${
                    pathname === route.href ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
