import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GetStart from './Components/getstarted/getstart';  
import Option from './Components/getstarted/option';      
import Login from './Components/auth/login';              
import Signup from './Components/auth/signup';            
import MainPage from './page/mainpage';
import Home from './page/home/home';         
import Search from './page/search/search';     
import Menu from './page/menu/menu';       
import MyAccount from './page/menu/myaccount';  

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GetStart />} />
      <Route path="/second" element={<Option />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<MainPage />}>
        <Route path="home" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="menu" element={<Menu />} /> {/* Menu component renders here */}
        <Route path="menu/my-account" element={<MyAccount />} /> {/* My Account page */}
      </Route>
    </Routes>
  );
};

export default App;
