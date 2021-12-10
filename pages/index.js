import { useEffect, useState } from "react";
import MyTable from "../components/MyTable";
import Link from 'next/link';
export default function Home() {

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/live-class/')
      .then((res) => res.json())
      .then(result => {
        setClasses(result);
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <MyTable data={classes} />

      <div className="max-w-3xl px-3">
        <div className="flex flex-wrap mt-5 gap-3 justify-center items-center">
          <Link href={`http://localhost:3000/`}>
            <button className='px-5 py-3 bg-gray-300 text-gray-800 w-1/3'>
              <a>Join class by ID</a>
            </button>
          </Link>

          <Link href={`http://localhost:3000/create-session`}>
            <button className='px-5 py-3 bg-yellow-300 text-gray-800 w-1/3 flex gap-2 items-center justify-center'>
              Create new Live session <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
} 
