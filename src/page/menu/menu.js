import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserFriends, FaInfoCircle, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import { MdPersonalInjury, MdEventAvailable } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Login from '../../Components/auth/login';
import './menu.css';
import { ThemeContext } from '../../context/themeContext';
import axios from "axios";

const Menu = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [userData, setUserData] = useState({ fullName: "yourname" }); // Default structure for userData
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Track if the button is clicked

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Pass the JWT token in the Authorization header
                }
            };

            // Make API call to fetch user data
            const response = await axios.get('https://cap-server-2.onrender.comapi/user/account', config);
            setUserData(response.data); // Set the fetched data to the state
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogoutClick = () => {
        if (!isLoggingOut) {
            // First click: trigger transition effect
            setIsLoggingOut(true);
        } else {
            // Second click: perform the logout
            handleLogout();
        }
    };

    const handleLogout = () => {
        // Remove the authentication token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page
        window.location.href = "/login";
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="menu-container">
            <h1 className="username">{userData.fullName}</h1>
            <div className="butn-container">
                <Link to="/my-account">
                    <button className="menu-button">
                        <FaUser size={20} />
                        My Account
                    </button>
                </Link>
                <Link to="/personalinfo">
                    <button className="menu-button">
                        <MdPersonalInjury size={20} />
                        Personal Info
                    </button>
                </Link>
                <Link to="/nominee">
                    <button className="menu-button">
                        <AiOutlineUsergroupAdd size={20} />
                        Emergency Contact
                    </button>
                </Link>
                <Link to="/manage">
                    <button className="menu-button">
                        < MdEventAvailable size={20} />
                        Manage Event
                    </button>
                </Link>
                <Link to="/about">
                    <button className="menu-button">
                        <FaInfoCircle size={20} />
                        About
                    </button>
                </Link>
                <Link to="/ContactUs">
                    <button className="menu-button">
                        < FaEnvelope size={20} />
                        Contact Us
                    </button>
                </Link>
            </div>

            {/* Logout Button at the Bottom */}
            <div className="logout-container">
                <button 
                    className={`Btn ${isLoggingOut ? 'clicked' : ''}`} 
                    onClick={handleLogoutClick}>
                    <div className="sign">
                        <FaSignOutAlt size={40} />
                    </div>
                    <div className="text">Logout</div>
                </button>
            </div>
        </div>
    );
};

export default Menu;
