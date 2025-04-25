'use client';

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
import { UIImage } from './ui-image';

interface Garden {
  id: string;
  number: string;
  size: string;
  features: string[];
  available: boolean;
  image: string;
  description: string;
}

interface GardensClientProps {
  gardens: Garden[];
}

export default function GardenPreview({ gardens }: GardensClientProps) {
  return (
    <>
      {gardens.map((garden) => (
        <Card key={garden.id} className='overflow-hidden flex flex-col'>
          <div className='aspect-video w-full overflow-hidden'>
            <UIImage
              src={garden.image}
              alt={`Garten ${garden.number}`}
              aspectRatio='video'
              hoverEffect='zoom'
            />
          </div>
          <CardHeader className='pb-2'>
            <div className='flex justify-between items-center'>
              <CardTitle>Garten {garden.number}</CardTitle>
              <Badge className='bg-green-600'>Verfügbar</Badge>
            </div>
            <CardDescription className='flex items-center gap-1'>
              <Ruler className='h-4 w-4 text-green-600' />
              {garden.size} m²
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
