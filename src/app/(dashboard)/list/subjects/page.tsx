import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData, subjectsData, teachersData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type SubjectList = Subject & { teachers: Teacher[] } ;
const columns = [
 {
   header:"Subject Name",
   accessor:"name",
 },
 {
    header:"Teacher",
    accessor:"teachers",
    className:"hidden md:table-cell",
 },
 {
  header:"Actions",
  accessor:"actions",

 },
]

const renderRow = (item: SubjectList) => (
    <tr key={item.id} className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight">
      <td className="flex items-center gap-4 p-4">
        {item.name}
      </td>
        <td className="hidden md:table-cell">{item.teachers.map((teacher) => teacher.firstName).join(", ")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role==="admin" &&
          <>
            <FormModal table="subjects" type="update" data={item} />
            <FormModal table="subjects" type="delete" id={item.id} />
          </>
          }
        </div>
      </td>
    </tr>
  )

const SubjectListPage = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) => {
    const { page, ...quaryParams } = searchParams;
  
    const p = page ? parseInt(page) : 1;
  
    const quary: Prisma.SubjectWhereInput = {};
  
    if (quaryParams) {
      for (const [key, value] of Object.entries(quaryParams)) {
        if (value !== undefined) {
          switch (key) {
              case "search":
                quary.name = { contains: value, mode: "insensitive" };
              default:
                break;
          }
        }
      }
    }
    const [data, count] = await prisma.$transaction([
      prisma.subject.findMany({
        where: quary,
        include: {
          teachers: true,
        },
        take: ITEM_PER_PAGE,
        skip: (p - 1) * ITEM_PER_PAGE,
      }),
      prisma.subject.count({ where: quary }),
    ]);

    
  return (
    <div className="bg-white p-4 m-4 rounded-md flex-1 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center ">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
            <FormModal table="subjects" type="create" />
            }
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <div className="">
        <Pagination page={p} count={count}/>
      </div>
    </div>
  );
};

export default SubjectListPage;
