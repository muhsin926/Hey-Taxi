import React from 'react'
import { backgroundVideo } from '../../assets'
import Button from '../Button/Button'
import Navbar from '../Navbar/Navbar'

const Hero = () => {
  return (
    <div className='h-screen'>
      <video src={backgroundVideo} autoPlay loop muted className='w-full h-full object-cover'/>
      <div className='mainCard w-96 p-10 bg-white rounded'>
        <div className='flex justify-around  '>
          <h1 className='text-2xl btmBorder'>Ride</h1>
          <h1 className='text-2xl'>Drive</h1>
        </div>
        <div className='flex justify-center align-middle mt-10'>
          <h1 className='text-3xl font-semibold'>Request a ride now</h1>
        </div>
        <div className='mt-10'>
          <input
          type="text"
          className=" border border-grey bg-slate-200 w-full p-3 rounded mb-4" 
          placeholder='Enter you start in location'/>
          <input
          type="text"
          className=" border border-grey bg-slate-200 w-full p-3 rounded mb-4" 
          placeholder='Enter your destination'/>
        </div>
        <div>
          <Button stlye={" text-center py-2 px-3 rounded bg-yellow-400  my-1 font-semibold"} title={"Request Now"} />
          </div>
      </div>
    </div>
  )
}

export default Hero