import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setDirection } from '../../redux/slices/RideDetails'
import url from '../../api/Api'

const Driving = () => {
    const [running, setRunning] = useState(false)
    const { rideDetails } = useSelector((state) => state.rideDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const starting = () => {
        dispatch(setDirection())
        setRunning(true)
    }
    const finished = async() => {
        const {data} = await axios.patch(`${url}/api/driver/ride-now`,{requestId:rideDetails._id})
        data.status && toast.success("Congradulation completed your driving")
        navigate('/')
    }
    return (
        <div className='absolute bottom-0  w-full '>
            <div className=' outer text-white  flex flex-col pb-6 rounded-t-2xl justify-center items-center  '>
                {running ? 
                <button onClick={()=>finished()} className='parent border-2 border-white bg-red-500 my-3 text-white hover:bg-red-600 min-w-10 min-h-10 flex justify-center items-center text-2xl rounded-full'>
                <h1 className='hidden hidden-child px-3 text-white text-lg font-semibold'>Finished</h1><FontAwesomeIcon icon={faPowerOff} />
                </button>
                :
                <><button onClick={() => starting()} className='parent border-2 border-white bg-green-500 my-3 text-white hover:bg-green-600 min-w-10 min-h-10 flex justify-center items-center text-2xl rounded-full'>
                        <h1 className='hidden hidden-child px-3 text-white text-lg font-semibold'>Start Driving</h1><FontAwesomeIcon icon={faPowerOff} />
                    </button><h1 className='show-child text-black text-xl font-bold'>Start Driving</h1></>
}
                {/* <div className='hidden hidden-child  text-black '>
                    <div className='flex justify-center items-center'>
                    <div className='py-2 px-3 min-w-42 border border-gray-300 rounded-md pl-3'>Pattambi</div>
                    <FontAwesomeIcon className='mx-5' icon={faArrowRight} />
                    <div className='py-2 px-3 min-w-42  border border-gray-300 rounded-md pl-3'>malappurem</div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Driving