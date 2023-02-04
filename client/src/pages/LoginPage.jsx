import React from 'react'
import { Login, Navbar } from '../components'
import ProtectedSignRoute from '../protectedRoute/ProtectedSignRoute'

const LoginPage = () => {
  return (
    <div>
      <ProtectedSignRoute>
        <Navbar home={false} li={"Sign Up"} />
        <Login />
      </ProtectedSignRoute>
    </div>
  )
}

export default LoginPage