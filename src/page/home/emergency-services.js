import React from 'react';
import './emergency-services.css';
import { FaPhone } from 'react-icons/fa';  // Import phone icon

const EmergencyServices = () => {
    const services = [
        { name: 'Police', number: '100' },
        { name: 'Ambulance', number: '102' },
        { name: 'Fire Services', number: '101' },
        { name: 'Disaster Management Services', number: '108' },
        { name: 'Women’s Helpline', number: '1091' },
        { name: 'National Emergency Number', number: '112' },
    ];

    const handleDial = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div className="emergency-services-container">
            {services.map((service, index) => (
                <div key={index} className="service-card">
                    <div className="service-info">
                        <span className="service-name">{service.name}</span>
                        <span className="service-number">{service.number}</span>
                    </div>
                    <button 
                        onClick={() => handleDial(service.number)} 
                        className="dial-button">
                        <FaPhone /> Call
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EmergencyServices;
