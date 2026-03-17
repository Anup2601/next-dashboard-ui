import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role} from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Teacher } from "@prisma/client";
import Image from "next/image";

type ClassesList= Class & { supervisor: Teacher} ;

const columns = [
 {
   header:"Class Name",
   accessor:"name",
 },
 {
    header:"Capacity",
    accessor:"capacity",
    className:"hidden md:table-cell",
 },
 {
    header:"Grade",
    accessor:"grade",
    className:"hidden md:table-cell",
 },
 {
    header:"Supervisor",
    accessor:"supervisor",
    className:"hidden lg:table-cell",
 },
 {
  header:"Actions",
  accessor:"actions",

 },
]

const renderRow = (item: ClassesList) => (
  <tr key={item.id} className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight">
    <td className="flex items-center gap-4 p-4">
      {item.name}
    </td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">{item.name[0]}</td>
    <td className="hidden lg:table-cell">{item.supervisor.firstName + " " + item.supervisor.lastName}</td>
    <td>
      <div className="flex items-center gap-2">
        {/* <Link href={`/list/classes/${item.id}`} >
        <button className=" size-7 flex items-center justify-center rounded-full bg-anupSky ">
          <Image src="/view.png" alt="View" width={16} height={16} />
        </button>
        </Link> */}
        {role==="admin" &&
        <>
          <FormModal table="classes" type="update" data={item} />
          <FormModal table="classes" type="delete" id={item.id} />
        </>
        }
      </div>
    </td>
  </tr>
)

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...quaryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARMS Condition

  const quary: Prisma.ClassWhereInput = {};

  if (quaryParams) {
    for (const [key, value] of Object.entries(quaryParams)) {
      if (value !== undefined) {
        switch (key) {
            case "supervisorId":
              quary.supervisorId = value;
            break;
            case "search":
              quary.name = { contains: value, mode: "insensitive" };
            default:
              break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: quary,
      include: {
        students: true,
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.class.count({ where: quary }),
  ]);
  
  return (
    <div className="bg-white p-4 m-4 rounded-md flex-1 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center ">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
            <FormModal table="classes" type="create" />
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

export default   ClassListPage;
