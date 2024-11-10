import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ststicpage.css';
import axios from 'axios';

const StaticPage = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nomineeInfo, setNomineeInfo] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPersonalInfo();
        fetchNomineeInfo();
    }, []);

    const fetchPersonalInfo = async () => {
        const token = localStorage.getItem('token');
        if (!token) return console.error('No token found');

        try {
            setLoading(true);
            const { data } = await axios.get('https://cap-server-2.onrender.com/personal-info', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setPersonalInfo(data.personalInfo);
            setLoading(false);
        } catch (error) {
            setError('Error fetching personal info');
            setLoading(false);
            console.error('Error fetching personal info:', error);
        }
    };

    const fetchNomineeInfo = async () => {
        const token = localStorage.getItem('token');
        if (!token) return console.error('No token found');

        try {
            const { data } = await axios.get('https://cap-server-2.onrender.com/api/user/account', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            console.log('Nominee Data:', data); // Log to check structure
            setNomineeInfo(data.nominee);
        } catch (error) {
            setError('Error fetching nominee info');
            console.error('Error fetching nominee info:', error);
        }
    };

    const emergencyContacts = nomineeInfo?.emergencyContacts || [];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleExit = () => setShowConfirmation(true);

    const handleConfirmation = (confirm) => {
        setShowConfirmation(false);
        if (confirm) {
            navigate('/');
        }
    };

    return (
        <div className="static-page-container">
            <h1>Personal Information</h1>
            {personalInfo && (
                <div className="personal-info">
                    <p><strong>Name:</strong> {personalInfo.firstName}</p>
                    <p><strong>Age:</strong> {personalInfo.age}</p>
                    <p><strong>Blood Group:</strong> {personalInfo.bloodGroup}</p>
                    <p><strong>Address:</strong> {personalInfo.flatNo}</p>
                    <p><strong>Email:</strong> {personalInfo.email}</p>
                    <p><strong>Height:</strong> {personalInfo.height}</p>
                    <p><strong>Weight:</strong> {personalInfo.weight}</p>
                    <p><strong>Insurance Number:</strong> {personalInfo.insuranceNumber}</p>
                    <p><strong>Allergies:</strong> {personalInfo.allergies || 'No known allergies'}</p>
                    <p><strong>Medication:</strong> {personalInfo.medication || 'No current medications'}</p>
                </div>
            )}

            <h1>Emergency Contacts</h1>
            {emergencyContacts.length > 0 ? (
                <div className="nominee-info">
                    {emergencyContacts.map((contact, index) => (
                        <div key={index} className="emergency-contact-card">
                            <p><strong>Nominee Name:</strong> {contact.fullName}</p>
                            <p><strong>Relationship:</strong> {contact.relation}</p>
                            <p><strong>Contact Number:</strong> {contact.contactNumber}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No nominee information available.</p>
            )}

            {showConfirmation && (
                <div className="home-page-confirmation">
                    <p>Are you sure?</p>
                    <button onClick={() => handleConfirmation(true)}>Yes</button>
                    <button onClick={() => handleConfirmation(false)}>No</button>
                </div>
            )}

            <button className="exit-button" onClick={handleExit}>
                Exit
            </button>
        </div>
    );
};

export default StaticPage;
