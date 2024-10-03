import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaInfoCircle, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import './menu.css';
import { ThemeContext } from '../../context/themeContext';

const Menu = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="menu-container">
            <h1 className="username">Your Name</h1>
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
