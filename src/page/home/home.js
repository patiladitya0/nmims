import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../../data/modules.json';
import * as Icons from 'react-icons/fa';
import './home.css';

const Home = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);
    const navigate = useNavigate();
    let holdTimeout, animationInterval;

    const startHold = () => {
        let progress = 0;
        animationInterval = setInterval(() => {
            progress += 1;
            setHoldProgress(progress * 10);
        }, 300);

        holdTimeout = setTimeout(() => {
            clearInterval(animationInterval);
            setShowConfirmation(true);
            setHoldProgress(0);
        }, 3000);
    };

    const cancelHold = () => {
        clearTimeout(holdTimeout);
        clearInterval(animationInterval);
        setHoldProgress(0);
    };

    const handleConfirmation = (confirm) => {
        setShowConfirmation(false);
        if (confirm) {
            navigate('/settings'); // Adjust this route as needed
        }
    };

    const handleModuleClick = (link) => {
        navigate(link);
    };

    return (
        <div className="home-page-container">
            <h1 className="home-page-title">Quick Access</h1>
            
            {showConfirmation && (
                <div className="home-page-confirmation">
                    <p>Are you sure?</p>
                    <button onClick={() => handleConfirmation(true)}>Yes</button>
                    <button onClick={() => handleConfirmation(false)}>No</button>
                </div>
            )}

            <div className="home-page-modules-grid">
                {modules.map((module, index) => {
                    const Icon = Icons[module.icon];
                    return (
                        <button
                            key={index}
                            className="home-page-module-button"
                            onClick={() => handleModuleClick(module.link)}
                        >
                            {Icon && <Icon className="home-page-module-icon" />}
                        </button>
                    );
                })}
            </div>

            <button
                onMouseDown={startHold}
                onTouchStart={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchEnd={cancelHold}
                className="home-page-hold-button no-select"
                style={{
                    background: `conic-gradient(#ffc107 ${holdProgress}%, #e0a800 ${holdProgress}% 100%)`
                }}
            >
                SOS
            </button>
        </div>
    );
};

export default Home;
