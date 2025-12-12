import ProfileSection from '@/components/Intro/ProfileSection'
import React from 'react'


const page = () => {
  return (
    <div className="w-full bg-[#0d1117] min-h-screen">
      <div className="w-full flex flex-col items-center">
        {/* GitHub Profile Style Layout */}
        <div className="w-full" id="home">
          <ProfileSection />
        </div>
      </div>
    </div>
  );
}

export default page
