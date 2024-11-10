import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nominee.css';

const Nominee = () => {
    const [userData, setUserData] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        relation: '',
        contactNumber: ''
    });
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(''); // Added error state

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const response = await axios.get('https://cap-server-2.onrender.com/api/user/account', config);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to fetch user data.'); // Set error message
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!userData) {
            console.error("User data not available. Cannot submit form.");
            return;
        }
    
        const dataToSend = {
            ...formData,
            mobileNumber: userData.mobileNumber,
        };
    
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in headers
                },
            };
    
            const response = await axios.post(
                'https://cap-server-2.onrender.com/nominee',
                dataToSend,
                config
            );
    
            if (response.status === 201) {
                console.log("Form data sent successfully");
                setFormData({ fullName: '', relation: '', contactNumber: '' });
            } else {
                setError("Failed to send form data.");
            }
        } catch (error) {
            console.error("Error sending form data:", error);
            setError("Error sending form data.");
        }
        fetchUserData();
    };
    
    const emergencyContacts = userData?.emergencyContacts || []; // Safe access with optional chaining

    return (
        <div className="nominee-container">
            {loading ? ( // Display loading state
                <p>Loading user data...</p>
            ) : (
                <>
                    <button className="cssbuttons-io-button" onClick={toggleFormVisibility}>
                        {isFormVisible ? '-' : '+'}
                    </button>

                    {isFormVisible && (
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="inputGroup">
                                <input
                                    required
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="inputGroup">
                                <select
                                    required
                                    name="relation"
                                    value={formData.relation}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Relation</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Father">Father</option>
                                    <option value="Brother">Brother</option>
                                    <option value="Sister">Sister</option>
                                    <option value="Son">Son</option>
                                    <option value="Daughter">Daughter</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="inputGroup">
                                <input
                                    required
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <button className="fancy" type="submit">
                                Submit
                            </button>

                            {/* Close button */}
                            <button
                                type="button"
                                className="close-button"
                                onClick={toggleFormVisibility}
                            >
                                Close
                            </button>
                        </form>
                    )}

                    {/* Display error messages */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Display emergency contacts */}
                    <div className="emergency-contacts">
                        <h1>Emergency Contacts</h1>
                        {emergencyContacts.length > 0 ? (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {emergencyContacts.map((contact) => (
                                    <li key={contact._id} className="emergency-contact-item">
                                        <div className="contact-card">
                                            <strong>Name:</strong> {contact.fullName} <br />
                                            <strong>Relation:</strong> {contact.relation} <br />
                                            <strong>Contact Number:</strong> {contact.contactNumber}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No emergency contacts added.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Nominee;
