'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Check,
  Info,
  Mail,
  MapPin,
  Ruler,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import GardenGallery from '@/components/garden-gallery';
import RelatedGardens from '@/components/related-gardens';
import { fetchGardenById, getAssetUrl } from '@/lib/contentful';

interface Garden {
  id: string;
  number: string;
  size: string;
  features: string[];
  available: boolean;
  image: string;
  description: string;
  fullDescription?: string;
  location?: string;
  price?: string;
  availableFrom?: string;
  images?: string[];
}

export default function GardenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [garden, setGarden] = useState<Garden | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGarden = async () => {
      try {
        if (!params.id) {
          throw new Error('Garden ID is missing');
        }

        // Fetch garden from Contentful
        const contentfulGarden = await fetchGardenById(params.id as string);
        console.log('Fetched garden:', contentfulGarden);

        if (!contentfulGarden) {
          throw new Error('Garden not found');
        }

        // Transform Contentful data to our Garden interface
        const gardenData: Garden = {
          id: contentfulGarden.sys.id,
          number: contentfulGarden.fields.titel || 'Unnamed Garden',
          size: `${contentfulGarden.fields.size || 0} m²`,
          features: contentfulGarden.fields.ausstattungsmerkmale || [],
          available: contentfulGarden.fields.availability || false,
          description: contentfulGarden.fields.description || '',
          fullDescription: contentfulGarden.fields.description || '', // Using the same field for now
          image:
            contentfulGarden.fields.bilder &&
            contentfulGarden.fields.bilder.length > 0
              ? getAssetUrl(contentfulGarden.fields.bilder[0])
              : '/placeholder.svg',
          images: contentfulGarden.fields.bilder
            ? contentfulGarden.fields.bilder.map((image) => getAssetUrl(image))
            : ['/placeholder.svg'],
          location: 'Kleingartenanlage Grüne Oase', // Default location
          price: 'Auf Anfrage', // Default price
          availableFrom: contentfulGarden.fields.availability
            ? 'Sofort'
            : 'Nicht verfügbar',
        };

        setGarden(gardenData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching garden:', error);

        // Fallback to mock data if Contentful fetch fails
        // Mock data remains the same
        const mockGardens: Record<string, Garden> = {
          '1': {
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
              'Schöner Garten mit altem Baumbestand und einer gut erhaltenen Laube.',
            fullDescription:
              'Dieser wunderschöne Garten mit einer Größe von 250 m² bietet einen alten, gepflegten Baumbestand und eine gut erhaltene Laube. Der Garten verfügt über einen eigenen Wasseranschluss und ist teilweise mit Obstbäumen bepflanzt. Die Südausrichtung sorgt für viel Sonnenlicht, während einige Bereiche durch die Bäume angenehm beschattet sind. Die Parzelle ist ideal für Familien oder Hobbygärtner, die einen bereits etablierten Garten übernehmen möchten. Die Laube bietet Stauraum für Gartengeräte und einen gemütlichen Rückzugsort bei schlechtem Wetter.',
            location: 'Nordöstlicher Bereich der Anlage, nahe am Hauptweg',
            price: '1.200 € Ablöse + 180 € Jahrespacht',
            availableFrom: 'Sofort',
            images: [
              '/images/garden-fruit-trees.jpg',
              '/images/garden-berries.jpg',
              '/images/garden-vegetable.jpg',
              '/images/garden-shed.jpg',
            ],
          },
          '2': {
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
              'Großzügiger Garten mit solidem Gartenhaus (20m²), Stromanschluss und einem kleinen Gewächshaus.',
            fullDescription:
              'Dieser großzügige Garten mit einer Fläche von 300 m² bietet ein solides Gartenhaus mit 20 m² Grundfläche, das über einen Stromanschluss verfügt. Ein kleines, gut erhaltenes Gewächshaus ermöglicht die Anzucht von Pflanzen und die Verlängerung der Gartensaison. Die Westausrichtung sorgt für angenehme Nachmittagssonne. Ein 1000-Liter-Wassertank zur Regenwassersammlung ist bereits installiert. Der Garten ist ideal für ambitionierte Hobbygärtner, die Wert auf Selbstversorgung legen. Das Gartenhaus bietet ausreichend Platz für Werkzeuge und zum Verweilen.',
            location:
              'Westlicher Bereich der Anlage, in der Nähe des Gemeinschaftsplatzes',
            price: '2.500 € Ablöse + 220 € Jahrespacht',
            availableFrom: 'Ab 01.06.2024',
            images: [
              '/images/garden-house.jpg',
              '/images/garden-pond.jpg',
              '/images/garden-fruit-trees.jpg',
              '/images/garden-vegetable.jpg',
            ],
          },
          '3': {
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
              'Gepflegter Garten mit vielen Beerensträuchern und einer einfachen Laube.',
            fullDescription:
              'Dieser gepflegte Garten mit einer Größe von 280 m² verfügt über zahlreiche Beerensträucher (Himbeeren, Johannisbeeren, Stachelbeeren) und eine einfache, aber funktionale Laube. Der Garten hat einen eigenen Wasseranschluss und bietet durch seine Ostausrichtung angenehme Morgensonne. Das ebene Gelände erleichtert die Bewirtschaftung. Der Garten bietet viel Potenzial für eigene Gestaltungsideen und ist besonders für Einsteiger oder Familien mit Kindern geeignet, die Wert auf Obstanbau legen.',
            location: 'Östlicher Bereich der Anlage, in ruhiger Lage',
            price: '1.800 € Ablöse + 200 € Jahrespacht',
            availableFrom: 'Sofort',
            images: [
              '/images/garden-berries.jpg',
              '/images/garden-fruit-trees.jpg',
              '/images/garden-vegetable.jpg',
              '/images/garden-shed.jpg',
            ],
          },
          '4': {
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
              'Besonders schöner Garten mit einem kleinen Teich, Gartenhaus mit Strom- und Wasseranschluss.',
            fullDescription:
              'Dieser besonders schöne Garten mit einer Größe von 320 m² ist ein wahres Kleinod. Er verfügt über ein gepflegtes Gartenhaus mit Strom- und Wasseranschluss sowie einen kleinen, naturnahen Teich, der verschiedenen Tieren Lebensraum bietet. Die Südwestausrichtung garantiert viel Sonne über den Tag verteilt. Der Garten ist teilweise mit Zierpflanzen gestaltet und bietet dennoch ausreichend Platz für den Anbau von Gemüse und Obst. Besonders geeignet für Naturliebhaber und Gartengestalter mit Erfahrung.',
            location: 'Südlicher Bereich der Anlage, in bevorzugter Lage',
            price: '3.200 € Ablöse + 240 € Jahrespacht',
            availableFrom: 'Ab 15.07.2024',
            images: [
              '/images/garden-pond.jpg',
              '/images/garden-house.jpg',
              '/images/garden-berries.jpg',
              '/images/garden-vegetable.jpg',
            ],
          },
          '5': {
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
              'Kleiner, überschaubarer Garten mit einfacher Laube und Wasseranschluss.',
            fullDescription:
              'Dieser kleine, überschaubare Garten mit einer Größe von 200 m² ist ideal für Einsteiger oder Personen mit wenig Zeit. Er verfügt über eine einfache Laube und einen Wasseranschluss. Die Nordausrichtung sorgt für angenehme Temperaturen im Sommer. Das ebene Gelände erleichtert die Bewirtschaftung. Der Garten bietet eine gute Grundlage für eigene Gestaltungsideen und ist aufgrund seiner Größe mit überschaubarem Aufwand zu pflegen.',
            location: 'Nördlicher Bereich der Anlage, nahe am Parkplatz',
            price: '900 € Ablöse + 150 € Jahrespacht',
            availableFrom: 'Sofort',
            images: [
              '/images/garden-vegetable.jpg',
              '/images/garden-fruit-trees.jpg',
              '/images/garden-berries.jpg',
              '/images/garden-shed.jpg',
            ],
          },
        };

        const gardenData = mockGardens[params.id as string];

        if (gardenData) {
          setGarden(gardenData);
        } else {
          // Handle garden not found
          router.push('/gardens');
        }

        setLoading(false);
      }
    };

    if (params.id) {
      getGarden();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
        <div className='flex justify-center py-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
        </div>
      </div>
    );
  }

  if (!garden) {
    return (
      <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Garten nicht gefunden</h1>
          <p className='mb-6'>
            Der gesuchte Garten konnte leider nicht gefunden werden.
          </p>
          <Link href='/gardens'>
            <Button>Zurück zur Gartenübersicht</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <div className='mb-6'>
        <Link
          href='/gardens'
          className='inline-flex items-center text-green-600 hover:text-green-700'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Zurück zur Gartenübersicht
        </Link>
      </div>

      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <div className='mb-6'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl text-green-600 mb-2'>
              Garten {garden.number}
            </h1>
            <div className='flex items-center gap-2 text-gray-500'>
              <MapPin className='h-4 w-4' />
              <span>{garden.location || 'Kleingartenanlage Grüne Oase'}</span>
            </div>
          </div>

          <GardenGallery images={garden.images || [garden.image]} />

          <Tabs defaultValue='description' className='mt-8'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='description'>Beschreibung</TabsTrigger>
              <TabsTrigger value='features'>Ausstattung</TabsTrigger>
              <TabsTrigger value='location'>Lage</TabsTrigger>
            </TabsList>
            <TabsContent value='description' className='mt-4'>
              <div className='prose max-w-none'>
                <p className='text-gray-700 whitespace-pre-line'>
                  {garden.fullDescription || garden.description}
                </p>
              </div>
            </TabsContent>
            <TabsContent value='features' className='mt-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <h3 className='font-medium mb-2'>Grundinformationen</h3>
                  <ul className='space-y-2'>
                    <li className='flex items-start'>
                      <Check className='h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0' />
                      <span>Größe: {garden.size}</span>
                    </li>
                    <li className='flex items-start'>
                      <Check className='h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0' />
                      <span>
                        Verfügbar ab: {garden.availableFrom || 'Sofort'}
                      </span>
                    </li>
                    <li className='flex items-start'>
                      <Check className='h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0' />
                      <span>Kosten: {garden.price || 'Auf Anfrage'}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-medium mb-2'>Ausstattung</h3>
                  <ul className='space-y-2'>
                    {garden.features.map((feature, index) => (
                      <li key={index} className='flex items-start'>
                        <Check className='h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value='location' className='mt-4'>
              <div className='aspect-video bg-gray-100 rounded-lg flex items-center justify-center'>
                <div className='text-center p-8'>
                  <MapPin className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-500'>
                    {garden.location ||
                      'Genaue Lage bei Besichtigung oder auf Anfrage.'}
                  </p>
                </div>
              </div>
              <p className='mt-4 text-gray-500'>
                Für eine Besichtigung oder weitere Informationen zur Lage
                kontaktieren Sie uns bitte.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle>Interesse an diesem Garten?</CardTitle>
              <CardDescription>
                Kontaktieren Sie uns für eine Besichtigung
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <Badge className='bg-green-600 mb-2'>Verfügbar</Badge>
                  <div className='flex items-center gap-2 mb-1'>
                    <Ruler className='h-4 w-4 text-green-600' />
                    <span className='font-medium'>{garden.size}</span>
                  </div>
                  <div className='flex items-center gap-2 mb-1'>
                    <Calendar className='h-4 w-4 text-green-600' />
                    <span>
                      Verfügbar ab: {garden.availableFrom || 'Sofort'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Info className='h-4 w-4 text-green-600' />
                    <span>{garden.price || 'Preis auf Anfrage'}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-2'>
                <p className='text-sm text-gray-500'>
                  Haben Sie Interesse an diesem Garten oder möchten Sie weitere
                  Informationen erhalten?
                </p>
                <Link href={`/contact?garden=${garden.number}`}>
                  <Button className='w-full bg-green-600 hover:bg-green-700 flex items-center gap-2'>
                    <Mail className='h-4 w-4' />
                    Kontakt aufnehmen
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardTitle>Besichtigungstermine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-500 mb-4'>
                Besichtigungen sind nach Vereinbarung möglich. Kontaktieren Sie
                uns für einen Termin.
              </p>
              <Link href='/contact'>
                <Button variant='outline' className='w-full'>
                  Termin vereinbaren
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='mt-16'>
        <h2 className='text-2xl font-bold tracking-tighter mb-6 text-green-600'>
          Weitere verfügbare Gärten
        </h2>
        <RelatedGardens currentGardenId={garden.id} />
      </div>
    </div>
  );
}
