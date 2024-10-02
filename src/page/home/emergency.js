import React, { useState, useEffect } from 'react';
import emergencyServicesData from './emergency.json'; // Importing JSON data
import './emergency.css'; // Import the CSS for styling

const EmergencyServices = () => {
    const [services, setServices] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // Track the index of the active section

    useEffect(() => {
        // Set the emergency services from the imported JSON
        setServices(emergencyServicesData);
    }, []);

    const toggleSection = (index) => {
        // If the clicked section is already active, close it. Otherwise, set the active index.
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="emergency-services-container">
            <h1>Emergency Services</h1>
            {services.map((service, index) => (
                <div className="service-section" key={index}>
                    <div className="service-header" onClick={() => toggleSection(index)}>
                        <h2>{service.title}</h2>
                        <div className="popup">
                            <input 
                                type="checkbox" 
                                id={`burger-${index}`} 
                                checked={activeIndex === index} // Synchronize the checkbox with the open state
                                readOnly // Prevent checkbox state from being changed directly
                            />
                            <div className="burger">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    {activeIndex === index && ( // Only show details for the active section
                        <div className="service-details">
                            <h3 className="service-subtitle">{service.subtitle}</h3> {/* Display subtitle in dropdown */}
                            {service.phoneNumbers.map((phone, i) => (
                                <div className="phone-number" key={i}>
                                    <span>{phone.location}: </span> {/* Display the location */}
                                    <a href={`tel:${phone.number}`}>{phone.number}</a> {/* Dial link */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EmergencyServices;
