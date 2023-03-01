import React from 'react'
import { Navbar, RideHistory, Sidebar } from '../components'

const RideHistoryPage = () => {
    return (
        <main>
            <Navbar />
            <div className='py-7 mx-12  border-b border-gray-200'>
                <h1 className='ml-4 text-gray-500 text-lg'>Ride History</h1>
            </div>
            <section className='h-screen  bg-gray-10 grid grid-cols-12 '>
                <aside className='col-span-2 ml-7 bg-white  h-3/4 w-full p-8 rounded-lg'>
                    <Sidebar />
                </aside>
                <section className='col-span-10 ml-12 bg-white w-11/12 rounded-xl p-10'>
                    <RideHistory />
                </section>
            </section>
        </main>
    )
}

export default RideHistoryPage