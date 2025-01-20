import About from '@/components/About/About'
import Intro from '@/components/Intro/intro'
import Portfolio from '@/components/Portfolio/Portfolio'
import Technology from '@/components/Technology/Technology'
import React from 'react'


const page = () => {
  return (
    <div className='w-full flex items-center justify-center md:p-4'>
      <div className='w-[95%] gap-10 flex flex-col items-center justify-center lg:p-6'>
        <Intro />

        <About />

        <Technology />
        
        <Portfolio />
      </div>
    </div>
  )
}

export default page
