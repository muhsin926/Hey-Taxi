import React from 'react'
import Button from '../Button/Button'



const navigation = [
    { name: 'Dashboard', href: '#', current: false },
    { name: 'Driver Manage', href: '#', current: false },
    { name: 'User Manage', href: '#', current: false },
    { name: 'Vehicles', href: '#', current: true },
    { name: 'Earnings', href: '#', current: false },
    
  ]


const SideBar = () => {
  return (
    <div className=''>
     {
        navigation.map((data)=>(
            <Button 
            style={'rounded-md p-2 w-full text-base font-medium hover:bg-slate-100 hover:text-black mb-3'} 
            title={data.name}
            bg={data.current && 'bg-yellow-300 text-black rounded-md p-2 w-full text-base font-medium mb-3' }
            />
        ))
     }   
    </div>
  )
}

export default SideBar