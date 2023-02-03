import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, SignupPage } from './pages';
import url from './api/Api'
import axios from 'axios';


function App() {
  const [auth,setAuth] = useState(false)
  const authVerify = () => {
    const token = JOSN.parse(localStorage.getItem("token"))
    if (token){
      setAuth(true)
    }else{
      setAuth(false)
    }
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
