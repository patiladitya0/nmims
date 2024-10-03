import React from 'react';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import './myaccount.css'; // Ensure to create this CSS file for styling
import axios from 'axios';

const MyAccount = () => {
    // Dummy user data (replace this with your fetched data)
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456' // This would typically not be stored in plain text
    };

    return (
        <div className="account-container">
            <h1 className="username">{userData.name}</h1>
            <div className="detail-container">
                <p>Email: {userData.email}</p>
                <p>Password: {'•'.repeat(userData.password.length)}</p> {/* Dotted format for password */}
                <button className="edit-button">
                    <FaEdit size={16} /> {/* Edit icon */}
                    Edit
                </button>

                {/* Show password edit form if in edit mode */}
                {editMode && (
                    <form className="password-form" onSubmit={handlePasswordUpdate}>
                        <div className="input-group">
                            <label htmlFor="currentPassword">Current Password:</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save-button">Save Password</button>
                    </form>
                )}

                {/* Display success message after password update */}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
};

export default MyAccount;
