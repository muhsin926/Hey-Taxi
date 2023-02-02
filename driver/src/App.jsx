import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DocUploaderPage from './pages/DocUploaderPage'
import HomePage from './pages/HomePage'
import Loginpage from './pages/Loginpage'
import RequirementPage from './pages/RequirementPage'
import SignupPage from './pages/SignupPage'

const App = () => {
  return (
      <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/requirements' element={<RequirementPage/>} />
          <Route path='/requirements/docUpload' element={<DocUploaderPage/>} />
        </Routes>
      </Router>
      </>
  )
}

export default App