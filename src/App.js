import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GetStart from './Components/getstarted/getstart';  // Correct path
import Option from './Components/getstarted/option';      // Correct path

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GetStart />} />
      <Route path="/second" element={<Option />} />
    </Routes>
  );
};

export default App;
