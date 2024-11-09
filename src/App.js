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
import Chat from './page/home/chat';
import AboutUs from './page/menu/about'; 
import EmergencyServices from './page/home/emergency-services';
import EmergencyKIT from './page/home/emergencyKIT';
import Maps from './page/map/maps';
import VolunteerMatching from './page/home/VolunteerMatching';
import EducationalResources from './page/home/Educational-Resources';
import YourEmergencyPreparednessGuide from './Module/Your_Emergency _Preparedness_Guide';
import EmergencyPreparednessGuide from './Module/Disabilities_Special';
import EmergencyPreparednessForChildren from './Module/children';
import Nominee from './page/menu/nominee';
import ContactUs from './page/menu/ContactUs';
import Alerts from './page/home/alerts';
import Myactivity from './page/menu/myactivity';
import EmergencyContact from './page/home/emergency';




const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GetStart />} />
      <Route path="/second" element={<Option />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<MainPage />} >
      <Route path="real-time-alerts" element={<Alerts />} />
      <Route path="chat" element={<Chat />} />
      <Route path="myactivity" element={<Myactivity />} />
        <Route path="home" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="menu" element={<Menu />} /> 
        <Route path="maps" element={<Maps />} /> 
        <Route path="my-account" element={<MyAccount />} />
        <Route path="emergency-communication" element={<EmergencyContact />} />

        <Route path="nominee" element={<Nominee />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="emergency-services" element={<EmergencyServices />} />
        <Route path="create-emergency-kit" element={<EmergencyKIT />} />
        <Route path="volunteer-matching" element={<VolunteerMatching />} /> 
        <Route path="educational-resources" element={<EducationalResources />} />
        <Route path="your-emergency-preparedness-guide" element={<YourEmergencyPreparednessGuide />} /> 
        <Route path="emergency-preparedness-guide-for-people-with-disabilities" element={<EmergencyPreparednessGuide />} /> 
        <Route path="emergency-preparedness-for-children" element={<EmergencyPreparednessForChildren />} /> 


      </Route>
    </Routes>
  );
};

export default App;
