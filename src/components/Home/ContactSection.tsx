import React from 'react';
import ContactForm from '@/components/Contact/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-sm text-[#a89984]">
          <span className="text-term-green">[amrit@arch ~]</span>${' '}
          <span className="text-[#fbf1c7]">./contact.sh --start</span>
        </p>
        <h2 className="mb-2 text-3xl font-bold text-[#fbf1c7] md:text-4xl">
          Got something to build?
        </h2>
        <p className="mb-6 max-w-xl text-[#a89984]">
          Tell me what you&apos;re working on. I read every message and usually reply within a day.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
