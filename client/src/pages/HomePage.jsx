import React from 'react'
import { Hero, Navbar, WhyRide } from '../components'
import Footer from '../components/Footer/Footer'
import HowToRide from '../components/Home/HowToRide'


const HomePage = () => {
    return (
        <>
           <Navbar home={true}/>
           <Hero/>
           <WhyRide/>
           <HowToRide/>
           <Footer/>
        </>
    )
}

export default HomePage