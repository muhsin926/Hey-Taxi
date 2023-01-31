import Axios from 'axios'
import React from 'react'
import { Hero, Navbar, WhyRide } from '../components'
import Footer from '../components/Footer/Footer'
import HowToRide from '../components/Home/HowToRide'
import url from '../Api'
import { useEffect } from 'react'


const HomePage = () => {
    // let auth=false
    // const token= document.cookie
    // const authCheck = () => {
    //     Axios.post(`${url}/api/passenger/authCheck`,{token}).then((response) => {
    //         if(response.data.staus){
    //             auth=true
    //             console.log("ture");
    //         }
    //         console.log("false");
    //     })
    // }
    // useEffect(()=> {
    //     authCheck()
    // },[])
    return (
        <>
           <Navbar  />
           <Hero/>
           <WhyRide/>
           <HowToRide/>
           <Footer/>
        </>
    )
}

export default HomePage