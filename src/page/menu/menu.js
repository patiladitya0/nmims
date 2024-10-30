import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserFriends, FaInfoCircle, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import './menu.css';
import { ThemeContext } from '../../context/themeContext';
import axios from "axios";

const Menu = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [userData, setUserData] = useState({ fullName: "yourname" }); // Default structure for userData

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Pass the JWT token in the Authorization header
                }
            };

            // Make API call to fetch user data
            const response = await axios.get('http://localhost:5000/api/user/account', config);
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
            <div className="butn-container">
                <Link to="/main/my-account">
                    <button className="menu-button">
                        <FaUser size={20} />
                        My Account
                    </button>
                </Link>
                <Link to="/main/settings">
                    <button className="menu-button">
                        <FaUserFriends size={20} />
                        Settings
                    </button>
                </Link>
                <Link to="/main/nominee">
                    <button className="menu-button">
                        <AiOutlineUsergroupAdd size={20} />
                        Emergency Contact
                    </button>
                </Link>
            </div>
            <div className="butn-container">
                <Link to="/main/about">
                    <button className="menu-button">
                        <FaInfoCircle size={20} />
                        About
                    </button>
                </Link>
                <Link to="/main/ContactUs">
                    <button className="menu-button">
                        < FaEnvelope size={20} />
                        Contact Us
                    </button>
                </Link>

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
