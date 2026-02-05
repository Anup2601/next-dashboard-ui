import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, lessonsData, role, studentsData, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Lesson={
  id:number;
  subject:string;
  class:number;
  teacher:string;
}

const columns = [
 {
   header:"Subject Name",
   accessor:"subject",
 },
 {
    header:"Class",
    accessor:"class",
    className:"hidden md:table-cell",
 },
 {
    header:"Teacher",
    accessor:"teacher",
    className:"hidden md:table-cell",
 },
 {
  header:"Actions",
  accessor:"actions",

 },
]

const LessonListPage = () => {

  const renderRow = (item: Lesson) => (
    <tr key={item.id} className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight">
      <td className="flex items-center gap-4 p-4">
        {item.subject}
      </td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/lessons/${item.id}`} >
          <button className=" size-7 flex items-center justify-center rounded-full bg-anupSky ">
            <Image src="/view.png" alt="View" width={16} height={16} />
          </button>
          </Link> */}
          {role==="admin" &&
          <>
            <FormModal table="lessons" type="update" data={item} />
            <FormModal table="lessons" type="delete" id={item.id} />
          </>
          }
        </div>
      </td>
    </tr>
  )
  return (
    <div className="bg-white p-4 m-4 rounded-md flex-1 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center ">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
            <FormModal table="lessons" type="create" />
            }
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={lessonsData}/>
      {/* Pagination */}
      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default   LessonListPage;
