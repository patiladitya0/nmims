

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './settings.css'; // Import your CSS file for styles

const Settings = () => {
    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <div className="button-container">
                <Link to="/main/settings/security">
                    <button className="settings-button">Security</button>
                </Link>
                <Link to="/main/settings/language">
                    <button className="settings-button">Language</button>
                </Link>
            </div>
        </div>
    );
};

export default Settings;
