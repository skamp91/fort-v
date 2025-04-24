import {
  CalendarDays,
  Flower,
  Leaf,
  Users,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { UIImage } from '@/components/ui-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { HeroTeaser } from '@/components/hero-teaser';

export default function AboutPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section */}
      <HeroTeaser
        title='Unsere Gemeinschaft'
        description='Seit 1975 schaffen wir einen Ort, an dem Menschen zusammenkommen, um die Freude am Gärtnern zu teilen und gemeinsam eine grüne Oase in der Stadt zu gestalten.'
        imageSrc='/about-hero.jpg'
        imageAlt='Gartengemeinschaft'
      >
        <div className='flex flex-wrap gap-4'>
          <Button className='bg-white text-green-800 hover:bg-green-50'>
            <Link href='/contact' className='flex items-center gap-2'>
              Mitglied werden
            </Link>
          </Button>
          <Button
            variant='outline'
            className='bg-white/10 text-white border-white/20 hover:bg-white/20'
          >
            <Link href='/gardens' className='flex items-center gap-2'>
              Gärten entdecken
            </Link>
          </Button>
        </div>
      </HeroTeaser>

      {/* History Section */}
      <section className='py-16 md:py-24 bg-white'>
        <div className='container px-4'>
          <div className='grid gap-12 md:grid-cols-2 items-center'>
            <div className='order-2 md:order-1'>
              <div className='relative'>
                <UIImage
                  src='/girl-watering-flowers.png'
                  alt='Geschichte des Kleingartenvereins'
                  aspectRatio='square'
                  rounded='lg'
                  className='shadow-lg'
                />
                <div className='absolute -bottom-6 -right-6 bg-green-800 text-white p-4 rounded-lg shadow-lg hidden md:block'>
                  <p className='text-3xl font-bold'>49</p>
                  <p className='text-sm'>Jahre Tradition</p>
                </div>
              </div>
            </div>
            <div className='order-1 md:order-2'>
              <div className='inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4'>
                Unsere Geschichte
              </div>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-6'>
                Von kleinen Anfängen zu einer blühenden Gemeinschaft
              </h2>
              <div className='space-y-4 text-gray-600'>
                <p>
                  Der Kleingartenverein "Grüne Oase" wurde im Jahr 1975
                  gegründet, als die Stadt ein Stück Land für Kleingärten zur
                  Verfügung stellte. Was mit nur 20 Parzellen begann, ist heute
                  zu einer blühenden Gemeinschaft mit über 100 Gärten
                  herangewachsen.
                </p>
                <p>
                  In den fast 50 Jahren unseres Bestehens haben wir viele
                  Veränderungen erlebt, aber unser Grundgedanke ist immer
                  derselbe geblieben: Menschen einen Ort zu bieten, an dem sie
                  der Natur nahe sein können, eigenes Obst und Gemüse anbauen
                  und Teil einer Gemeinschaft sein können.
                </p>
                <p>
                  Heute ist unser Verein ein wichtiger Teil des städtischen
                  Grüngürtels und trägt zur biologischen Vielfalt und zum
                  Umweltschutz bei.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 md:py-24 bg-gray-50'>
        <div className='container px-4'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <div className='inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4'>
              Unsere Werte
            </div>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-6'>
              Wofür wir stehen
            </h2>
            <p className='text-xl text-gray-600'>
              Unsere Werte bilden das Fundament unserer Gemeinschaft und leiten
              unser Handeln im Alltag.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='border-none shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader className='pb-2'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                  <Leaf className='h-6 w-6 text-green-800' />
                </div>
                <CardTitle className='text-xl'>Nachhaltigkeit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Wir fördern umweltfreundliche Gartenpraktiken und biologischen
                  Anbau ohne chemische Pestizide.
                </p>
              </CardContent>
            </Card>
            <Card className='border-none shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader className='pb-2'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                  <Users className='h-6 w-6 text-green-800' />
                </div>
                <CardTitle className='text-xl'>Gemeinschaft</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Wir schaffen einen Ort der Begegnung für Menschen aller
                  Generationen und Hintergründe.
                </p>
              </CardContent>
            </Card>
            <Card className='border-none shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader className='pb-2'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                  <Flower className='h-6 w-6 text-green-800' />
                </div>
                <CardTitle className='text-xl'>Biodiversität</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Wir setzen uns für die Erhaltung und Förderung der
                  biologischen Vielfalt in unseren Gärten ein.
                </p>
              </CardContent>
            </Card>
            <Card className='border-none shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader className='pb-2'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                  <CalendarDays className='h-6 w-6 text-green-800' />
                </div>
                <CardTitle className='text-xl'>Tradition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Wir bewahren die Tradition des Kleingartenwesens und geben
                  Wissen von Generation zu Generation weiter.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Board Section */}
      <section className='py-16 md:py-24 bg-white'>
        <div className='container px-4'>
          <div className='grid gap-12 md:grid-cols-2 items-center'>
            <div>
              <div className='inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4'>
                Unser Team
              </div>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-6'>
                Der Vorstand
              </h2>
              <div className='space-y-4 text-gray-600'>
                <p>
                  Unser Verein wird von einem ehrenamtlichen Vorstand geleitet,
                  der alle zwei Jahre von den Mitgliedern gewählt wird. Der
                  aktuelle Vorstand besteht aus:
                </p>
                <ul className='space-y-4'>
                  {[
                    { name: 'Thomas Müller', role: '1. Vorsitzender' },
                    { name: 'Sabine Schmidt', role: '2. Vorsitzende' },
                    { name: 'Michael Weber', role: 'Kassenwart' },
                    { name: 'Lisa Becker', role: 'Schriftführerin' },
                    { name: 'Klaus Hoffmann', role: 'Gartenfachberater' },
                  ].map((member, index) => (
                    <li key={index} className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <span className='text-green-800 font-medium'>
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className='font-medium text-gray-900'>
                          {member.name}
                        </p>
                        <p className='text-sm text-gray-500'>{member.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p>
                  Der Vorstand kümmert sich um die Verwaltung des Vereins,
                  organisiert Veranstaltungen und steht den Mitgliedern bei
                  Fragen und Problemen zur Seite.
                </p>
              </div>
            </div>
            <div>
              <UIImage
                src='/images/about-board.jpg'
                alt='Vorstand des Kleingartenvereins'
                aspectRatio='square'
                rounded='lg'
                className='shadow-lg'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className='py-16 md:py-24 bg-green-800 text-white'>
        <div className='container px-4'>
          <div className='grid gap-12 md:grid-cols-2 items-center'>
            <div>
              <UIImage
                src='/images/about-community.jpg'
                alt='Gartengemeinschaft'
                aspectRatio='square'
                rounded='lg'
                className='shadow-lg'
              />
            </div>
            <div>
              <div className='inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4'>
                Mitmachen
              </div>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-6'>
                Werden Sie Teil unserer Gemeinschaft
              </h2>
              <div className='space-y-4 text-white/80'>
                <p>
                  Haben Sie Interesse, Teil unserer Gemeinschaft zu werden? Wir
                  freuen uns über neue Mitglieder!
                </p>
                <div className='bg-white/10 p-6 rounded-lg backdrop-blur-sm'>
                  <h3 className='font-semibold text-lg mb-4 text-white'>
                    Vorteile einer Mitgliedschaft
                  </h3>
                  <ul className='space-y-2'>
                    {[
                      'Möglichkeit, einen eigenen Garten zu pachten',
                      'Teilnahme an Vereinsveranstaltungen',
                      'Zugang zu Fachwissen und Beratung',
                      'Nutzung der Vereinseinrichtungen',
                      'Teil einer aktiven Gemeinschaft sein',
                    ].map((benefit, index) => (
                      <li key={index} className='flex items-start gap-2'>
                        <Heart className='h-5 w-5 text-green-300 mt-0.5 flex-shrink-0' />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='mt-8'>
                  <Button className='bg-white text-green-800 hover:bg-green-50'>
                    <Link href='/contact' className='flex items-center gap-2'>
                      Jetzt Mitglied werden <ChevronRight className='h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
