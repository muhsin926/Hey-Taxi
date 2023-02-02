import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<DashboardPage />} />
          <Route path='/login' exact={true} element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App