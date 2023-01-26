import React from 'react'
import { logo1 } from '../../assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-black p-16'>
            <div className="flex justify-around text-white">
                <div className=" ">
                    <img src={logo1} className="w-44" alt="image" />
                    <div className='flex mt-5'>
                        <h1>dkfadf</h1>
                        <h1>dkfadf</h1>
                        <h1>dkfadf</h1>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="text-2xl">Company</div>
                    <NavLink className={'mt-5 mb-3'} to={'/'}>About us</NavLink>
                    <NavLink to={'/'}>Privacy & Policy</NavLink>
                </div>
                <div className='flex flex-col'>
                    <div className="text-2xl">Service</div>
                    <NavLink  className={'mt-5 mb-3'} to={'/'}>Ride</NavLink>
                    <NavLink to={'/'}>Driver</NavLink>
                </div>
            </div>
        </footer>
    )
}

export default Footer