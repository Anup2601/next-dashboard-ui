import AnnouncementsCard from '@/components/AnnouncementsCard'
import BigCalendar from '@/components/BigCalendar'
import React from 'react'

const ParentsPage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col xl:flex-row gap-4'>
      {/* left */}
      <div className='w-full xl:w-2/3 '>
        <div className='min-h-[110vh] h-full bg-white rounded-lg p-4 '>
          <h2 className='text-xl font-semibold '>Schedule (Anup Kumar)</h2>
          <BigCalendar />
        </div>
      </div>
      {/* right */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8 '>
      {/* <EventCalendar /> */}
        <AnnouncementsCard />
      </div>
    </div>
  )
}

export default ParentsPage;