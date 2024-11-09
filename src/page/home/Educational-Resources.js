import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa'; // Importing the icon
import { Link } from 'react-router-dom'; // Import Link
import './Educational-Resources.css';
import educationalResources from '../../data/educationalResources.json'; // Adjusted path

const EducationalResources = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <div className="resources-container">
            {educationalResources.map((resource, resourceIndex) => (
                <div key={resourceIndex}>
                    <h1 className="resource-title">{resource.title}</h1> {/* Main title from the JSON */}
                    <div className="dropdown">
                        <button className="Documents-btn" onClick={() => toggleDropdown(resourceIndex)}>
                            <span className="folderContainer">
                                <FaFileAlt className="file-icon" /> {/* Using the icon here */}
                                <span className="text">View Resources</span>
                            </span>
                            <span>{activeDropdown === resourceIndex ? '-' : '+'}</span>
                        </button>
                        {activeDropdown === resourceIndex && (
                            <div className="dropdown-content">
                                {resource.items.map((item, index) => (
                                    <div key={index} className="item">
                                        {/* Use Link to navigate to the routes */}
                                        <Link to={`${item.link.replace('.html', '')}`} className="resource-link">
                                            {item.heading}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EducationalResources;
