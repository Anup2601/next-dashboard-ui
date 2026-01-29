"use client";

import { time } from "console";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Science Fair",
    time: "10:00 AM - 2:00 PM",
    description: "Annual science exhibition showcasing student projects.",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    time: "3:00 PM - 5:00 PM",
    description: "Discuss student progress and address concerns with parents.",
  },
  {
    id: 3,
    title: "Sports Day",
    time: "9:00 AM - 4:00 PM",
    description: "A day filled with athletic competitions and fun activities.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div key={event.id} className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-anupPurple even:border-anupSky">
            <div className="flex items-center justify-between">
              <h1 className="text-gray-600 font-semibold">{event.title}</h1>
              <span className="text-xs text-gray-300">{event.time}</span>
            </div>
              <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
