import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, SignupPage } from './pages';


function App() {
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
