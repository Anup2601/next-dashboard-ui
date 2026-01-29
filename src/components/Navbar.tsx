import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
        {/* search bar */}
        <div className='hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full ring-1 ring-gray-300 shadow-sm w-[300px]'>
            <Image
                src="/search.png"
                alt="Search Icon"
                width={14}
                height={14}
            />
            <input type='text' placeholder='Search...' className='bg-transparent outline-none'/>
        </div>
        <div className='flex items-center gap-6 justify-end w-full'>
            <div className='bg-white rounded-full size-7 flex items-center justify-center cursor-pointer relative'>
                <Image src="/message.png" alt="Messages" width={20} height={20}/>
                <div className='absolute -top-3 -right-3 size-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>4</div>
            </div>
            <div className='bg-white rounded-full size-7 flex items-center justify-center cursor-pointer relative'>
                <Image src="/announcement.png" alt="Announcements" width={20} height={20}/>
                <div className='absolute -top-3 -right-3 size-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>12</div>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm leading-3 font-medium'>Anup Mishra</span>
                <span className='text-xs text-right text-gray-500'>Admin</span>
            </div>
                <Image src="/avatar.png" alt="Profile Picture" width={36} height={36} className='rounded-full'/>
        </div>
    </div>
  )
}

export default Navbar