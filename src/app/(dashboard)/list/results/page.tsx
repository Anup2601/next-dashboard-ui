import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, resultsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import ClassListPage from "../classes/page";
import FormModal from "@/components/FormModal";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import { start } from "repl";
import { fi } from "zod/locales";

type ResultsList ={
  id: number;
  title: string;
  student: string;
  score: number;
  teacher: string;
  class: string;
  startTime: Date;
  endTime: Date;
}

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: ResultsList) => (
  <tr
    key={item.id}
    className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-anupPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className="hidden md:table-cell">{item.student}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">{item.teacher}</td>
    <td className="hidden lg:table-cell">{item.class}</td>
    <td className="hidden lg:table-cell">{new Intl.DateTimeFormat("en-IN").format(item.startTime)}</td>
    <td>
      <div className="flex items-center gap-2">
        {/* <Link href={`/list/results/${item.id}`}>
          <button className=" size-7 flex items-center justify-center rounded-full bg-anupSky ">
            <Image src="/view.png" alt="View" width={16} height={16} />
          </button>
        </Link> */}
        {role === "admin" && (
          <>
            <FormModal table="results" type="update" data={item} />
            <FormModal table="results" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...quaryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARMS Condition

  const quary: Prisma.resultWhereInput = {};

  if (quaryParams) {
    for (const [key, value] of Object.entries(quaryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            quary.studentId = value
            break;
          case "search":
            quary.OR = [
              {student:{firstName:{contains:value, mode:"insensitive"}}},
              {exam:{title:{contains:value, mode:"insensitive"}}},
              {assignment:{title:{contains:value, mode:"insensitive"}}},
            ]
            break;
          default:
              break;
        }
      }
    }
  }
  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: quary,
      include: {
        student: { select: { firstName: true, lastName: true } },
        exam: {
          include: {
            lesson:{
              select: {
                class:{ select: { name: true } },
                teacher:{ select: { firstName: true, lastName: true } },
              }
            }
          }
        },
        assignment: {
          include: {
            lesson:{
              select: {
                class:{ select: { name: true } },
                teacher:{ select: { firstName: true, lastName: true } },
              }
            }
          }
        }
        
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.result.count({ where: quary }),
  ]);

  const data = dataRes.map((item) => {
    const assessment= item.exam || item.assignment;

    if (!assessment) return null;

    const isExam ="startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      student: `${item.student.firstName} ${item.student.lastName}`,
      score: item.score,
      teacher: isExam ? `${assessment.lesson.teacher.firstName} ${assessment.lesson.teacher.lastName}` : `${assessment.lesson.teacher.firstName} ${assessment.lesson.teacher.lastName}`,
      class: isExam ? assessment.lesson.class.name : assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
      endTime: isExam ? assessment.endTime : assessment.endDate,
    };
  });

  return (
    <div className="bg-white p-4 m-4 rounded-md flex-1 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center ">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
              <FormModal table="results" type="create" />
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

export default ResultsListPage;
