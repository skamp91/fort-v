'use client';

import { useEffect, useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const getEvents = async () => {
      try {
        // In a real implementation, this would fetch from Contentful
        // const eventsData = await fetchEvents()
        // For demo purposes, we'll use mock data

        // Get current month and year for sample data
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
        const currentYear = currentDate.getFullYear();
        const formattedCurrentMonth =
          currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

        const mockEvents = [
          {
            id: '1',
            title: 'Frühlingsfest',
            date: `${currentYear}-${formattedCurrentMonth}-15`, // Current month, day 15
            time: '14:00 - 18:00',
            location: 'Vereinshaus',
            description:
              'Unser jährliches Frühlingsfest mit Pflanzentauschbörse und Kaffee & Kuchen.',
            category: 'fest',
          },
          {
            id: '2',
            title: 'Workshop: Biologisches Gärtnern',
            date: `${currentYear}-${formattedCurrentMonth}-20`, // Current month, day 20
            time: '16:00 - 18:00',
            location: 'Gemeinschaftsgarten',
            description:
              'Lernen Sie die Grundlagen des biologischen Gärtnerns ohne chemische Pestizide.',
            category: 'workshop',
          },
          {
            id: '3',
            title: 'Sommerfest',
            date: `${currentYear}-${formattedCurrentMonth}-25`, // Current month, day 25
            time: '15:00 - 22:00',
            location: 'Festwiese',
            description:
              'Großes Sommerfest mit Grillen, Musik und Spielen für die ganze Familie.',
            category: 'fest',
          },
          {
            id: '4',
            title: 'Mitgliederversammlung',
            date: `${currentYear}-${
              formattedCurrentMonth < 12 ? formattedCurrentMonth + 1 : '01'
            }-05`, // Next month
            time: '18:00 - 20:00',
            location: 'Vereinshaus',
            description:
              'Halbjährliche Mitgliederversammlung mit Bericht des Vorstands.',
            category: 'versammlung',
          },
          {
            id: '5',
            title: 'Erntefest',
            date: `${currentYear}-${
              formattedCurrentMonth < 11 ? formattedCurrentMonth + 2 : '02'
            }-12`, // Two months ahead
            time: '14:00 - 19:00',
            location: 'Festwiese',
            description:
              'Gemeinsames Feiern der Ernte mit Verkostung und Austausch.',
            category: 'fest',
          },
          {
            id: '6',
            title: 'Workshop: Garten winterfest machen',
            date: `${currentYear}-${
              formattedCurrentMonth < 10 ? formattedCurrentMonth + 3 : '03'
            }-08`, // Three months ahead
            time: '15:00 - 17:00',
            location: 'Gemeinschaftsgarten',
            description:
              'Tipps und praktische Übungen zur Vorbereitung des Gartens auf den Winter.',
            category: 'workshop',
          },
        ];
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getMonthName = (month: number) => {
    const date = new Date();
    date.setMonth(month);
    return date.toLocaleString('de-DE', { month: 'long' });
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const isCurrentMonth =
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear;
    const matchesFilter = filter === 'all' || event.category === filter;

    return isCurrentMonth && matchesFilter;
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
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

  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600'>
          Veranstaltungen
        </h1>
        <p className='mt-4 text-gray-500 md:text-xl'>
          Entdecken Sie unsere kommenden Veranstaltungen und werden Sie Teil
          unserer aktiven Gemeinschaft.
        </p>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='icon' onClick={handlePrevMonth}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <div className='font-medium text-lg min-w-[180px] text-center'>
            {getMonthName(currentMonth)} {currentYear}
          </div>
          <Button variant='outline' size='icon' onClick={handleNextMonth}>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>

        <div className='w-full md:w-auto'>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className='w-full md:w-[180px]'>
              <SelectValue placeholder='Alle Kategorien' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Alle Kategorien</SelectItem>
              <SelectItem value='fest'>Feste</SelectItem>
              <SelectItem value='workshop'>Workshops</SelectItem>
              <SelectItem value='versammlung'>Versammlungen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredEvents.map((event) => (
            <Card key={event.id} className='flex flex-col'>
              <CardHeader className='pb-2'>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className='flex items-center gap-1'>
                  <CalendarDays className='h-4 w-4 text-green-600' />
                  {formatDate(event.date)}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-1'>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-green-600' />
                    <span>{event.time}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-green-600' />
                    <span>{event.location}</span>
                  </div>
                  <p className='text-gray-500 mt-2'>{event.description}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant='outline' className='w-full'>
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center py-12 bg-gray-50 rounded-lg'>
          <p className='text-gray-500'>
            Keine Veranstaltungen für {getMonthName(currentMonth)} {currentYear}{' '}
            gefunden.
          </p>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => {
              setCurrentMonth(new Date().getMonth());
              setCurrentYear(new Date().getFullYear());
              setFilter('all');
            }}
          >
            Zurück zum aktuellen Monat
          </Button>
        </div>
      )}
    </div>
  );
}
