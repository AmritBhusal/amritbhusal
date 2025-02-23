import React from 'react'
import ProfileCard from './components/Profile/ProfileCard'
import Experience from './components/Experience/Experience'
import ProjectsGrid from './components/Project/ProjectsGrid'
import Education from './components/Education/Education'
import Skills from './components/Skills/Skills'

export const metadata = {
  layout: 'blank'
}

const Port = () => {
  return (
    <div className='w-full mx-auto items-center justify-center flex bg-gray-900'>
      <div className='w-full px-[80px] py-[60px] items-center justify-center flex'>
        <div className='w-full items-start justify-start flex gap-2'>
          <div className='w-[33vw] min-h-screen relative sticky top-0 flex items-start justify-start'>
            <ProfileCard />
          </div>
          <div className='w-[60vw] flex flex-col gap-12 items-start justify-start'>
            <Experience />
            <ProjectsGrid />
            <Education />
            <Skills />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Port
