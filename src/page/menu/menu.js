import React, { useState,useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaInfoCircle, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import './menu.css';
import { ThemeContext } from '../../context/themeContext';
import axios from "axios";

const Menu = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const [userData, setUserData] = useState("yourname"); // State to hold user data

    const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
          const config = {
            headers: {
              Authorization: `Bearer ${token}` // Pass the JWT token in the Authorization header
            }
          };
    
          // Make API call to fetch user data
          const response = await axios.get('http://localhost:5000/api/user/account', config); // Replace with your actual API endpoint
          setUserData(response.data); // Set the fetched data to the state
        } catch (error) {
          console.error('Error fetching user data:', error);

        }
      };
    useEffect(() => {
        fetchUserData();
    }, []); 

    return (
        <div className="menu-container">
            <h1 className="username">{userData.fullName}</h1>
            <div className="button-container">
                <Link to="/main/my-account">
                    <button className="menu-button">
                        <FaUser size={20} />
                        My Account
                    </button>
                </Link>
                <button className="menu-button">
                    <FaCog size={20} />
                    Settings
                </button>
            </div>
            <div className="button-container">
                <Link to="/main/about">
                    <button className="menu-button">
                        <FaInfoCircle size={20} />
                        About
                    </button>
                </Link>
            </div>

            {/* Theme Toggle Button */}
            <div className="theme-toggle-container">
                <button className="theme-toggle-button" onClick={toggleTheme}>
                    {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>

            {/* Logout Button at the Bottom */}
            <div className="logout-container">
                <button className="Btn">
                    <div className="sign">
                        <FaSignOutAlt size={20} />
                    </div>
                    <div className="text">Logout</div>
                </button>
            </div>
        </div>
    );
};

export default Menu;