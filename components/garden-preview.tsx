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
import {
  type ContentfulGarden,
  fetchGardens,
  getAssetUrl,
} from '@/lib/contentful';

interface Garden {
  id: string;
  number: string;
  size: string;
  features: string[];
  available: boolean;
  image: string;
}

export default function GardenPreview() {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGardens = async () => {
      try {
        // Fetch gardens from Contentful
        const contentfulGardens = await fetchGardens();
        // console.log('Fetched gardens for preview:', contentfulGardens);

        // Transform Contentful data to our Garden interface
        const transformedGardens = contentfulGardens.map((garden) => {
          const contentfulGarden = garden as unknown as ContentfulGarden;

          return {
            id: contentfulGarden.sys.id,
            number: contentfulGarden.fields.titel || 'Unnamed Garden',
            size: `${contentfulGarden.fields.size || 0} m²`,
            features: contentfulGarden.fields.ausstattungsmerkmale || [],
            available: contentfulGarden.fields.availability || false,
            image:
              contentfulGarden.fields.bilder &&
              contentfulGarden.fields.bilder.length > 0
                ? getAssetUrl(contentfulGarden.fields.bilder[0])
                : '/placeholder.svg',
          };
        });

        // Filter for available gardens and limit to 3
        const availableGardens = transformedGardens
          .filter((garden) => garden.available)
          .slice(0, 3);

        setGardens(availableGardens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gardens for preview:', error);

        // Fallback to mock data if Contentful fetch fails
        const mockGardens = [
          {
            id: '1',
            number: 'A-15',
            size: '250 m²',
            features: ['Laube', 'Wasseranschluss', 'Obstbäume'],
            available: true,
            image: '/images/garden-fruit-trees.jpg',
          },
          {
            id: '2',
            number: 'B-07',
            size: '300 m²',
            features: ['Gartenhaus', 'Stromanschluss', 'Gewächshaus'],
            available: true,
            image: '/images/garden-house.jpg',
          },
          {
            id: '3',
            number: 'C-22',
            size: '280 m²',
            features: ['Laube', 'Wasseranschluss', 'Beerensträucher'],
            available: true,
            image: '/images/garden-berries.jpg',
          },
        ];

        setGardens(mockGardens.filter((garden) => garden.available));
        setLoading(false);
      }
    };

    getGardens();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center py-8'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
      </div>
    );
  }

  return (
    <>
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
              {garden.features.map((feature, index) => (
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
          </CardContent>
          <CardFooter>
            <Link
              href={`/gardens/${garden.id}`}
              passHref
              legacyBehavior={false}
              className='w-full'
            >
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
    </>
  );
}
