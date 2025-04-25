import { fetchGardens, getAssetUrl } from '@/lib/contentful';
import GardensClient from './gardens-client';
import { HeroTeaser } from '@/components/hero-teaser';

export default async function GardensPage() {
  const contentfulGardens = await fetchGardens();

  const gardens = contentfulGardens.map((garden) => ({
    id: garden.sys.id,
    number: garden.fields.titel || 'Unnamed Garden',
    size: String(garden.fields.size || 0),
    features: garden.fields.ausstattungsmerkmale || [],
    available: garden.fields.availability || false,
    image:
      garden.fields.bilder && garden.fields.bilder.length > 0
        ? getAssetUrl(garden.fields.bilder[0])
        : '/placeholder.svg',
    description: garden.fields.description || '',
  }));

  return (
    <>
      <HeroTeaser
        title='Freie Gärten'
        description='Entdecken Sie unsere verfügbaren Gärten und filtern Sie nach Ihren Wünschen.'
        imageSrc='/about-hero.jpg'
        imageAlt='Gartenanlage mit Beeten und Pflanzen'
        mobileHeight='250px'
        desktopHeight='350px'
      />
      <GardensClient gardens={gardens} />
    </>
  );
}
