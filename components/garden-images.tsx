import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function GardenImages() {
  // These are placeholder suggestions for garden images
  const imageSources = [
    {
      name: 'Unsplash',
      description: 'Kostenlose hochwertige Bilder',
      url: 'https://unsplash.com/s/photos/garden-allotment',
      categories: ['Kleingarten', 'Gemüsegarten', 'Blumengarten', 'Gartenhaus'],
      license:
        'Unsplash-Lizenz (frei für kommerzielle und nicht-kommerzielle Nutzung)',
    },
    {
      name: 'Pexels',
      description: 'Kostenlose Stock-Fotos und Videos',
      url: 'https://www.pexels.com/search/garden/',
      categories: ['Garten', 'Pflanzen', 'Natur', 'Gartenarbeit'],
      license:
        'Pexels-Lizenz (frei für kommerzielle und nicht-kommerzielle Nutzung)',
    },
    {
      name: 'Pixabay',
      description: 'Kostenlose Bilder und Videos',
      url: 'https://pixabay.com/images/search/garden/',
      categories: ['Garten', 'Gemüse', 'Blumen', 'Gartengeräte'],
      license:
        'Pixabay-Lizenz (frei für kommerzielle und nicht-kommerzielle Nutzung)',
    },
    {
      name: 'Freepik',
      description: 'Grafiken, Vektoren und Fotos',
      url: 'https://www.freepik.com/search?format=search&query=garden',
      categories: [
        'Gartenlayout',
        'Gartendesign',
        'Pflanzen',
        'Gartenelemente',
      ],
      license: 'Freepik-Lizenz (Quellenangabe erforderlich)',
    },
  ];

  // Sample garden images for the website
  const sampleImages = [
    {
      name: 'Gemüsegarten',
      description: 'Ein gepflegter Gemüsegarten mit verschiedenen Beeten',
      placeholder: '/placeholder.svg?height=300&width=400',
    },
    {
      name: 'Gartenlaube',
      description: 'Typische Gartenlaube mit Blumen davor',
      placeholder: '/placeholder.svg?height=300&width=400',
    },
    {
      name: 'Obstbäume',
      description: 'Obstbäume in Blüte im Frühling',
      placeholder: '/placeholder.svg?height=300&width=400',
    },
    {
      name: 'Gartenteich',
      description: 'Kleiner Gartenteich mit Wasserpflanzen',
      placeholder: '/placeholder.svg?height=300&width=400',
    },
    {
      name: 'Beerensträucher',
      description: 'Beerensträucher mit reifen Früchten',
      placeholder: '/placeholder.svg?height=300&width=400',
    },
    {
      name: 'Gartenhaus',
      description: 'Gemütliches Gartenhaus mit Terrasse',
      placeholder: '/placeholder.svg?height=300&width=400',
    },
  ];

  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600'>
          Gartenbilder
        </h1>
        <p className='mt-4 text-gray-500 md:text-xl'>
          Hier finden Sie Vorschläge für Bilder, die Sie für Ihre Gartenwebsite
          verwenden können.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Bildquellen für Gartenfotos</h2>
        <div className='grid gap-6 md:grid-cols-2'>
          {imageSources.map((source, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{source.name}</CardTitle>
                <CardDescription>{source.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-sm font-medium text-gray-500'>
                      Kategorien
                    </h3>
                    <p className='text-sm'>{source.categories.join(', ')}</p>
                  </div>
                  <div>
                    <h3 className='text-sm font-medium text-gray-500'>
                      Lizenz
                    </h3>
                    <p className='text-sm'>{source.license}</p>
                  </div>
                  <a
                    href={source.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block text-green-600 hover:text-green-700 hover:underline'
                  >
                    Bilder ansehen →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-bold mb-6'>
          Beispielbilder für die Website
        </h2>
        <p className='mb-6 text-gray-500'>
          Diese Bilder sollten Sie durch echte Fotos von Ihrer Kleingartenanlage
          ersetzen. Die Platzhalter zeigen, wo welche Art von Bild gut passen
          würde.
        </p>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {sampleImages.map((image, index) => (
            <div
              key={index}
              className='overflow-hidden rounded-lg border bg-white'
            >
              <div className='aspect-video w-full overflow-hidden'>
                <img
                  src={image.placeholder || '/placeholder.svg'}
                  alt={image.name}
                  className='h-full w-full object-cover transition-transform hover:scale-105'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-medium'>{image.name}</h3>
                <p className='text-sm text-gray-500'>{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-green-50 p-6 rounded-lg'>
          <h3 className='text-xl font-semibold text-green-600 mb-4'>
            Tipps für gute Gartenfotos
          </h3>
          <ul className='space-y-2 text-gray-700'>
            <li>
              Fotografieren Sie bei leicht bewölktem Himmel für weiches Licht
              ohne harte Schatten
            </li>
            <li>
              Nutzen Sie die "goldene Stunde" kurz nach Sonnenaufgang oder vor
              Sonnenuntergang
            </li>
            <li>
              Achten Sie auf einen aufgeräumten Hintergrund ohne störende
              Elemente
            </li>
            <li>
              Zeigen Sie Details wie Blüten, Früchte oder besondere
              Gestaltungselemente
            </li>
            <li>
              Fotografieren Sie aus verschiedenen Perspektiven
              (Vogelperspektive, Nahaufnahmen)
            </li>
            <li>
              Stellen Sie sicher, dass die Fotos die Vielfalt und den Charakter
              der Gärten zeigen
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
