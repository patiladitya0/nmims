import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaSearch, FaBars, FaMapMarkerAlt } from 'react-icons/fa';
import './mainpage.css';

const MainPage = () => {
    const initialTabs = [
        { id: 'home', icon: <FaHome size={20} />, link: 'home' },
        { id: 'search', icon: <FaSearch size={20} />, link: 'search' },
        { id: 'maps', icon: <FaMapMarkerAlt size={20} />, link: 'maps' },
        { id: 'menu', icon: <FaBars size={20} />, link: 'menu' }
    ];
    
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="main-page-container">
            <div className="page-content">
                <Outlet /> {/* This will render the child route components */}
            </div>

            <nav className="bottom-nav">
                {initialTabs.map((tab) => (
                    <Link
                        key={tab.id}
                        to={tab.link}
                        className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default MainPage;
