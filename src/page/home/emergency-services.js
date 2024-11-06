import React from 'react';
import './emergency-services.css';

const EmergencyServices = () => {
    const services = [
        { name: 'Police', number: '100' },
        { name: 'Ambulance', number: '102' },
        { name: 'Fire Services', number: '101' },
        { name: 'Disaster Management Services', number: '108' },
        { name: 'Womens Helpline', number: '1091' },
        { name: 'National Emergency Number', number: '112' },
    ];

    const handleDial = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div className="emergency-services-container">
            {services.map((service, index) => (
                <div key={index} className="service-card">
                    <h2>{service.name}</h2>
                    <button 
                        onClick={() => handleDial(service.number)} 
                        className="dial-button">
                        Call {service.number}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EmergencyServices;
