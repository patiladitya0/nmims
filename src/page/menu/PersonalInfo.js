import React, { useState } from 'react';
import './PersonalInfo.css';

const PersonalInfo = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bloodGroup: '',
        address: '',
        insuranceNumber: '',
        email: '',
        height: '',
        weight: '',
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setFormData({
            name: '',
            age: '',
            bloodGroup: '',
            address: '',
            insuranceNumber: '',
            email: '',
            height: '',
            weight: '',
        });
    };

    return (
        <div className="personal-info-container">
            <button className="open-form-button" onClick={toggleFormVisibility}>
                {isFormVisible ? 'Close Form' : 'Open Personal Information Form'}
            </button>

            {isFormVisible && (
                <form className="personal-info-form" onSubmit={handleSubmit}>
                    {['name', 'age', 'bloodGroup', 'address', 'insuranceNumber', 'email', 'height', 'weight'].map(field => (
                        <div className="inputGroup" key={field}>
                            <input
                                required
                                type={field === 'age' || field === 'height' || field === 'weight' ? 'number' : 'text'}
                                name={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};

export default PersonalInfo;
