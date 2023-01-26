import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, SignupPage } from './pages';


function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' exact={true} element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
