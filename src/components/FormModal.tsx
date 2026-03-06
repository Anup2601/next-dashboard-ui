'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import dynamic from 'next/dynamic';

const TeacherForm = dynamic(() => import('./forms/TeacherForm'));
const StudentForm = dynamic(() => import('./forms/StudentForm'));

const forms:{
  [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element;
} = {
  teachers: (type, data) => <TeacherForm type={type} data={data} />,
  students: (type, data) => <StudentForm type={type} data={data} />,
}

const FormModal = ({table, type, data, id}:{
    table:  |'students' 
            | 'teachers' 
            | 'courses' 
            | 'classes' 
            | 'subjects'
            | 'parents'
            | 'exams'
            | 'lessons'
            | 'assignments'
            | 'attendance'
            | 'results'
            | 'announcements'
            | 'events';
    type: 'create' | 'update' | 'delete';
    data?: any;
    id?: number;
}) => {
    const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7';
    const bgColor = type === 'create' ? 'bg-anupYellow' : type === 'update' ? 'bg-anupSky' : 'bg-anupPurple';

    const [open, setOpen] = useState(false);

    const Form = ()=> {
      return type==="delete" && id ?(
        <form action="" className='p-4 flex flex-col gap-4'>
          <span className='text-center font-medium'>All the data related to this {table} will be deleted. Are you sure you want to delete this {table}?</span>
          <button className='bg-red-600 text-white rounded-md py-2 px-4 border-none w-max self-center'>Delete</button>
        </form>
      ): type=== "create" || type === "update" ? (
        forms[table](type, data)
      ) : "Form not found!"
    }
  return (
    <>
      <button className={`flex items-center justify-center ${size} ${bgColor} rounded-full hover:scale-105 transition-transform`} onClick={() => setOpen(true)}>
        <Image src={`/${type}.png`} alt={`${type} ${table}`} width={16} height={16} /> 
      </button>
      {open && (
        <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
          <div className='bg-white rounded-md p-4 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] '>
            <Form />
            <div className='top-4 right-4 absolute cursor-pointer'>
              <Image src="/close.png" alt="Close" width={14} height={14} className='cursor-pointer mb-4' onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormModal