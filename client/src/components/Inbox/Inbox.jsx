import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blankProfile } from '../../assets'
import { setToDriverId } from '../../redux/slices/ChatSlice'

const drivers = [
    { name: "safwan" },
    { name: "safwan" },
    { name: "safwan" },
    { name: "safwan" },
]
const Inbox = () => {
    const [chatInput, setChatInput] = useState('')
    const [chaters, setChaters]= useState([])
    const [chater, setChater]= useState({})
    const [messages,setMasseges] =useState([])
    const { toDriverId } = useSelector((state) => state.chatSlice)
    const { userId } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const submitHandler = async e => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/chat`, { chatInput, toDriverId }, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    const getChater = async()=> {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/getChater`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setChaters(data)
    }

    const getMsgs = async() => {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/chat`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setMasseges(data)
    }

    const pickReceiver = (driver)=>{
        dispatch(setToDriverId(driver._id))
        setChater(driver)
        getMsgs()
    }

    useEffect(() => {
        getChater()
    },[])

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
                        <h1 className="text-lg text-white font-medium">{chater?.name}</h1>
                    </div>
                </div>
                <div className='h-[22rem] overflow-y-auto'>
                    {messages?.map((msg) => (
                        msg?.sender == userId ? 
                        <div className=' my-5 w-full flex justify-end'>
                            <h1 className=' bg-gradient-to-br from-cyan-400 to-cyan-800 p-4 mr-2 rounded-t-xl rounded-bl-xl '>{msg.message}</h1>
                        </div>
                        :  <div className=' my-5 w-full flex justify-start'>
                        <h1 className='bg-gradient-to-bl from-orange-400 to-orange-700 py-3 ml-2 rounded-t-xl rounded-br-lg'>{msg.message}</h1>
                    </div>

                    ))}
                </div>
                <form onSubmit={submitHandler}>
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
                            <button
                                type='submit'
                                className='bg-gradient-to-br hover:bg-gradient-to-tl from-green-400 to-green-900 text-white text-lg font-poppins font-semibold rounded-md py-2 w-full'>
                                Send
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='col-span-4 h-[30rem] border border-zinc-400 rounded-lg  cursor-pointer'>
                <div >
                    {chaters?.map((chater) => (
                        <div 
                        onClick={() => pickReceiver(chater)}
                        className='mx-2 border-b border-gray-200 flex gap-3 items-center hover:bg-gray-200 p-3'>
                            <img
                                src={chater?.profile ? chater?.profile : blankProfile}
                                className=" w-10  rounded-full"
                                alt="Profile photo"

                            />
                            <h1 className="text-lg text-black font-medium">{chater?.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Inbox