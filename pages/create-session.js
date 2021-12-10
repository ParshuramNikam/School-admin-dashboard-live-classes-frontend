import React, { useState, useEffect } from 'react'
import MyTable from '../components/MyTable';

const createSession = () => {
    const [input, setInput] = useState({ className: "", department: "", dateTime: "", url: "" });
    const [reload, setReload] = useState(true);

    // funcction that allow you to intaract with forms  
    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
        console.log(e.target.value)
    }

    //  function that submit the store the data on
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:5000/live-class/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                schoolId: 102,
                dateTime: input.dateTime,
                link: input.url,
                class: input.className,
                department: input.department,
            })
        }).then((res)=> res.json())
        .then((result) => {
            if(result.message || result.error){
                return alert(result.message)
            }
            alert('Session created successfully!')
            setReload(!reload)
            setInput({ className: "", department: "", dateTime: "", url: "" });
        })
    }


    return (
        <>
            <section className='m-2 p-2 max-w-5xl border-2 border-gray-300 shadow bg-blue-100'>
                <h1 className='text-3xl text-indigo-600 font-semibold mb-5 m-3'>Create session</h1>

                <form method="post" onSubmit={handleSubmit}>
                    <div className="flex space-x-12 mb-6 m-2">
                        <select name="select_classes" className="px-20 text-lg" id='className' value={input.className}
                            onChange={handleChange}
                        >
                            <option>Select classes</option>
                            <option value="1">class 1</option>
                            <option value="2">class 2</option>
                            <option value="3">class 3</option>
                            <option value="4">class 4</option>
                        </select>
                        <p className="text-2xl">Or</p>
                        <select name="select_department" className="px-20 text-lg" id='department' value={input.department}
                            onChange={handleChange}
                        >
                            <option>Select Department</option>
                            <option value="bcs">BCA</option>
                            <option value="nursen">Nursen</option>
                            <option value="btech">Btech</option>
                            <option value="phamarcy">Pharmacy</option>
                        </select>
                    </div>

                    <div className='p-2 flex gap-5 items-center'>
                        <h3 className="text-lg">Enter Date : </h3>
                        <input type="datetime-local" name="dateTime" id="dateTime" className='p-1 px-1.5' id="dateTime"
                            value={input.dateTime} onChange={handleChange}
                            min={new Date().toISOString().slice(0, -8)}
                        />
                    </div>

                    <div className='p-2'>
                        <input type="url" name="link" id="link" className='p-1 w-2/6' placeholder='Enter you session link' 
                            id="url" value={input.url}    onChange={handleChange}
                        />
                    </div>

                    <button className="m-2 mt-5 py-2 px-20 text-lg bg-gray-600 text-white mb-7">Crate Notice</button>
                </form>

            </section>

            <MyTable /> 

        </>
    )
}

export default createSession
