import React from 'react'
import { backgroundImg } from '../assets'
import { Navbar } from '../components'

const NotVerifiedPage = () => {
    return (
        <>
            <Navbar />
            <main className='h-[37rem]'>
                <div className='flex flex-col justify-center items-center h-full '>
                    <img src={backgroundImg} className='w-full h-full blur-2xl' alt="" />
                    <div  className='absolute flex flex-col justify-center items-center' >
                    <h1 className='text-3xl font-poppins font-semibold  '>Account not verified</h1>
                    <h1 className='text-gray-900 text-base'>Please wait for verify admin</h1>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NotVerifiedPage