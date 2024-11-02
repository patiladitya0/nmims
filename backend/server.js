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

    // Fetch user data, including emergency contacts
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found in local storage");
                return;
            }

            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('http://localhost:5000/api/user/account', config);
            console.log("User data fetched:", response.data); // Debug log
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
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
            [name]: value
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
            const response = await axios.post('http://localhost:5000/nominee', dataToSend, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 201) {
                console.log("Form data sent successfully");
                setFormData({ fullName: '', relation: '', contactNumber: '' });
                fetchUserData(); // Refresh user data to update the contacts list
            } else {
                console.error("Failed to send form data");
            }
        } catch (error) {
            console.error("Error sending form data:", error);
        }
    };

    return (
        <div className="nominee-container">
            <button className="toggle-button" onClick={toggleFormVisibility}>
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
                            <option value="mother">Mother</option>
                            <option value="father">Father</option>
                            <option value="brother">Brother</option>
                            <option value="sister">Sister</option>
                            <option value="son">Son</option>
                            <option value="daughter">Daughter</option>
                            <option value="guardian">Guardian</option>
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

                    <button className="submit-button" type="submit">
                        Submit
                    </button>
                </form>
            )}

            {/* Display emergency contacts */}
            <div className="emergency-contacts">
                <h3>Emergency Contacts</h3>
                {userData.emergencyContacts.length > 0 ? (
                    <ul>
                        {userData.emergencyContacts.map((contact) => (
                            <li key={contact._id}>
                                <strong>Name:</strong> {contact.fullName} <br />
                                <strong>Relation:</strong> {contact.relation} <br />
                                <strong>Contact Number:</strong> {contact.contactNumber}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No emergency contacts added.</p>
                )}
            </div>
        </div>
    );
};

export default Nominee;
