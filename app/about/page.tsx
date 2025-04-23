import { CalendarDays, Flower, Leaf, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800'>
          Über uns
        </h1>
        <p className='mt-4 text-gray-500 md:text-xl'>
          Lernen Sie unseren Kleingartenverein kennen und erfahren Sie mehr über
          unsere Geschichte und Werte.
        </p>
      </div>

      <div className='grid gap-12'>
        <section className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
          <div>
            <h2 className='text-2xl font-bold tracking-tighter sm:text-3xl text-green-800 mb-4'>
              Unsere Geschichte
            </h2>
            <div className='space-y-4 text-gray-500'>
              <p>
                Der Kleingartenverein "Fort V e.V." wurde im Jahr 1975
                gegründet, als die Stadt ein Stück Land für Kleingärten zur
                Verfügung stellte. Was mit nur 20 Parzellen begann, ist heute zu
                einer blühenden Gemeinschaft mit über 100 Gärten herangewachsen.
              </p>
              <p>
                In den fast 50 Jahren unseres Bestehens haben wir viele
                Veränderungen erlebt, aber unser Grundgedanke ist immer derselbe
                geblieben: Menschen einen Ort zu bieten, an dem sie der Natur
                nahe sein können, eigenes Obst und Gemüse anbauen und Teil einer
                Gemeinschaft sein können.
              </p>
              <p>
                Heute ist unser Verein ein wichtiger Teil des städtischen
                Grüngürtels und trägt zur biologischen Vielfalt und zum
                Umweltschutz bei.
              </p>
            </div>
          </div>
          <div className='flex justify-center'>
            <img
              src='/placeholder.svg?height=400&width=600'
              alt='Historisches Bild des Kleingartenvereins'
              className='rounded-lg object-cover max-h-[400px]'
            />
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-bold tracking-tighter sm:text-3xl text-green-800 mb-6 text-center'>
            Unsere Werte
          </h2>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <Leaf className='h-5 w-5 text-green-800' />
                  Nachhaltigkeit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-500'>
                  Wir fördern umweltfreundliche Gartenpraktiken und biologischen
                  Anbau ohne chemische Pestizide.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <Users className='h-5 w-5 text-green-800' />
                  Gemeinschaft
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-500'>
                  Wir schaffen einen Ort der Begegnung für Menschen aller
                  Generationen und Hintergründe.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <Flower className='h-5 w-5 text-green-800' />
                  Biodiversität
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-500'>
                  Wir setzen uns für die Erhaltung und Förderung der
                  biologischen Vielfalt in unseren Gärten ein.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <CalendarDays className='h-5 w-5 text-green-800' />
                  Tradition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-500'>
                  Wir bewahren die Tradition des Kleingartenwesens und geben
                  Wissen von Generation zu Generation weiter.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
          <div className='order-2 lg:order-1 flex justify-center'>
            <img
              src='/placeholder.svg?height=400&width=600'
              alt='Vorstand des Kleingartenvereins'
              className='rounded-lg object-cover max-h-[400px]'
            />
          </div>
          <div className='order-1 lg:order-2'>
            <h2 className='text-2xl font-bold tracking-tighter sm:text-3xl text-green-800 mb-4'>
              Unser Vorstand
            </h2>
            <div className='space-y-4 text-gray-500'>
              <p>
                Unser Verein wird von einem ehrenamtlichen Vorstand geleitet,
                der alle zwei Jahre von den Mitgliedern gewählt wird. Der
                aktuelle Vorstand besteht aus:
              </p>
              <ul className='list-disc pl-5 space-y-2'>
                <li>Thomas Müller - 1. Vorsitzender</li>
                <li>Sabine Schmidt - 2. Vorsitzende</li>
                <li>Michael Weber - Kassenwart</li>
                <li>Lisa Becker - Schriftführerin</li>
                <li>Klaus Hoffmann - Gartenfachberater</li>
              </ul>
              <p>
                Der Vorstand kümmert sich um die Verwaltung des Vereins,
                organisiert Veranstaltungen und steht den Mitgliedern bei Fragen
                und Problemen zur Seite.
              </p>
            </div>
          </div>
        </section>

        <section className='bg-green-50 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold tracking-tighter sm:text-3xl text-green-800 mb-4 text-center'>
            Mitglied werden
          </h2>
          <p className='text-center text-gray-500 mb-6'>
            Haben Sie Interesse, Teil unserer Gemeinschaft zu werden? Wir freuen
            uns über neue Mitglieder!
          </p>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='bg-white p-4 rounded-lg'>
              <h3 className='font-semibold text-lg mb-2'>
                Vorteile einer Mitgliedschaft
              </h3>
              <ul className='list-disc pl-5 space-y-1 text-gray-500'>
                <li>Möglichkeit, einen eigenen Garten zu pachten</li>
                <li>Teilnahme an Vereinsveranstaltungen</li>
                <li>Zugang zu Fachwissen und Beratung</li>
                <li>Nutzung der Vereinseinrichtungen</li>
                <li>Teil einer aktiven Gemeinschaft sein</li>
              </ul>
            </div>
            <div className='bg-white p-4 rounded-lg'>
              <h3 className='font-semibold text-lg mb-2'>
                So werden Sie Mitglied
              </h3>
              <ol className='list-decimal pl-5 space-y-1 text-gray-500'>
                <li>
                  Kontaktieren Sie uns über das Kontaktformular oder besuchen
                  Sie uns im Vereinsbüro
                </li>
                <li>Vereinbaren Sie einen Termin zur Besichtigung</li>
                <li>Füllen Sie den Mitgliedsantrag aus</li>
                <li>Nach Genehmigung durch den Vorstand werden Sie Mitglied</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
