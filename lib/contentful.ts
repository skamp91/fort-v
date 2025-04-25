import { createClient } from 'contentful';

// Define types for Contentful responses
export interface ContentfulGarden {
  sys: {
    id: string;
  };
  fields: {
    titel: string;
    description: string;
    bilder: ContentfulAsset[];
    availability: boolean;
    size: number;
    ausstattungsmerkmale: string[];
  };
  contentTypeId: string; // Added to satisfy EntrySkeletonType constraint
}

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

// Define the Contentful space ID and access token
// For client components, we need to use NEXT_PUBLIC_ prefix
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

// Check if the required environment variables are available
if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  console.error(
    'Contentful environment variables are missing. Using mock data instead.',
  );
}

// Create Contentful client only if environment variables are available
const contentfulClient =
  CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN
    ? createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
      })
    : null;

// Function to fetch all gardens
export async function fetchGardens() {
  try {
    if (!contentfulClient) {
      console.error('Contentful client not initialized. Using mock data.');
      return getMockGardens();
    }

    // Verwende den spezifischen Content-Type "freierGarten"
    // console.log('Fetching gardens with content type: freierGarten');
    const response = await contentfulClient.getEntries<ContentfulGarden>({
      content_type: 'freierGarten',
    });

    // console.log('Contentful response:', response);

    if (response.items.length === 0) {
      console.warn('No gardens found in Contentful. Using mock data.');
      return getMockGardens();
    }

    return response.items;
  } catch (error) {
    console.error('Error fetching gardens from Contentful:', error);
    return getMockGardens();
  }
}

// Function to fetch a single garden by ID
export async function fetchGardenById(id: string) {
  try {
    if (!contentfulClient) {
      console.error('Contentful client not initialized. Using mock data.');
      return getMockGardenById(id);
    }

    const garden = await contentfulClient.getEntry<ContentfulGarden>(id);
    return garden;
  } catch (error) {
    console.error(
      `Error fetching garden with ID ${id} from Contentful:`,
      error,
    );
    return getMockGardenById(id);
  }
}

// Function to fetch available gardens
export async function fetchAvailableGardens() {
  try {
    // First, get all gardens
    const gardens = await fetchGardens();

    // Then filter for available gardens
    return gardens.filter((garden) => {
      const contentfulGarden = garden as unknown as ContentfulGarden;
      return contentfulGarden.fields.availability === true;
    });
  } catch (error) {
    console.error('Error fetching available gardens from Contentful:', error);
    return getMockGardens().filter((garden) => {
      const contentfulGarden = garden as unknown as ContentfulGarden;
      return contentfulGarden.fields.availability === true;
    });
  }
}

// Helper function to get the full URL for Contentful assets
export function getAssetUrl(asset: ContentfulAsset) {
  return `https:${asset.fields.file.url}`;
}

// Mock data functions
function getMockGardens() {
  // Create mock gardens that match the Contentful structure
  return [
    {
      sys: { id: '1' },
      fields: {
        titel: 'A-15',
        description:
          'Schöner Garten mit altem Baumbestand und einer gut erhaltenen Laube.',
        ausstattungsmerkmale: [
          'Laube',
          'Wasseranschluss',
          'Obstbäume',
          'Südausrichtung',
          'Teilweise Schatten',
        ],
        availability: true,
        size: 250,
        bilder: [
          {
            sys: { id: 'img1' },
            fields: {
              title: 'Garden Image',
              description: 'Garden Image',
              file: {
                url: '/images/garden-fruit-trees.jpg',
                details: { size: 1000, image: { width: 800, height: 600 } },
                fileName: 'garden-fruit-trees.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
        ],
      },
    },
    {
      sys: { id: '2' },
      fields: {
        titel: 'B-07',
        description:
          'Großzügiger Garten mit solidem Gartenhaus (20m²), Stromanschluss und einem kleinen Gewächshaus.',
        ausstattungsmerkmale: [
          'Gartenhaus',
          'Stromanschluss',
          'Gewächshaus',
          'Westausrichtung',
          'Wassertank',
        ],
        availability: true,
        size: 300,
        bilder: [
          {
            sys: { id: 'img2' },
            fields: {
              title: 'Garden Image',
              description: 'Garden Image',
              file: {
                url: '/images/garden-house.jpg',
                details: { size: 1000, image: { width: 800, height: 600 } },
                fileName: 'garden-house.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
        ],
      },
    },
    {
      sys: { id: '3' },
      fields: {
        titel: 'C-22',
        description:
          'Gepflegter Garten mit vielen Beerensträuchern und einer einfachen Laube.',
        ausstattungsmerkmale: [
          'Laube',
          'Wasseranschluss',
          'Beerensträucher',
          'Ostausrichtung',
          'Ebenes Gelände',
        ],
        availability: true,
        size: 280,
        bilder: [
          {
            sys: { id: 'img3' },
            fields: {
              title: 'Garden Image',
              description: 'Garden Image',
              file: {
                url: '/images/garden-berries.jpg',
                details: { size: 1000, image: { width: 800, height: 600 } },
                fileName: 'garden-berries.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
        ],
      },
    },
    {
      sys: { id: '4' },
      fields: {
        titel: 'D-05',
        description:
          'Besonders schöner Garten mit einem kleinen Teich, Gartenhaus mit Strom- und Wasseranschluss.',
        ausstattungsmerkmale: [
          'Gartenhaus',
          'Stromanschluss',
          'Wasseranschluss',
          'Teich',
          'Südwestausrichtung',
        ],
        availability: true,
        size: 320,
        bilder: [
          {
            sys: { id: 'img4' },
            fields: {
              title: 'Garden Image',
              description: 'Garden Image',
              file: {
                url: '/images/garden-pond.jpg',
                details: { size: 1000, image: { width: 800, height: 600 } },
                fileName: 'garden-pond.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
        ],
      },
    },
    {
      sys: { id: '5' },
      fields: {
        titel: 'E-11',
        description:
          'Kleiner, überschaubarer Garten mit einfacher Laube und Wasseranschluss.',
        ausstattungsmerkmale: [
          'Laube',
          'Wasseranschluss',
          'Nordausrichtung',
          'Ebenes Gelände',
        ],
        availability: true,
        size: 200,
        bilder: [
          {
            sys: { id: 'img5' },
            fields: {
              title: 'Garden Image',
              description: 'Garden Image',
              file: {
                url: '/images/garden-vegetable.jpg',
                details: { size: 1000, image: { width: 800, height: 600 } },
                fileName: 'garden-vegetable.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
        ],
      },
    },
  ];
}

function getMockGardenById(id: string) {
  const gardens = getMockGardens();
  return gardens.find((garden) => garden.sys.id === id) || null;
}

// Function to fetch events (placeholder for future implementation)
export async function fetchEvents() {
  // This is a placeholder for future implementation
  return [];
}

// Function to fetch page content (placeholder for future implementation)
export async function fetchPageContent(slug: string) {
  // This is a placeholder for future implementation
  return [];
}
