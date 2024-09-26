import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GetStart from './Components/getstarted/getstart';  
import Option from './Components/getstarted/option';      
import Login from './Components/auth/login';              
import Signup from './Components/auth/signup';            

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GetStart />} />
      <Route path="/second" element={<Option />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
