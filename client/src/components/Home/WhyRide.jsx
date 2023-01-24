import React from 'react'
import { homeIcon, locatoinIcon } from '../../assets'
import { whyRide } from '../../constants'

const WhyRide = () => {
    return (
        <section className='md:m-12 md:p-10 m-6 p-5 '>
            <h1 className='md:text-3xl sm:text-3xl font-semibold '>Why ride with hey taxi</h1>
            <div className='grid md:grid-cols-2 '>
                {whyRide.map((data) => (
                    <div className='mt-12'>
                        <img src={data.icon} className="w-16 mb-3" alt="home icon" />
                        <h1 className='text-2xl mb-5 '>{data.title}</h1>
                        <h1>{data.description}</h1>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default WhyRide