import ContactForm from '@/components/Contact/ContactForm'
import ProfileSection from '@/components/Intro/ProfileSection'
import Portfolio from '@/components/Portfolio/Portfolio'
import Technology from '@/components/Technology/Technology'
import React from 'react'


const page = () => {
  return (
    <div className="w-full bg-[#0d1117] min-h-screen">
      <div className="w-full flex flex-col items-center">

        {/* Profile Section (Combines Intro + About) */}
        <div className="w-full flex justify-center border-b border-[#30363d]" id="home">
          <ProfileSection />
        </div>

        {/* Portfolio/Projects Section */}
        <div className="w-full flex items-center justify-center py-8 border-b border-[#30363d]" id="portfolio">
          <Portfolio />
        </div>
{/* Technology/Stats Section */}
        <div
          className="w-full flex items-center justify-center py-8 border-b border-[#30363d]"
          id="technology"
        >
          <Technology />
        </div>
        {/* Contact Section */}
        <div className="w-full flex items-center justify-center py-8" id="contact">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default page
