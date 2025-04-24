'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  MapPin,
  Share,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventWidget from '@/components/event-widget';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  fullDescription?: string;
  category?: string;
  organizer?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  price?: string;
  images?: string[];
  locationDetails?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  documents?: { name: string; url: string }[];
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvent = async () => {
      try {
        // In a real implementation, this would fetch from Contentful
        // const eventData = await fetchEventById(params.id)
        // For demo purposes, we'll use mock data

        // Get current month and year for sample data
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
        const currentYear = currentDate.getFullYear();
        const formattedCurrentMonth =
          currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

        const mockEvents: Record<string, Event> = {
          '1': {
            id: '1',
            title: 'Frühlingsfest',
            date: `${currentYear}-${formattedCurrentMonth}-15`,
            time: '14:00 - 18:00',
            location: 'Vereinshaus und Festwiese',
            description:
              'Unser jährliches Frühlingsfest mit Pflanzentauschbörse und Kaffee & Kuchen.',
            fullDescription: `Wir laden alle Mitglieder und Freunde unseres Kleingartenvereins herzlich zum diesjährigen Frühlingsfest ein! 

Erleben Sie einen wunderbaren Nachmittag in unserer grünen Oase mit:

- Großer Pflanzentauschbörse: Bringen Sie Ihre überzähligen Setzlinge, Ableger und Samen mit und tauschen Sie mit anderen Gartenfreunden
- Kaffee & selbstgebackenem Kuchen in unserem Vereinshaus
- Gartenberatung durch unseren Fachberater
- Kinderprogramm mit Basteln und Spielen
- Live-Musik ab 16:00 Uhr

Der Erlös aus dem Kuchenverkauf kommt unserem Projekt "Insektenfreundlicher Gemeinschaftsgarten" zugute.`,
            category: 'fest',
            organizer: 'Festkomitee des Kleingartenvereins',
            maxParticipants: 100,
            currentParticipants: 42,
            price: 'Eintritt frei, Kaffee & Kuchen gegen Spende',
            images: [
              '/placeholder.svg?height=600&width=800',
              '/placeholder.svg?height=600&width=800',
              '/placeholder.svg?height=600&width=800',
            ],
            locationDetails:
              'Vereinshaus und angrenzende Festwiese, bei schlechtem Wetter nur im Vereinshaus',
            contactPerson: 'Maria Schmidt',
            contactEmail: 'fest@gruene-oase-verein.de',
            contactPhone: '+49 123 45678',
            documents: [
              { name: 'Programm als PDF', url: '#' },
              { name: 'Lageplan', url: '#' },
            ],
          },
          '2': {
            id: '2',
            title: 'Workshop: Biologisches Gärtnern',
            date: `${currentYear}-${formattedCurrentMonth}-20`,
            time: '16:00 - 18:00',
            location: 'Gemeinschaftsgarten',
            description:
              'Lernen Sie die Grundlagen des biologischen Gärtnerns ohne chemische Pestizide.',
            fullDescription: `In diesem praxisorientierten Workshop lernen Sie die Grundlagen des biologischen Gärtnerns kennen. Unser erfahrener Gartenfachberater Klaus Hoffmann zeigt Ihnen, wie Sie ohne chemische Pestizide und Kunstdünger erfolgreich gärtnern können.

Themen des Workshops:
- Natürliche Schädlingsbekämpfung
- Kompostierung und Bodenverbesserung
- Mischkultur und Fruchtfolge
- Nützlingsförderung im Garten
- Herstellung von Pflanzenjauchen und natürlichen Düngern

Bitte bringen Sie wetterfeste Kleidung und Schreibmaterial mit. Der Workshop findet bei jedem Wetter statt, bei Regen unter unserem Pavillon im Gemeinschaftsgarten.`,
            category: 'workshop',
            organizer: 'Klaus Hoffmann, Gartenfachberater',
            maxParticipants: 15,
            currentParticipants: 8,
            price: '5€ für Mitglieder, 10€ für Nichtmitglieder',
            images: [
              '/placeholder.svg?height=600&width=800',
              '/placeholder.svg?height=600&width=800',
            ],
            locationDetails: 'Treffpunkt am Eingang des Gemeinschaftsgartens',
            contactPerson: 'Klaus Hoffmann',
            contactEmail: 'fachberatung@gruene-oase-verein.de',
            contactPhone: '+49 123 45679',
            documents: [{ name: 'Handout zum Workshop', url: '#' }],
          },
          '3': {
            id: '3',
            title: 'Sommerfest',
            date: `${currentYear}-${formattedCurrentMonth}-25`,
            time: '15:00 - 22:00',
            location: 'Festwiese',
            description:
              'Großes Sommerfest mit Grillen, Musik und Spielen für die ganze Familie.',
            fullDescription: `Unser traditionelles Sommerfest ist der Höhepunkt des Vereinsjahres! Wir feiern gemeinsam mit Mitgliedern, Familien, Freunden und Nachbarn.

Programm:
- 15:00 Uhr: Eröffnung mit Grußwort des Vorstands
- 15:30 Uhr: Kaffee und Kuchen
- 16:00 Uhr: Spiele für Kinder
- 17:00 Uhr: Tombola mit tollen Preisen
- 18:00 Uhr: Gemeinsames Grillen (Fleisch und Getränke können vor Ort erworben werden)
- 19:30 Uhr: Live-Musik mit der Band "Gartenklänge"
- 22:00 Uhr: Ende der Veranstaltung

Für das leibliche Wohl ist mit Gegrilltem, Salaten, Kuchen und Getränken bestens gesorgt. Der Erlös kommt der Renovierung unseres Vereinshauses zugute.`,
            category: 'fest',
            organizer: 'Vorstand und Festkomitee',
            maxParticipants: 200,
            currentParticipants: 120,
            price: 'Eintritt frei, Speisen und Getränke gegen Bezahlung',
            images: [
              '/placeholder.svg?height=600&width=800',
              '/placeholder.svg?height=600&width=800',
              '/placeholder.svg?height=600&width=800',
            ],
            locationDetails:
              'Auf der großen Festwiese am Ende der Kleingartenanlage, bei Regen im Festzelt',
            contactPerson: 'Thomas Müller',
            contactEmail: 'vorstand@gruene-oase-verein.de',
            contactPhone: '+49 123 45670',
            documents: [
              { name: 'Festprogramm', url: '#' },
              { name: 'Speisekarte', url: '#' },
            ],
          },
        };

        const eventData = mockEvents[params.id as string];

        if (eventData) {
          setEvent(eventData);
        } else {
          // Handle event not found
          router.push('/events');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
        // Handle error, maybe redirect
        router.push('/events');
      }
    };

    if (params.id) {
      getEvent();
    }
  }, [params.id, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
        <div className='flex justify-center py-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>
            Veranstaltung nicht gefunden
          </h1>
          <p className='mb-6'>
            Die gesuchte Veranstaltung konnte leider nicht gefunden werden.
          </p>
          <Link href='/events'>
            <Button>Zurück zur Veranstaltungsübersicht</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <div className='mb-6'>
        <Link
          href='/events'
          className='inline-flex items-center text-green-600 hover:text-green-700'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Zurück zur Veranstaltungsübersicht
        </Link>
      </div>

      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <div className='mb-6'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl text-green-600 mb-2'>
              {event.title}
            </h1>
            <div className='flex flex-wrap gap-4 text-gray-500'>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4 text-green-600' />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Clock className='h-4 w-4 text-green-600' />
                <span>{event.time}</span>
              </div>
              <div className='flex items-center gap-1'>
                <MapPin className='h-4 w-4 text-green-600' />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {event.images && event.images.length > 0 && (
            <div className='mb-8 overflow-hidden rounded-lg'>
              <img
                src={event.images[0] || '/placeholder.svg'}
                alt={event.title}
                className='w-full h-auto object-cover aspect-[16/9]'
              />
            </div>
          )}

          <Tabs defaultValue='description' className='mt-8'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='description'>Beschreibung</TabsTrigger>
              <TabsTrigger value='details'>Details</TabsTrigger>
              <TabsTrigger value='location'>Ort</TabsTrigger>
            </TabsList>
            <TabsContent value='description' className='mt-4'>
              <div className='prose max-w-none'>
                <p className='text-gray-700 whitespace-pre-line'>
                  {event.fullDescription || event.description}
                </p>
              </div>
            </TabsContent>
            <TabsContent value='details' className='mt-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <h3 className='font-medium mb-2'>Veranstaltungsdetails</h3>
                  <ul className='space-y-2 text-sm text-gray-600'>
                    <li className='flex items-start'>
                      <span className='font-medium w-32'>Kategorie:</span>
                      <span className='capitalize'>
                        {event.category || 'Veranstaltung'}
                      </span>
                    </li>
                    <li className='flex items-start'>
                      <span className='font-medium w-32'>Datum:</span>
                      <span>{formatDate(event.date)}</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='font-medium w-32'>Uhrzeit:</span>
                      <span>{event.time}</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='font-medium w-32'>Ort:</span>
                      <span>{event.location}</span>
                    </li>
                    {event.price && (
                      <li className='flex items-start'>
                        <span className='font-medium w-32'>Kosten:</span>
                        <span>{event.price}</span>
                      </li>
                    )}
                    {event.organizer && (
                      <li className='flex items-start'>
                        <span className='font-medium w-32'>Veranstalter:</span>
                        <span>{event.organizer}</span>
                      </li>
                    )}
                  </ul>
                </div>
                {(event.maxParticipants || event.documents) && (
                  <div>
                    {event.maxParticipants && (
                      <div className='mb-4'>
                        <h3 className='font-medium mb-2'>Teilnehmer</h3>
                        <div className='flex items-center gap-2 mb-2'>
                          <Users className='h-4 w-4 text-green-600' />
                          <span className='text-sm text-gray-600'>
                            {event.currentParticipants} von{' '}
                            {event.maxParticipants} Plätzen belegt
                          </span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className='bg-green-600 h-2.5 rounded-full'
                            style={{
                              width: `${Math.min(
                                100,
                                (event.currentParticipants! /
                                  event.maxParticipants!) *
                                  100,
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {event.documents && event.documents.length > 0 && (
                      <div>
                        <h3 className='font-medium mb-2'>Dokumente</h3>
                        <ul className='space-y-2'>
                          {event.documents.map((doc, index) => (
                            <li key={index}>
                              <a
                                href={doc.url}
                                className='flex items-center gap-2 text-green-600 hover:text-green-700 text-sm'
                              >
                                <Download className='h-4 w-4' />
                                {doc.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value='location' className='mt-4'>
              <div className='aspect-video bg-gray-100 rounded-lg flex items-center justify-center'>
                <div className='text-center p-8'>
                  <MapPin className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-500'>
                    {event.locationDetails ||
                      `Veranstaltungsort: ${event.location}`}
                  </p>
                </div>
              </div>
              <p className='mt-4 text-gray-500'>
                Für weitere Informationen zum Veranstaltungsort kontaktieren Sie
                uns bitte.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle>Teilnehmen</CardTitle>
              <CardDescription>
                Melden Sie sich für diese Veranstaltung an
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <Badge className='bg-green-600 mb-2'>
                    {event.maxParticipants &&
                    event.currentParticipants === event.maxParticipants
                      ? 'Ausgebucht'
                      : 'Plätze verfügbar'}
                  </Badge>
                  <div className='flex items-center gap-2 mb-1'>
                    <Calendar className='h-4 w-4 text-green-600' />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className='flex items-center gap-2 mb-1'>
                    <Clock className='h-4 w-4 text-green-600' />
                    <span>{event.time}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-green-600' />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-2'>
                <p className='text-sm text-gray-500'>
                  Haben Sie Interesse an dieser Veranstaltung oder möchten Sie
                  weitere Informationen erhalten?
                </p>
                <Link href={`/contact?event=${event.id}`}>
                  <Button className='w-full bg-green-600 hover:bg-green-700'>
                    Anmelden / Anfragen
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {(event.contactPerson ||
            event.contactEmail ||
            event.contactPhone) && (
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {event.contactPerson && (
                  <p className='text-sm font-medium'>{event.contactPerson}</p>
                )}
                <div className='space-y-2 text-sm text-gray-500'>
                  {event.contactEmail && (
                    <p>
                      <a
                        href={`mailto:${event.contactEmail}`}
                        className='text-green-600 hover:underline'
                      >
                        {event.contactEmail}
                      </a>
                    </p>
                  )}
                  {event.contactPhone && <p>{event.contactPhone}</p>}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className='pb-3'>
              <CardTitle>Teilen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex gap-2'>
                <Button variant='outline' size='icon' className='rounded-full'>
                  <Share className='h-4 w-4' />
                  <span className='sr-only'>Teilen</span>
                </Button>
                <Button
                  variant='outline'
                  className='flex-1'
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link in die Zwischenablage kopiert!');
                  }}
                >
                  Link kopieren
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='mt-16'>
        <h2 className='text-2xl font-bold tracking-tighter mb-6 text-green-600'>
          Weitere Veranstaltungen
        </h2>
        <EventWidget />
      </div>
    </div>
  );
}
