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
import Settings from './page/menu/setting';
import Myactivity from './page/menu/myactivity';
import EmergencyContact from './page/home/emergency';
import ProtectedRoute from './ProtectedRoute';



const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<MainPage />} /> */}
      <Route path="/second" element={<Option />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} >
        <Route path="real-time-alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
        <Route path="chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="myactivity" element={<ProtectedRoute><Myactivity /></ProtectedRoute>} />
        <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} /> 
        <Route path="maps" element={<ProtectedRoute><Maps /></ProtectedRoute>} /> 
        <Route path="my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
        <Route path="emergency-communication" element={<ProtectedRoute><EmergencyContact /></ProtectedRoute>} />
        <Route path="nominee" element={<ProtectedRoute><Nominee /></ProtectedRoute>} />
        <Route path="ContactUs" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
        <Route path="about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="emergency-services" element={<ProtectedRoute><EmergencyServices /></ProtectedRoute>} />
        <Route path="create-emergency-kit" element={<ProtectedRoute><EmergencyKIT /></ProtectedRoute>} />
        <Route path="volunteer-matching" element={<ProtectedRoute><VolunteerMatching /></ProtectedRoute>} /> 
        <Route path="educational-resources" element={<ProtectedRoute><EducationalResources /></ProtectedRoute>} />
        <Route path="your-emergency-preparedness-guide" element={<ProtectedRoute><YourEmergencyPreparednessGuide /></ProtectedRoute>} /> 
        <Route path="emergency-preparedness-guide-for-people-with-disabilities" element={<ProtectedRoute><EmergencyPreparednessGuide /></ProtectedRoute>} /> 
        <Route path="emergency-preparedness-for-children" element={<ProtectedRoute><EmergencyPreparednessForChildren /></ProtectedRoute>} /> 
      </Route>
    </Routes>
  );
};

export default App;
