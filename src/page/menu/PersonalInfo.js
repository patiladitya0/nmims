import React, { useState } from 'react';
import './PersonalInfo.css';

const PersonalInfo = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        bloodGroup: '',
        flatNo: '',
        area: '',
        landmark: '',
        pincode: '',
        city: '',
        insuranceNumber: '',
        email: '',
        height: '',
        heightUnit: 'cm',
        weight: '',
        weightUnit: 'kg',
        allergies: '',
        medication: '',
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
            firstName: '',
            middleName: '',
            lastName: '',
            age: '',
            bloodGroup: '',
            flatNo: '',
            area: '',
            landmark: '',
            pincode: '',
            city: '',
            insuranceNumber: '',
            email: '',
            height: '',
            heightUnit: 'cm',
            weight: '',
            weightUnit: 'kg',
            allergies: '',
            medication: '',
        });
    };

    return (
        <div className="personal-info-container">
            <button className="open-form-button" onClick={toggleFormVisibility}>
                {isFormVisible ? 'Close Form' : 'Open Personal Information Form'}
            </button>

            {isFormVisible && (
                <form className="personal-info-form" onSubmit={handleSubmit}>
                    <h2>Personal Information Form</h2>

                    <h3>Basic Information</h3>
                    <div className="inputGroup">
                        <input
                            required
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            value={formData.middleName}
                            onChange={handleChange}
                        />
                        <input
                            required
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <h3>Age & Blood Group</h3>
                    <div className="inputGroup">
                        <input
                            required
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                        <select
                            required
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <h3>Address Information</h3>
                    <div className="inputGroup">
                        <input
                            required
                            type="text"
                            name="flatNo"
                            placeholder="Flat/House No/Apartment"
                            value={formData.flatNo}
                            onChange={handleChange}
                        />
                        <input
                            required
                            type="text"
                            name="area"
                            placeholder="Area/Sector/Street"
                            value={formData.area}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="landmark"
                            placeholder="Landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                        />
                        <input
                            required
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                        />
                        <input
                            required
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>

                    <h3>Contact Information</h3>
                    <div className="inputGroup">
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <h3>Insurance Information</h3>
                    <div className="inputGroup">
                        <input
                            type="text"
                            name="insuranceNumber"
                            placeholder="Insurance Number"
                            value={formData.insuranceNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <h3>Physical Attributes</h3>
                    <div className="inputGroup">
                        <input
                            type="number"
                            name="height"
                            placeholder="Height"
                            value={formData.height}
                            onChange={handleChange}
                        />
                        <select
                            name="heightUnit"
                            value={formData.heightUnit}
                            onChange={handleChange}
                        >
                            <option value="cm">cm</option>
                            <option value="feet">feet</option>
                        </select>
                    </div>

                    <div className="inputGroup">
                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight"
                            value={formData.weight}
                            onChange={handleChange}
                        />
                        <select
                            name="weightUnit"
                            value={formData.weightUnit}
                            onChange={handleChange}
                        >
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                        </select>
                    </div>

                    <h3>Allergies & Medication</h3>
                    <div className="inputGroup">
                        <textarea
                            name="allergies"
                            placeholder="Allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="inputGroup">
                        <textarea
                            name="medication"
                            placeholder="Medication"
                            value={formData.medication}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};

export default PersonalInfo;
