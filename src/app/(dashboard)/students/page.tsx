import AnnouncementsCard from '@/components/AnnouncementsCard'
import BigCalendar from '@/components/BigCalendar'
import EventCalendar from '@/components/EventCalendar'
import React from 'react'

const StudentsPage = () => {
  return (
    <div className='p-4 flex flex-col xl:flex-row gap-4'>
      {/* left */}
      <div className='w-full xl:w-2/3 '>
        <div className='h-full bg-white rounded-lg p-4 '>
          <h2 className='text-xl font-semibold '>Schedule 4(A)</h2>
          <BigCalendar />
        </div>
      </div>
      {/* right */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8 '>
        <EventCalendar />
        <AnnouncementsCard />
      </div>
    </div>
  )
}

export default StudentsPage