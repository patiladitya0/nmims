import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    let holdTimeout;

    const startHold = () => {
        holdTimeout = setTimeout(() => {
            setShowConfirmation(true);
        }, 3000);
    };

    const cancelHold = () => {
        clearTimeout(holdTimeout);
    };

    const handleConfirmation = (confirm) => {
        setShowConfirmation(false);
        if (confirm) {
            navigate('/main/settings'); // Replace '/new-page' with the route you want to navigate to
        }
    };

    return (
        <div className="home-container">
            <h1>Home Page</h1>
            {showConfirmation && (
                <div className="confirmation">
                    <p>Are you sure?</p>
                    <button onClick={() => handleConfirmation(true)}>Yes</button>
                    <button onClick={() => handleConfirmation(false)}>No</button>
                </div>
            )}
            <button
                onMouseDown={startHold}
                onTouchStart={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchEnd={cancelHold}
                className="hold-button no-select"
            >
                Hold for 3 seconds
            </button>
        </div>
    );
};

export default Home;
