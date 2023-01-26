import React from 'react'
import { Login, Navbar } from '../components'

const LoginPage = () => {
  return (
    <div>
      <Navbar home={false}/>
        <Login/>
    </div>
  )
}

export default LoginPage