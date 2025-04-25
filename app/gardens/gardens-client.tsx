'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Filter, Ruler, Trees, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { UIImage } from '@/components/ui-image';

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

export default function GardensClient({ gardens }: GardensClientProps) {
  const [sizeFilter, setSizeFilter] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [allFeatures, setAllFeatures] = useState<string[]>([]);

  useEffect(() => {
    const features = new Set<string>();
    gardens.forEach((garden) => {
      garden.features.forEach((feature) => {
        features.add(feature);
      });
    });
    setAllFeatures(Array.from(features).sort());
  }, [gardens]);

  const getSizeInSquareMeters = (sizeString: string) => {
    return Number.parseInt(sizeString.replace(/\D/g, ''));
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(feature)) {
        return prev.filter((f) => f !== feature);
      } else {
        return [...prev, feature];
      }
    });
  };

  const resetAllFilters = () => {
    setSelectedFeatures([]);
    setSizeFilter('all');
  };

  const hasActiveFilters = selectedFeatures.length > 0 || sizeFilter !== 'all';

  const filteredGardens = gardens.filter((garden) => {
    let matchesFeatures = true;
    if (selectedFeatures.length > 0) {
      matchesFeatures = selectedFeatures.every((feature) =>
        garden.features.includes(feature),
      );
    }

    let matchesSize = true;
    if (sizeFilter === 'small') {
      matchesSize = getSizeInSquareMeters(garden.size) < 250;
    } else if (sizeFilter === 'medium') {
      const size = getSizeInSquareMeters(garden.size);
      matchesSize = size >= 250 && size < 300;
    } else if (sizeFilter === 'large') {
      matchesSize = getSizeInSquareMeters(garden.size) >= 300;
    }

    return garden.available && matchesFeatures && matchesSize;
  });

  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <Card className='mb-8'>
        <CardHeader className='pb-3'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <Filter className='h-5 w-5 text-green-600' />
              Filter
            </CardTitle>
            <Button
              variant='ghost'
              size='sm'
              className={`${
                hasActiveFilters
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
              }`}
              onClick={resetAllFilters}
            >
              Alle zurücksetzen
            </Button>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-sm font-medium text-gray-500'>Ausstattung</h3>
              <span className='text-xs text-gray-400'>
                {selectedFeatures.length} ausgewählt
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {allFeatures.map((feature) => (
                <Badge
                  key={feature}
                  variant={
                    selectedFeatures.includes(feature) ? 'default' : 'outline'
                  }
                  className={`cursor-pointer transition-all ${
                    selectedFeatures.includes(feature)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'hover:border-green-600 hover:text-green-600'
                  }`}
                  onClick={() => toggleFeature(feature)}
                >
                  {feature}
                  {selectedFeatures.includes(feature) && (
                    <X className='ml-1 h-3 w-3' />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className='text-sm font-medium text-gray-500 mb-2'>Größe</h3>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className='w-full md:w-[200px]'>
                <SelectValue placeholder='Gartengröße' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Alle Größen</SelectItem>
                <SelectItem value='small'>Klein (unter 250m²)</SelectItem>
                <SelectItem value='medium'>Mittel (250-300m²)</SelectItem>
                <SelectItem value='large'>Groß (über 300m²)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className='mb-4 flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {filteredGardens.length}{' '}
          {filteredGardens.length === 1 ? 'Garten' : 'Gärten'} gefunden
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredGardens.length > 0 ? (
          filteredGardens.map((garden) => (
            <Card key={garden.id} className='overflow-hidden flex flex-col'>
              <div className='aspect-video w-full'>
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
                      className={`flex items-center gap-1 ${
                        selectedFeatures.includes(feature)
                          ? 'border-green-600 text-green-600'
                          : ''
                      }`}
                    >
                      <Trees className='h-3 w-3' />
                      {feature}
                    </Badge>
                  ))}
                </div>
                <p className='text-sm text-gray-500 line-clamp-3'>
                  {garden.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant='outline' className='w-full'>
                  <span>Details ansehen</span>
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className='text-center py-12 bg-gray-50 rounded-lg'>
            <p className='text-gray-500'>
              Keine Gärten gefunden, die Ihren Filterkriterien entsprechen.
            </p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={resetAllFilters}
            >
              Filter zurücksetzen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
