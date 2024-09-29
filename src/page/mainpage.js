import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaSearch, FaBars } from 'react-icons/fa';
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
                    to="home" // Ensure correct path
                    className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => setActiveTab('home')}
                >
                    <FaHome size={20} />
                </Link>

                <Link 
                    to="search" // Ensure correct path
                    className={`nav-item ${activeTab === 'search' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('search')}
                >
                    <FaSearch size={20} />
                </Link>

                <Link 
                    to="menu" // Ensure correct path
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
