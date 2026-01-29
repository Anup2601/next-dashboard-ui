import Link from "next/link";
import React from "react";

const AnnouncementsCard = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold ">Announcements</h1>
        <Link href="/announcements" className="text-xs text-gray-400">
          View all
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-anupSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">
              School has reopened for 
            </h2>
            <span className="text-xs text-gray-400 bg-white rounded-full px-2 py-1">
              25/01/2026
            </span>
          </div>
            <p className="text-sm text-gray-400 mt-1">
              Welcome back to school! We are excited to start the new academic
              year with all our students and staff.
            </p>
          </div>
          <div className="bg-anupSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">
              School has reopened for the new academic year
            </h2>
            <span className="text-xs text-gray-500 bg-white rounded-full px-2 py-1">
                25/01/2026
            </span>
          </div>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back to school! We are excited to start the new academic
              year with all our students and staff.
            </p>
        </div>
        <div className="bg-anupSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">
              School has reopened for the new academic year
            </h2>
            <span className="text-xs text-gray-500 bg-white rounded-full px-2 py-1">
              25/01/2026
            </span>
          </div>
            <p className="text-sm text-gray-400 mt-1">
              Welcome back to school! We are excited to start the new academic
              year with all our students and staff.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsCard;
