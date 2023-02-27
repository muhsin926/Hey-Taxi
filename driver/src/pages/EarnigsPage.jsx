import React from 'react'
import { Earnings, Navbar, SideBar } from '../components'

const EarnigsPage = () => {
    return (
        <>
            <Navbar />
            <main className='h-screen md:py-10 py-5 grid  grid-cols-12'>
                <aside className='hidden md:block col-span-2 ml-7 border shadow-lg  h-3/4 w-full p-8 rounded-lg'>
                    <SideBar />
                </aside>
                <section className='md:col-span-10 col-span-12 mx-4 md:ml-12 sm:w-11/12 p-10 border shadow-lg rounded-xl '>
                    <Earnings />
                </section>
            </main>
        </>
    )
}

export default EarnigsPage