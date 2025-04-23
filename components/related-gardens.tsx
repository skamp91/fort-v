'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Ruler, Trees } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Garden {
  id: string;
  number: string;
  size: string;
  features: string[];
  available: boolean;
  image: string;
  description: string;
}

interface RelatedGardensProps {
  currentGardenId: string;
}

export default function RelatedGardens({
  currentGardenId,
}: RelatedGardensProps) {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGardens = async () => {
      try {
        // In a real implementation, this would fetch from Contentful
        // const gardensData = await fetchGardens()
        // For demo purposes, we'll use mock data
        const mockGardens = [
          {
            id: '1',
            number: 'A-15',
            size: '250 m²',
            features: ['Laube', 'Wasseranschluss', 'Obstbäume'],
            available: true,
            image: '/placeholder.svg?height=200&width=300',
            description:
              'Schöner Garten mit altem Baumbestand und einer gut erhaltenen Laube.',
          },
          {
            id: '2',
            number: 'B-07',
            size: '300 m²',
            features: ['Gartenhaus', 'Stromanschluss', 'Gewächshaus'],
            available: true,
            image: '/placeholder.svg?height=200&width=300',
            description:
              'Großzügiger Garten mit solidem Gartenhaus (20m²), Stromanschluss und einem kleinen Gewächshaus.',
          },
          {
            id: '3',
            number: 'C-22',
            size: '280 m²',
            features: ['Laube', 'Wasseranschluss', 'Beerensträucher'],
            available: true,
            image: '/placeholder.svg?height=200&width=300',
            description:
              'Gepflegter Garten mit vielen Beerensträuchern und einer einfachen Laube.',
          },
          {
            id: '4',
            number: 'D-05',
            size: '320 m²',
            features: [
              'Gartenhaus',
              'Stromanschluss',
              'Wasseranschluss',
              'Teich',
            ],
            available: true,
            image: '/placeholder.svg?height=200&width=300',
            description:
              'Besonders schöner Garten mit einem kleinen Teich, Gartenhaus mit Strom- und Wasseranschluss.',
          },
          {
            id: '5',
            number: 'E-11',
            size: '200 m²',
            features: ['Laube', 'Wasseranschluss'],
            available: true,
            image: '/placeholder.svg?height=200&width=300',
            description:
              'Kleiner, überschaubarer Garten mit einfacher Laube und Wasseranschluss.',
          },
        ];

        // Filter out the current garden and limit to 3 related gardens
        const relatedGardens = mockGardens
          .filter((garden) => garden.id !== currentGardenId)
          .slice(0, 3);

        setGardens(relatedGardens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gardens:', error);
        setLoading(false);
      }
    };

    getGardens();
  }, [currentGardenId]);

  if (loading) {
    return (
      <div className='flex justify-center py-8'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
      </div>
    );
  }

  if (gardens.length === 0) {
    return null;
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {gardens.map((garden) => (
        <Card key={garden.id} className='overflow-hidden flex flex-col'>
          <div className='aspect-video w-full overflow-hidden'>
            <img
              src={garden.image || '/placeholder.svg'}
              alt={`Garten ${garden.number}`}
              className='object-cover w-full h-full'
            />
          </div>
          <CardHeader className='pb-2'>
            <div className='flex justify-between items-center'>
              <CardTitle>Garten {garden.number}</CardTitle>
              <Badge className='bg-green-600'>Verfügbar</Badge>
            </div>
            <CardDescription className='flex items-center gap-1'>
              <Ruler className='h-4 w-4 text-green-600' />
              {garden.size}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-1'>
            <div className='flex flex-wrap gap-2 mb-4'>
              {garden.features.slice(0, 3).map((feature, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className='flex items-center gap-1'
                >
                  <Trees className='h-3 w-3' />
                  {feature}
                </Badge>
              ))}
            </div>
            <p className='text-sm text-gray-500 line-clamp-2'>
              {garden.description}
            </p>
          </CardContent>
          <CardFooter>
            <Link href={`/gardens/${garden.id}`} className='w-full'>
              <Button
                variant='outline'
                className='w-full flex items-center justify-between'
              >
                <span>Details ansehen</span>
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
