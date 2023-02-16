import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import DriverManagementPage from './pages/DriverManagementPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<DashboardPage />} />
          <Route path='/login'  element={<LoginPage />} />
          <Route path='/driver'  element={<DriverManagementPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App