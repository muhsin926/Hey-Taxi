import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from '../Common/Table'

const ScheduledRides = () => {
    const [scheduled, setScheduled] = useState([])

    const getRides = () => {
        const token = localStorage.getItem('token')
        const { data } = axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/getScheduledRides`,{
            headers: { Authorization: `Bearer ${token}`}
        })
        setScheduled(data?.rides)
    }

    useEffect(() => {
        getRides()
    },[])
  return (
    <>
    <Table row={scheduled}/>
    </>
  )
}

export default ScheduledRides