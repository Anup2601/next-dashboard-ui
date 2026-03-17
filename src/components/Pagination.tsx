'use client';

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";


const Pagination = ({page,count}:{page:number,count:number}) => {

 const router = useRouter();

  const hasPrev=ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext=ITEM_PER_PAGE * page < count;

  const changePage=(newPage:number) => {
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    router.push(`${window.location.pathname}?${params.toString()}`);
  }

  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
        <button disabled={!hasPrev}
         className='py-2 px-4 rounded-md bg-anupSky text-black text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={() => {
          changePage(page-1);
        }}
        >Previous</button>
        <div className='flex items-center gap-2 text-sm'>
            {Array.from(
              { length: Math.ceil(count / ITEM_PER_PAGE) },
              (_, i) => i + 1
            ).map((pageNum) => (
              <button
                key={pageNum}
                className={`py-2 px-4 rounded-md text-xs font-semibold ${pageNum === page ? 'bg-anupSky text-white' : 'bg-slate-200 text-gray-500'}`}
                onClick={() => {
                  changePage(pageNum);
                }}
              >
                {pageNum}
              </button>
            ))} 
        </div>
        <button  disabled={!hasNext}
         className='py-2 px-4 rounded-md bg-anupSky text-black text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed
         disabled bg-gray-500'
        onClick={() => {
          changePage(page+1);
        }}
        >Next</button>
    </div>
  )
}

export default Pagination