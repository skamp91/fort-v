'use client';

import type React from 'react';

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, this would send the form data to a server
      // For demo purposes, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Nachricht gesendet',
        description:
          'Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Fehler',
        description:
          'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <div className='mx-auto max-w-4xl'>
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800'>
            Kontakt
          </h1>
          <p className='mt-4 text-gray-500 md:text-xl'>
            Haben Sie Fragen oder Interesse an einem Garten? Kontaktieren Sie
            uns gerne.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Kontaktformular</CardTitle>
              <CardDescription>
                Füllen Sie das Formular aus und wir melden uns bei Ihnen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    name='name'
                    placeholder='Ihr Name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>E-Mail</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='ihre-email@beispiel.de'
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='subject'>Betreff</Label>
                  <Input
                    id='subject'
                    name='subject'
                    placeholder='Betreff Ihrer Nachricht'
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='message'>Nachricht</Label>
                  <Textarea
                    id='message'
                    name='message'
                    placeholder='Ihre Nachricht an uns'
                    required
                    className='min-h-[120px]'
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full bg-green-600 hover:bg-green-700'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Kontaktinformationen</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-start space-x-4'>
                  <MapPin className='h-5 w-5 text-green-800 mt-0.5' />
                  <div>
                    <h3 className='font-medium'>Adresse</h3>
                    <p className='text-sm text-gray-500'>
                      Kleingartenverein Fort V e.V. e.V.
                      <br />
                      Gartenweg 123
                      <br />
                      12345 Musterstadt
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-4'>
                  <Phone className='h-5 w-5 text-green-800 mt-0.5' />
                  <div>
                    <h3 className='font-medium'>Telefon</h3>
                    <p className='text-sm text-gray-500'>+49 123 456789</p>
                    <p className='text-xs text-gray-500'>
                      Erreichbar: Mo-Fr, 10-16 Uhr
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-4'>
                  <Mail className='h-5 w-5 text-green-800 mt-0.5' />
                  <div>
                    <h3 className='font-medium'>E-Mail</h3>
                    <p className='text-sm text-gray-500'>
                      info@gruene-oase-verein.de
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Öffnungszeiten Vereinsbüro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>Montag</span>
                    <span>10:00 - 12:00 Uhr</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Mittwoch</span>
                    <span>14:00 - 16:00 Uhr</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Freitag</span>
                    <span>10:00 - 12:00 Uhr</span>
                  </div>
                  <div className='text-sm text-gray-500 mt-4'>
                    An Feiertagen und in den Wintermonaten (November-Februar)
                    können abweichende Öffnungszeiten gelten.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
