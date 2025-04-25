'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Filter, Ruler, Trees, X } from 'lucide-react';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { HeroTeaser } from '@/components/hero-teaser';
import { UIImage } from '@/components/ui-image';
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
  description: string;
}

export default function GardensPage() {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [loading, setLoading] = useState(true);
  const [sizeFilter, setSizeFilter] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [allFeatures, setAllFeatures] = useState<string[]>([]);

  useEffect(() => {
    const getGardens = async () => {
      try {
        // Fetch gardens from Contentful
        const contentfulGardens = await fetchGardens();
        console.log('Fetched gardens:', contentfulGardens);

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
            description: contentfulGarden.fields.description || '',
          };
        });

        // Extract all unique features for filtering
        const features = new Set<string>();
        transformedGardens.forEach((garden) => {
          garden.features.forEach((feature) => {
            features.add(feature);
          });
        });
        setAllFeatures(Array.from(features).sort());

        setGardens(transformedGardens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gardens:', error);

        // Fallback to mock data if Contentful fetch fails
        const mockGardens = [
          {
            id: '1',
            number: 'A-15',
            size: '250 m²',
            features: [
              'Laube',
              'Wasseranschluss',
              'Obstbäume',
              'Südausrichtung',
              'Teilweise Schatten',
            ],
            available: true,
            image: '/images/garden-fruit-trees.jpg',
            description:
              'Schöner Garten mit altem Baumbestand und einer gut erhaltenen Laube. Der Garten verfügt über einen eigenen Wasseranschluss und ist teilweise mit Obstbäumen bepflanzt.',
          },
          {
            id: '2',
            number: 'B-07',
            size: '300 m²',
            features: [
              'Gartenhaus',
              'Stromanschluss',
              'Gewächshaus',
              'Westausrichtung',
              'Wassertank',
            ],
            available: true,
            image: '/images/garden-house.jpg',
            description:
              'Großzügiger Garten mit solidem Gartenhaus (20m²), Stromanschluss und einem kleinen Gewächshaus. Ideal für ambitionierte Hobbygärtner.',
          },
          {
            id: '3',
            number: 'C-22',
            size: '280 m²',
            features: [
              'Laube',
              'Wasseranschluss',
              'Beerensträucher',
              'Ostausrichtung',
              'Ebenes Gelände',
            ],
            available: true,
            image: '/images/garden-berries.jpg',
            description:
              'Gepflegter Garten mit vielen Beerensträuchern und einer einfachen Laube. Der Garten hat einen eigenen Wasseranschluss und bietet viel Potenzial für Gestaltung.',
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
              'Südwestausrichtung',
            ],
            available: true,
            image: '/images/garden-pond.jpg',
            description:
              'Besonders schöner Garten mit einem kleinen Teich, Gartenhaus mit Strom- und Wasseranschluss. Der Garten ist teilweise mit Zierpflanzen gestaltet.',
          },
          {
            id: '5',
            number: 'E-11',
            size: '200 m²',
            features: [
              'Laube',
              'Wasseranschluss',
              'Nordausrichtung',
              'Ebenes Gelände',
            ],
            available: true,
            image: '/images/garden-vegetable.jpg',
            description:
              'Kleiner, überschaubarer Garten mit einfacher Laube und Wasseranschluss. Ideal für Einsteiger oder Personen mit wenig Zeit.',
          },
        ];

        setGardens(mockGardens);

        // Extract all unique features from mock data
        const features = new Set<string>();
        mockGardens.forEach((garden) => {
          garden.features.forEach((feature) => {
            features.add(feature);
          });
        });
        setAllFeatures(Array.from(features).sort());

        setLoading(false);
      }
    };

    getGardens();
  }, []);

  // Rest of the component remains the same...
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

  if (loading) {
    return (
      <>
        <HeroTeaser
          title='Freie Gärten'
          description='Entdecken Sie unsere verfügbaren Gärten und finden Sie Ihren grünen Rückzugsort.'
          imageSrc='/placeholder.svg?height=800&width=1600'
          imageAlt='Gartenanlage mit Beeten und Pflanzen'
          mobileHeight='250px'
          desktopHeight='350px'
        />
        <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
          <div className='flex justify-center py-8'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroTeaser
        title='Freie Gärten'
        description='Entdecken Sie unsere verfügbaren Gärten und finden Sie Ihren grünen Rückzugsort.'
        imageSrc='/images/hero-gardens.jpg'
        imageAlt='Gartenanlage mit Beeten und Pflanzen'
        mobileHeight='250px'
        desktopHeight='350px'
        maxHeight='400px'
      >
        <div className='flex flex-wrap gap-4 mt-2'>
          <Button className='bg-white text-green-600 hover:bg-green-50'>
            <Link href='#gardens-list'>Gärten ansehen</Link>
          </Button>
          <Button
            variant='outline'
            className='bg-transparent border-white text-white hover:bg-white/20'
          >
            <Link href='/contact'>Anfrage stellen</Link>
          </Button>
        </div>
      </HeroTeaser>

      <div
        id='gardens-list'
        className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'
      >
        <Card className='mb-8'>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center gap-2'>
                <Filter className='h-5 w-5 text-green-600' />
                Filter
              </CardTitle>
              <div className='h-8'>
                <Button
                  variant='ghost'
                  size='sm'
                  className={`text-sm h-8 text-green-600 hover:text-green-700 hover:bg-green-50 transition-all ${
                    hasActiveFilters
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                  onClick={resetAllFilters}
                >
                  Alle zurücksetzen
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <h3 className='text-sm font-medium text-gray-500'>
                  Ausstattung
                </h3>
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
          <div className='flex flex-wrap gap-1 items-center min-h-[24px]'>
            {selectedFeatures.length > 0 && (
              <>
                <span className='text-xs text-gray-500'>Aktive Filter:</span>
                {selectedFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant='outline'
                    className='text-xs py-0 h-5'
                  >
                    {feature}
                  </Badge>
                ))}
              </>
            )}
          </div>
        </div>

        {filteredGardens.length > 0 ? (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filteredGardens.map((garden) => (
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
                    {garden.size}
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
          </div>
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

        <div className='mt-12 bg-green-50 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold text-green-600 mb-4'>
            Interesse an einem Garten?
          </h2>
          <p className='mb-4'>
            Wenn Sie Interesse an einem unserer Gärten haben, kontaktieren Sie
            uns bitte über unser Kontaktformular oder besuchen Sie uns während
            der Öffnungszeiten im Vereinsbüro.
          </p>
          <Link href='/contact'>
            <Button className='bg-green-600 hover:bg-green-700'>
              Kontakt aufnehmen
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
