import React, { useEffect, useRef } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import './myaccount.css'; // Ensure to create this CSS file for styling

const MyAccount = () => {
    const editButtonRef = useRef(null);

    // Run the animation automatically when the component loads
    useEffect(() => {
        const editButton = editButtonRef.current;
        if (editButton) {
            editButton.classList.add('editBtn-hover');
        }
    }, []);

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
                <button className="editBtn" ref={editButtonRef}>
                    <FaEdit />
                </button>
            </div>
        </div>
    );
};

export default MyAccount;
