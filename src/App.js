// App.js
import React from 'react';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Insurances from './pages/insurances/Insurances';
import Profile from './pages/profile/Profile';
import UserInsurances from './pages/userInsurances/userInsurances';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path='/insurances' element={<Insurances/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/userInsurances' element={<UserInsurances/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
