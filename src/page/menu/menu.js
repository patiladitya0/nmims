import './menu.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const Menu = () => {
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
            {/* Logout button placed at the bottom */}
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
