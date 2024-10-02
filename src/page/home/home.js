import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Importing the CSS file
import modulesData from './modules.json'; // Importing the JSON data

const Home = () => {
    return (
        <div className="home-container">
            <div className="title-section">
                <h1>This is Our Modules</h1>
            </div>
            <div className="module-section">
                <div className="module-grid">
                    {modulesData.map((module, index) => (
                        <Link to={module.link} className="module" key={index}>
                            <div className="module-content">
                                <i className={module.icon}></i>
                                <span>{module.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="additional-content">
                <p>Explore more features and updates.</p>
            </div>
        </div>
    );
};

export default Home;
