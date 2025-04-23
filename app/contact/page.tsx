import { Suspense } from 'react';
import ContactForm from '@/components/contact-form';

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactForm />
    </Suspense>
  );
}

function ContactLoading() {
  return (
    <div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
      <div className='flex justify-center py-8'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600'></div>
      </div>
    </div>
  );
}
