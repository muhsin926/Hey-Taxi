import React from 'react'
import { backgroundVideo } from '../assets'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className='h-screen'>
      <Navbar/>
      <video src={backgroundVideo} autoPlay loop muted className='w-full h-full object-cover'/>
      <div className='mainCard w-80 h-96 bg-white '>Home</div>
    </div>
  )
}

export default Home