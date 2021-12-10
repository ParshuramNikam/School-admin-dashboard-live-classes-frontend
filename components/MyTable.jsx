import React, { useEffect, useState } from 'react'
import Link from 'next/link';

//  dateTime convertion
// date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) =>  '12:30 PM'
// date.toDateString() => 'Tue Dec 08 2020'
// date.toLocaleDateString() => '08/12/2020'

const MyTable = () => {

    const [sessions, setSessions] = useState([]);

    const deleteClassSessionHandler = (_id) => {
        fetch(`http://localhost:5000/live-class/${_id}`, {
            method: "DELETE",
        }).then((res) => res.json())
            .then(result => {
                if (result.message || result.error) {
                    return alert('result.message')
                }
                getNewSessions();
                alert("Session deleted successfully!")
                console.log("deleted session : ", result);
            }).catch((err) => console.log(err))
    }

    const getNewSessions = () => {
        fetch('http://localhost:5000/live-class/')
            .then((res) => res.json())
            .then(result => {
                return setSessions(result);
            })
            .catch((err) => console.log(err))
    }

    useEffect(()=>{
        getNewSessions();
    },[])

    return (
        <>
            <section className='p-3'>
                <div className="border-2 max-w-3xl">
                    {
                        sessions.length>0 && <>
                            <table className="w-full border-2 border-blue-500">
                                <thead>
                                    <tr>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white text-xl">
                                            Class
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white text-xl">
                                            Time
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white text-xl">
                                            Link
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white text-xl">
                                            Delete Session
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sessions.map((rowData, index) => {
                                            console.log(rowData);
                                            return (
                                                <tr key={index} v-for="item in items" className={`text-center ${index%2===1 ? 'bg-gray-100' : ""}`}>
                                                    <td className="px-6 py-2 text-lg text-gray-500">
                                                        Class {rowData.class}
                                                    </td>
                                                    <td className="px-6 py-2 text-lg text-gray-500">
                                                        {rowData.dateTime ? new Date(rowData.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "-"}
                                                    </td>
                                                    <td className="px-6 py-2 text-lg text-gray-500 text-indigo-600 underline">
                                                        <Link href={rowData.link}>
                                                            <a>Class {rowData.class}</a>
                                                        </Link>
                                                    </td>
                                                    {/* <td className="px-6 py-2 text-lg text-gray-500 text-indigo-600 underline">
                                                <Link href={`http://localhost:5000/live-class/${rowData._id}`}>
                                                    <a>Class {rowData.delete}</a>
                                                </Link>
                                            </td> */}
                                                    <td className='px-6 py-2 text-lg text-gray-500 text-indigo-600 underline'>
                                                        <button className='px-3 py-2'
                                                            onClick={() => deleteClassSessionHandler(rowData._id)}
                                                        >Delete 🗑️</button>
                                                    </td>

                                                    {/* <th>{rowData.delete}</th> */}
                                                </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                </div>

                
            </section>


        </>
    )
}

export default MyTable
