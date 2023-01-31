import React from 'react'
import { Login, Navbar } from '../components'

const LoginPage = () => {
  return (
    <div>
      <Navbar home={false} li={"Sign Up"}/>
        <Login/>
    </div>
  )
}

export default LoginPage