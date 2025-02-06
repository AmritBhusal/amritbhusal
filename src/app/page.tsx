import About from '@/components/About/About'
import ContactForm from '@/components/Contact/ContactForm'
import Intro from '@/components/Intro/intro'
import Portfolio from '@/components/Portfolio/Portfolio'
import Technology from '@/components/Technology/Technology'
import React from 'react'


const page = () => {
  return (
    <div className='w-full flex items-center justify-center md:p-4'>
      <div className='w-[95%] gap-10 flex flex-col items-center justify-center lg:p-6'>
        <div className="w-full flex items-center justify-center" id='home'>
          <Intro />
        </div>

        <div className="w-full flex items-center justify-center" id='about'>
          <About />
        </div>

        <div className="w-full flex items-center justify-center" id='technology'>
          <Technology />
        </div>
        
        <div className="w-full flex items-center justify-center" id='portfolio'>
          <Portfolio />
        </div>        

        <div className="w-full flex items-center justify-center" id='contact'>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default page
