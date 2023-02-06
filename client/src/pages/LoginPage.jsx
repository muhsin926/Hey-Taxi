import React from 'react'
import { Login, Navbar } from '../components'
import ProtectedSignRoute from '../protectedRoute/ProtectedSignRoute'

const LoginPage = () => {
  return (
    <div>
        <Navbar home={false} li={"Sign Up"} />
        <Login />
    </div>
  )
}

export default LoginPage