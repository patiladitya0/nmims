import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import './myaccount.css'; // Ensure to create this CSS file for styling
import axios from 'axios';
import Loading from '../../loading';

const MyAccount = () => {
    const [userData, setUserData] = useState(null); // State to hold user data
    const [error, setError] = useState(''); // State to hold errors
    const [loading, setLoading] = useState(true); // State to show loading state
    const [editMode, setEditMode] = useState(false); // To toggle password edit mode
    const [currentPassword, setCurrentPassword] = useState(''); // Current password
    const [newPassword, setNewPassword] = useState(''); // New password
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    // Function to fetch the user data
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Pass the JWT token in the Authorization header
                }
            };

            // Make API call to fetch user data
            const response = await axios.get('/api/user/account', config); // Replace with your actual API endpoint
            setUserData(response.data); // Set the fetched data to the state
            setLoading(false); // Stop loading once data is fetched
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to fetch user data');
            setLoading(false); // Stop loading in case of error
        }
    };

    // Function to update the password
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            // Make API call to update the password
            const response = await axios.put('/api/user/update-password', { currentPassword, newPassword }, config); // Replace with your actual endpoint
            setSuccessMessage('Password updated successfully');
            setError(''); // Clear any errors
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Failed to update password');
        }
    };

    // useEffect to fetch user data when the component mounts
    useEffect(() => {
        fetchUserData();
    }, []); // Empty dependency array ensures this runs only once after mount

    // Handle loading and errors
    if (loading) {
        return <Loading />; // Display loading message while data is being fetched
    }

    if (error) {
        return <p>{error}</p>; // Display error if there's a problem fetching data
    }

    if (!userData) {
        return <p>No user data available</p>; // Safety check for empty user data
    }

    return (
        <div className="account-container">
            <h1 className="username">{userData.name}</h1>
            <div className="detail-container">
            <p>Name: {userData.fullName}</p>
                <p>Email: {userData.email}</p>
                {/* Display password in dotted format */}
                <p>Password: {'•'.repeat(userData.password ? userData.password.length : 0)}</p>

                {/* Edit button to toggle password edit mode */}
                <button className="edit-button" onClick={() => setEditMode(!editMode)}>
                    <FaEdit size={16} /> {/* Edit icon */}
                    {editMode ? 'Cancel' : 'Edit Password'}
                </button>

                {/* Show password edit form if in edit mode */}
                {editMode && (
                    <form className="password-form" onSubmit={handlePasswordUpdate}>
                        <div className="input-group">
                            <label htmlFor="currentPassword"></label>
                            <input
                                type="password"
                                id="currentPassword"
                                placeholder='Current Password'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="newPassword"></label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder='New Password'
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
