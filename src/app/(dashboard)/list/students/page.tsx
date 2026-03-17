import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type StudentList = Student & { class: Class} ; 

const columns = [
 {
   header:"Info",
   accessor:"info",
 },
 {
    header:"Student ID",
    accessor:"studentId",
    className:"hidden md:table-cell",
 },
 {
    header:"Grade",
    accessor:"grade",
    className:"hidden md:table-cell",
 },
//  {
//     header:"Class",
//     accessor:"class",
//     className:"hidden md:table-cell",
//  },
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

const renderRow = (item: StudentList) => (
  <tr key={item.id} className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight">
    <td className="flex items-center gap-4 p-4">
      <Image src={item.img || "/noAvatar.png"} alt={item.firstName} width={40} height={40} className="md:hidden xl:block size-10 rounded-full object-cover"/>
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.firstName || "N/A"} </h3>
        <p className="text-sm text-gray-500">{item.class.name  || "N/A"}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username || "N/A"}</td>
    <td className="hidden md:table-cell">{item.class.name[0]  || "N/A"}</td>
    <td className="hidden lg:table-cell">{item.phone || "N/A"}</td>
    <td className="hidden lg:table-cell">{item.address || "N/A"}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/students/${item.id}`} >
        <button className=" size-7 flex items-center justify-center rounded-full bg-anupSky ">
          <Image src="/view.png" alt="View" width={16} height={16} />
        </button>
        </Link>
        {role==="admin" &&
        // 
        <FormModal table="students" type="delete" />
        }
      </div>
    </td>
  </tr>
);

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...quaryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARMS Condition

  const quary: Prisma.StudentWhereInput = {};

  if (quaryParams) {
    for (const [key, value] of Object.entries(quaryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            quary.class = {
              lessons: {
                  some: {
                      teacherId: (value),
                  }
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
    prisma.student.findMany({
      where: quary,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.student.count({ where: quary }),
  ]);
  
  return (
    <div className="bg-white p-4 m-4 rounded-md flex-1 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center ">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
            // 
            <FormModal table="students" type="create" />
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

export default StudentListPage;
