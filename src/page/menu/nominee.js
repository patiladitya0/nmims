import React, { useState, useContext, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import './nominee.css';
import axios from 'axios';

const Nominee = () => {
    const [userData, setUserData] = useState(null); // State to hold user data
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        relation: '',
        contactNumber: ''
    });

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token available");
            }
            
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            console.log(formData);
            
            const response = await axios.get('http://localhost:5000/api/user/account', config);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response && error.response.status === 401) {
                console.error("Authentication failed. Redirecting to login...");
                // Redirect to login page or display an error message
            }
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
        
        // Prepare data to be sent, including user data
        const dataToSend = {
            ...formData,
            userId: userData.id, // or whatever property uniquely identifies the user
            userName: userData.name // add any additional user data if needed
        };

        try {
            const response = await fetch('http://localhost:5000/nominee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log("Form data sent successfully");
                // Clear form or show success message if needed
            } else {
                console.error("Failed to send form data");
            }
        } catch (error) {
            console.error("Error sending form data:", error);
        }
    };

    return (
        <div className="nominee-container">
            <button className="cssbuttons-io-button" onClick={toggleFormVisibility}>
                <span className="button-text">{isFormVisible ? '-' : '+'}</span>
            </button>

            {isFormVisible && (
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <input
                            required
                            type="text"
                            name="fullName"
                            placeholder=""
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        <label>Full Name</label>
                    </div>

                    <div className="inputGroup">
                        <select
                            required
                            name="relation"
                            value={formData.relation}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden></option>
                            <option value="mother">Mother</option>
                            <option value="father">Father</option>
                            <option value="brother">Brother</option>
                            <option value="sister">Sister</option>
                            <option value="son">Son</option>
                            <option value="daughter">Daughter</option>
                            <option value="guardian">Guardian</option>
                            <option value="other">Other</option>
                        </select>
                        <label>Relation</label>
                    </div>

                    <div className="inputGroup">
                        <input
                            required
                            type="tel"
                            name="contactNumber"
                            placeholder=""
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                        <label>Contact Number</label>
                    </div>

                    <button className="fancy" type="submit">
                        <span>Submit</span>
                    </button>
                </form>
            )}
        </div>
    );
};

export default Nominee;
