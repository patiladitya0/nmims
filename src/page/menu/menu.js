import './menu.css';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaUser, FaCog, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

const Menu = () => {
    console.log("Menu Component Rendered"); // This should show up in the console
    return (
        <div className="menu-container">
            <h1 className="username">Your Name</h1>
            <div className="button-container">
                <Link to="/main/menu/my-account"> {/* Updated link to My Account */}
                    <button className="menu-button">
                        <FaUser size={20} /> {/* User icon */}
                        My Account
                    </button>
                </Link>
                <button className="menu-button">
                    <FaCog size={20} /> {/* Settings icon */}
                    Settings
                </button>
            </div>
            <div className="button-container">
                <button className="menu-button">
                    <FaInfoCircle size={20} /> {/* About icon */}
                    About
                </button>
                <button className="menu-button">
                    <FaSignOutAlt size={20} /> {/* Logout icon */}
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Menu;
