import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import DriverManagementPage from './pages/DriverManagementPage'
import LoginPage from './pages/LoginPage'
import PassangerPage from './pages/PassangerPage'
import VehiclePage from './pages/VehiclePage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<DashboardPage />} />
          <Route path='/login'  element={<LoginPage />} />
          <Route path='/driver'  element={<DriverManagementPage />} />
          <Route path='/vehicle'  element={<VehiclePage />} />
          <Route path='/passenger'  element={<PassangerPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App