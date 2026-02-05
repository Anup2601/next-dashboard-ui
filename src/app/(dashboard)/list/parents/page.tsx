import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData, role, studentsData, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Parent={
  id:number;
  name:string;
  students:string[];
  email?:string;
  phone?:string;
  address:string;
}

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

const ParentListPage = () => {

  const renderRow = (item: Parent) => (
    <tr key={item.id} className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.students.join(", ")}</td>
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
      <Table columns={columns} renderRow={renderRow} data={parentsData}/>
      {/* Pagination */}
      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default ParentListPage;
