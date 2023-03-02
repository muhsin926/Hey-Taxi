import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { blankProfile } from '../../assets'

const drivers = [
    {name: "safwan"},
    {name: "safwan"},
    {name: "safwan"},
    {name: "safwan"},
]
const Inbox = () => {
    const [chatInput,setChatInput] = useState('')

    return (
        <div className='grid grid-cols-12 gap-2 '>
            <div className='col-span-8 h-[30rem] border border-zinc-400 rounded-lg '>
                <div className='w-full bg-black py-3 pl-5 rounded-t-lg'>
                    <div className='flex gap-3 items-center'>
                        <Link to={"#"}>
                            <FontAwesomeIcon
                                className="text-white text-2xl mr-4"
                                icon={faCircleArrowLeft}
                            />
                        </Link>
                        <img
                            src={blankProfile}
                            className=" w-10  rounded-full"
                            alt="Profile photo"

                        />
                        <h1 className="text-lg text-white font-medium">Safwan</h1>
                    </div>
                </div>
                <div className='h-[22rem]'></div>
                <div className='grid grid-cols-12 px-5 gap-3'>
                    <div className='col-span-10 '>
                        <input 
                        type="text" 
                        className='w-full border border-gray-400 rounded-lg pl-3 py-3' 
                        placeholder='Type here...'
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        />
                    </div>
                    <div className='col-span-2'>
                        <button className='bg-gradient-to-br hover:bg-gradient-to-tl from-green-400 to-green-900 text-white text-lg font-poppins font-semibold rounded-md py-2 w-full'>Send</button>
                    </div>
                </div>
            </div>
            <div className='col-span-4 h-[30rem] border border-zinc-400 rounded-lg  cursor-pointer'>
                <div >
                    {drivers?.map((drv)=> (
                        <div className='mx-2 border-b border-gray-200 flex gap-3 items-center hover:bg-gray-200 p-3'>
                            <img
                            src={drv?.profile ? drv.profile : blankProfile}
                            className=" w-10  rounded-full"
                            alt="Profile photo"

                        />
                        <h1 className="text-lg text-black font-medium">{drv.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Inbox