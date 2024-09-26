import React from 'react';
import { Link } from 'react-router-dom';
import './option.css';

const Option = () => {
  return (
    <div className="second-page-container">
      <div className="content">
        <h2>Please Choose an Option</h2>
        <Link to="/login">
          <button className="login-button">Login</button> 
        </Link>
        <Link to="/signup">
          <button className="signup-button">Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Option;  
