import React from 'react';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import './myaccount.css'; // Ensure to create this CSS file for styling

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
            </div>
        </div>
    );
};

export default MyAccount;
