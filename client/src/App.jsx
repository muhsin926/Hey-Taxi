import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import SignIn from './components/signIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <div>
      
     <Router>
      <Routes>
        <Route path='/' exact={true} element={ <Home/> }/>
      </Routes>
      <Routes>
        <Route path='/singup' element={ <SignUp/> }/>
      </Routes>
      <Routes>
        <Route path='/login' element={ <SignIn/> }/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
