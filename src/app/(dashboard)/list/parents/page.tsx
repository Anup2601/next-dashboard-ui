import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Student } from "@/types/student";
import { Parents, Prisma } from "@prisma/client";
import Image from "next/image";

type ParentList = Parents & { students: Student[] } ;

const columns = [
 {
   header:"Info",
   accessor:"info",
 },
 {
    header:"Student Names",
    accessor:"students",
    className:"hidden md:table-cell",
 },
 {
    header:"Phone",
    accessor:"phone",
    className:"hidden lg:table-cell",
 },
 {
    header:"Address",
    accessor:"address",
    className:"hidden lg:table-cell",
 },
 {
  header:"Actions",
  accessor:"actions",

 },
]

const renderRow = (item: ParentList) => (
  <tr key={item.id} className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight">
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.firstName}</h3>
        <p className="text-sm text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.students.map(student=> student.firstName).join(", ")}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        
        {role==="admin" &&
        <>
        <FormModal table="parents" type="update" data={item} />
        <FormModal table="parents" type="delete" id={item.id} />
        </>
        }
      </div>
    </td>
  </tr>
)

const ParentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...quaryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARMS Condition

  const quary: Prisma.ParentsWhereInput = {};

  if (quaryParams) {
    for (const [key, value] of Object.entries(quaryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            quary.students = {
              some: {
                classId: parseInt(value),
              },
            };
            break;
            case "search":
              quary.firstName = { contains: value, mode: "insensitive" };
            default:
              break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.parents.findMany({
      where: quary,
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.parents.count({ where: quary }),
  ]);
  
  return (
    <div className="bg-white p-4 m-4 rounded-md flex-1 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center ">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="size-8 flex items-center justify-center rounded-full bg-anupYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="size-8 flex items-center justify-center rounded-full bg-anupYellow">
              <Image src="/sort.png" alt="Filter" width={14} height={14} />
            </button>
            {role==="admin" &&
            <FormModal table="parents" type="create" />
            }
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data}/>
      {/* Pagination */}
      <div className="">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default ParentListPage;
