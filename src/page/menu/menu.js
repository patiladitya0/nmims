import './menu.css';
import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaUser, FaCog, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const Menu = () => {
    return (
        <div className="menu-container">
            <h1 className="username">Your Name</h1>
            <div className="button-container">
                <Link to="/main/my-account"> {/* Updated link to My Account */}
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
                <Link to="/main/about"> {/* Updated link to About Us */}
                    <button className="menu-button">
                        <FaInfoCircle size={20} />
                        About
                    </button>
                </Link>
                <button className="menu-button">
                    <FaSignOutAlt size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Menu;
