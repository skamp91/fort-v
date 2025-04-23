import Link from 'next/link';
import { CalendarDays, Flower, Mail, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventWidget from '@/components/event-widget';
import GardenPreview from '@/components/garden-preview';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='relative bg-green-600 text-white py-12 md:py-24'>
        {/* Hintergrundbild + Overlay */}
        {/* <img
          src='/logoOhneText.webp'
          alt='Header Hintergrund'
          className='absolute inset-0 h-full w-full object-cover z-0'
        />
        <div className='absolute inset-0 bg-black opacity-50 z-0' /> */}
        <div className="absolute inset-0 z-0 bg-[url('/logoOhneText__BG.png')] bg-no-repeat bg-center bg-contain">
          <div className='absolute inset-0 bg-black opacity-40' />
        </div>

        {/* Inhalt */}
        <div className='relative z-10 container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Kleingartenverein Fort V e.V. Test
              </h1>
              <p className='mx-auto max-w-[700px] text-white/90 md:text-xl'>
                Willkommen in unserer Gartengemeinschaft. Entdecken Sie die
                Freude am Gärtnern und werden Sie Teil unserer grünen Familie.
              </p>
            </div>
            <div className='space-x-4'>
              <Link href='/gardens'>
                <Button className='bg-white text-green-600 hover:bg-green-50'>
                  Freie Gärten
                </Button>
              </Link>
              <Link href='/contact'>
                <Button
                  variant='outline'
                  className='border-white text-white hover:bg-white/20'
                >
                  Kontakt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-16 lg:py-20'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col gap-4 md:gap-8'>
              <div className='mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-2 lg:gap-12'>
                <div className='space-y-4'>
                  <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600'>
                    Über uns
                  </h2>
                  <p className='text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                    Unser Kleingartenverein wurde 1975 gegründet und bietet eine
                    Fort V e.V. mitten in der Stadt. Wir fördern nachhaltiges
                    Gärtnern, Biodiversität und eine starke Gemeinschaft.
                  </p>
                </div>
                <div className='flex justify-center'>
                  <img
                    alt='Garten Gemeinschaft'
                    className='rounded-lg object-cover aspect-square'
                    height='400'
                    src='/placeholder.svg?height=400&width=400'
                    width='400'
                  />
                </div>
              </div>
              <div className='grid gap-6 lg:grid-cols-3'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-xl flex items-center gap-2'>
                      <Flower className='h-5 w-5 text-green-600' />
                      Gemeinschaft
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Gemeinsame Feste, Workshops und Gartenarbeit stärken
                      unsere Gemeinschaft und fördern den Austausch.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-xl flex items-center gap-2'>
                      <MapPin className='h-5 w-5 text-green-600' />
                      Natur erleben
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Unsere Gärten bieten einen Rückzugsort in der Natur und
                      die Möglichkeit, eigenes Obst und Gemüse anzubauen.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-xl flex items-center gap-2'>
                      <CalendarDays className='h-5 w-5 text-green-600' />
                      Veranstaltungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Regelmäßige Veranstaltungen wie Gartenfeste,
                      Pflanzentauschbörsen und Workshops für alle Altersgruppen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full bg-gray-100 py-12 md:py-16 lg:py-20'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col gap-4 md:gap-8'>
              <div className='space-y-4 text-center'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600'>
                  Kommende Veranstaltungen
                </h2>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Entdecken Sie unsere nächsten Veranstaltungen und werden Sie
                  Teil unserer aktiven Gemeinschaft.
                </p>
              </div>
              <EventWidget />
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-16 lg:py-20'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col gap-4 md:gap-8'>
              <div className='space-y-4 text-center'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600'>
                  Freie Gärten
                </h2>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Aktuell verfügbare Gärten in unserem Verein. Werden Sie Teil
                  unserer Gemeinschaft.
                </p>
              </div>
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                <GardenPreview />
              </div>
              <div className='flex justify-center'>
                <Link href='/gardens'>
                  <Button className='bg-green-600 hover:bg-green-700'>
                    Alle freien Gärten ansehen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full bg-green-50 py-12 md:py-16 lg:py-20'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col gap-4 md:gap-8'>
              <div className='space-y-4 text-center'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600'>
                  Kontakt
                </h2>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Haben Sie Fragen? Kontaktieren Sie uns gerne.
                </p>
              </div>
              <div className='mx-auto flex w-full max-w-sm flex-col justify-center space-y-2'>
                <div className='flex justify-center'>
                  <Link href='/contact'>
                    <Button className='bg-green-600 hover:bg-green-700 flex items-center gap-2'>
                      <Mail className='h-4 w-4' />
                      Zum Kontaktformular
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full bg-green-800 text-white py-6 md:py-8'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-center md:text-left'>
              <p className='text-sm'>
                © 2024 Kleingartenverein Fort 5 e.V.. Alle Rechte vorbehalten.
              </p>
            </div>
            <div className='flex gap-4'>
              <Link href='/about' className='text-sm hover:underline'>
                Über uns
              </Link>
              <Link href='/events' className='text-sm hover:underline'>
                Veranstaltungen
              </Link>
              <Link href='/gardens' className='text-sm hover:underline'>
                Freie Gärten
              </Link>
              <Link href='/contact' className='text-sm hover:underline'>
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
