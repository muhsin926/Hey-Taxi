import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from '../Common/Table'

const RideHistory = () => {
    const [history, setHistory] = useState([])

    const getHistory = async() => {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/getRideHistory`,{
            headers: { Authorization: `Bearer ${token}`}
        })
        setHistory(data?.rides)
    }

    useEffect(() => {
        getHistory()
    },[])

  return (
    <>
    <Table row={history}/>
    </>
  )
}

export default RideHistory