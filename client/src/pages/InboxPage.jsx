import React from 'react'
import { Dropdown, Inbox, Navbar, Sidebar } from '../components'

const InboxPage = () => {
    return (
        <main>
            <Navbar />
            <div className='hidden md:block py-7 mx-12  border-b border-gray-200'>
                <h1 className='ml-4 text-gray-500 text-lg'> Chat Inbox</h1>
            </div>
            <div className='block md:hidden py-7 mx-12  border-b border-gray-200'>
                <Dropdown />
            </div>
            <section className='  bg-gray-10 grid grid-cols-12 '>
                <aside className='hidden md:block col-span-2 ml-7 bg-white  h-3/4 w-full p-8 rounded-lg'>
                    <Sidebar />
                </aside>
                <section className='col-span-12 md:col-span-10 md:ml-12 bg-white md:w-11/12 rounded-xl p-5 md:pt-5 md:pl-6 md:pb-10'>
                    <Inbox />
                </section>
            </section>
        </main>
    )
}

export default InboxPage