import React from 'react'
import { Hero, Navbar, WhyRide } from '../components'
import HowToRide from '../components/Home/HowToRide'


const HomePage = () => {
    return (
        <>
           <Navbar/>
           <Hero/>
           <WhyRide/>
           <HowToRide/>
        </>
    )
}

export default HomePage