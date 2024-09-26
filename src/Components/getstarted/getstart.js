// Components/getstarted/getstart.js
import React from 'react';
import { Link } from 'react-router-dom';
import './getstart.css';

const GetStart = () => {
  return (
    <div className="first-page-container">
      <div className="content">
        <h1>Welcome to The App</h1>
        <Link to="/second">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default GetStart;  // Make sure this export is present
