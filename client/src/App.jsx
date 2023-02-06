import React, { useEffect, useState } from 'react';
import {  Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, SignupPage } from './pages';


function App() {
  
  return (
    <div>
        <Routes>
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
    </div>
  );
}

export default App;
