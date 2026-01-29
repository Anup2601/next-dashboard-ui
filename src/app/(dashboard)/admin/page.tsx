import UserCard from '@/components/UserCard'
import React from 'react'
import CountChart from '../../../components/CountChart';
import AttendanceChart from '@/components/AttendanceChart';
import FinanceChart from '@/components/FinanceChart';
import EventCalendar from '@/components/EventCalendar';
import AnnouncementsCard from '@/components/AnnouncementsCard';

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row '>
      {/* left section */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* User card */}
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type='student'/>
          <UserCard type='teacher'/>
          <UserCard type='parent'/>
          <UserCard type='staff'/>
        </div>
        {/* middle charts */}
        <div className='flex gap-4 flex-col lg:flex-row '>
          {/* count chart */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart />
          </div>
          {/* Attendance chart */}
          <div className='w-full lg:w-2/3 h-[450px]'>
          <AttendanceChart />
          </div>
        </div>
        {/* bottom charts */}
        <div className=''>
          <FinanceChart />
        </div>
      </div>
      {/* right section */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendar />
        <AnnouncementsCard />
      </div>
    </div>
  )
}

export default AdminPage