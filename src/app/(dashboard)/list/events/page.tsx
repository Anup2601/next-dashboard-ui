import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {  eventsData, role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { de } from "zod/locales";


type EventsList = Event & { class: Class} ;

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: EventsList) => (
  <tr
    key={item.id}
    className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className="hidden md:table-cell">{item.class.name}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-IN").format(new Date(item.startTime))}</td>
    <td className="hidden md:table-cell">{item.startTime.toLocaleTimeString("en-IN",{
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}</td>
    <td className="hidden lg:table-cell">{item.endTime.toLocaleTimeString("en-IN",{
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}</td>
    <td>
      <div className="flex items-center gap-2">
        {/* <Link href={`/list/events/${item.id}`}>
          <button className=" size-7 flex items-center justify-center rounded-full bg-anupSky ">
            <Image src="/view.png" alt="View" width={16} height={16} />
          </button>
        </Link> */}
        {role === "admin" && (
          <>
            <FormModal table="events" type="update" data={item} />
            <FormModal table="events" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const EventsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...quaryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARMS Condition

  const quary: Prisma.EventWhereInput = {};

  if (quaryParams) {
    for (const [key, value] of Object.entries(quaryParams)) {
      if (value !== undefined) {
        switch (key) {
            case "search":
              quary.title = { contains: value, mode: "insensitive" };
              break;
            default:
              break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: quary,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.event.count({ where: quary }),
  ]);

  return (
    <div className="bg-white p-4 m-4 rounded-md flex-1 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center ">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="size-8 flex items-center justify-center rounded-full bg-anupYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="size-8 flex items-center justify-center rounded-full bg-anupYellow">
              <Image src="/sort.png" alt="Filter" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="events" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <div className="">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default EventsListPage;
