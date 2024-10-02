import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaSearch, FaBars, FaMapMarkerAlt } from 'react-icons/fa'; // Import maps icon
import './mainpage.css';

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('home'); // Manage active tab state

    return (
        <div className="main-page-container">
            <div className="page-content">
                <Outlet /> {/* This will render the child route components */}
            </div>

            <nav className="bottom-nav">
                <Link 
                    to="home" 
                    className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => setActiveTab('home')}
                >
                    <FaHome size={20} />
                </Link>

                <Link 
                    to="search" 
                    className={`nav-item ${activeTab === 'search' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('search')}
                >
                    <FaSearch size={20} />
                </Link>

                <Link 
                    to="maps" // Correct path for maps page
                    className={`nav-item ${activeTab === 'maps' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('maps')}
                >
                    <FaMapMarkerAlt size={20} />
                </Link>

                <Link 
                    to="menu" 
                    className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('menu')}
                >
                    <FaBars size={20} />
                </Link>
            </nav>
        </div>
    );
};

export default MainPage;
