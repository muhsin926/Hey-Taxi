import React, { useState } from 'react'

const Dashboard = () => {
  const [ava, setAva] = useState(false)
  return (
    <div className=' flex relative'>
      <button className={`absolute text-base right-0 ${ava ? 'bg-green-400' : 'bg-red-500'} text-white py-2 px-3 shadow-2xl`}
      onClick={() => setAva(!ava)}
      >Available</button>
      <div className='w-38 h-96 p-3 rounded border-2 flex flex-col items-center'>
        <h1>Up Coming trips</h1>
      </div>
      <div className='w-2/6 h-96 p-3 rounded border-2 flex flex-col items-center'>
        <h1>Up Coming trips</h1>
      </div>
      <div className='w-2/6 h-96 p-3 rounded border-2 flex flex-col items-center'>
        <h1>Up Coming trips</h1>
      </div>
    </div>
  )
}

export default Dashboard