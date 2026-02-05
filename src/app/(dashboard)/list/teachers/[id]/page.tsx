import AnnouncementsCard from "@/components/AnnouncementsCard";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleTeacherPage = () => {
  return (
    <div className="flex flex-col flex-1 p-4 gap-4 xl:flex-row">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-4 ">
          {/* User Info Card */}
          <div className="bg-anupSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 ">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=144&h=1200"
                alt="Teacher"
                width={144}
                height={144}
                className="rounded-full object-cover h-36 w-36"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Anup Mishra</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="Email" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="Email" width={14} height={14} />
                  <span>January 2026</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="Email" width={14} height={14} />
                  <span>anupm0873@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="Phone" width={14} height={14} />
                  <span>+91 734567890</span>
                </div>
              </div>
            </div>
          </div>
          {/* Small Card */}
          <div className="flex flex-1 gap-4 justify-between flex-wrap">
            {/* card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[46%] ">
              <Image
                src="/singleAttendance.png"
                alt="Attendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[46%] ">
              <Image
                src="/singleBranch.png"
                alt="Branches"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[46%] ">
              <Image
                src="/singleClass.png"
                alt="Classes"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
            {/* card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[46%] ">
              <Image
                src="/singleLesson.png"
                alt="Lessons"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="font-semibold text-xl">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white p-4 rounded-md h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Shortcuts</h1>
        <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-anupSkyLight" href="/list/teachers">Teacher&apos;s Classes</Link>
            <Link className="p-3 rounded-md bg-anupPurpleLight" href="/list/teachers">Teacher&apos;s Students</Link>
            <Link className="p-3 rounded-md bg-anupYellowLight" href="/list/teachers">Teacher&apos;s Lessons</Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/list/teachers">Teacher&apos;s Exams</Link>
            <Link className="p-3 rounded-md bg-anupSkyLight" href="/list/teachers">Teacher&apos;s Assignments</Link>
        </div>
      </div>
      <Performance />
      <AnnouncementsCard />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
