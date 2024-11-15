import React, { useEffect, useState } from 'react';
import './PersonalInfo.css';
import axios from 'axios';

const PersonalInfo = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [personal, setPersonal] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', middleName: '', lastName: '', age: '', bloodGroup: '',
        flatNo: '', area: '', landmark: '', pincode: '', city: '', 
        insuranceNumber: '', email: '', height: '', heightUnit: 'cm', 
        weight: '', weightUnit: 'kg', allergies: '', medication: ''
    });

    useEffect(() => { fetchPersonalInfo(); }, []);

    const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const fetchPersonalInfo = async () => {
        const token = localStorage.getItem('token');
        if (!token) return console.error('No token found');
        
        try {
            const { data } = await axios.get('/personal-info', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPersonal(data.personalInfo);
        } catch (error) {
            console.error('Error fetching personal info:', error);
        }
    };

    const handleEdit = () => {
        setIsEditMode(true);
        setIsFormVisible(true);
        setFormData(personal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const endpoint = isEditMode
            ? '/personal-info/update'
            : '/personal-info';

        try {
            await axios.post(endpoint, formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchPersonalInfo();
            setIsEditMode(false);
            setIsFormVisible(false);
            resetForm();
        } catch (error) {
            console.error('Error submitting personal information:', error);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete('/personal-info/delete', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPersonal(null);
            resetForm();
            setIsFormVisible(false);
        } catch (error) {
            console.error('Error deleting personal info:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '', middleName: '', lastName: '', age: '', bloodGroup: '',
            flatNo: '', area: '', landmark: '', pincode: '', city: '', 
            insuranceNumber: '', email: '', height: '', heightUnit: 'cm', 
            weight: '', weightUnit: 'kg', allergies: '', medication: ''
        });
    };

    return (
        <div className="personal-info-container">
            {!isFormVisible && personal && (
                <div className="personal-info-display">
                <h2>Personal Information</h2>
                {Object.entries(personal).map(([key, value]) => (
                    <p key={key}>
                        <strong>
                            {key.replace(/([A-Z])/g, ' $1') // Adds space before uppercase letters
                                .replace(/^./, (str) => str.toUpperCase()) // Capitalizes the first letter
                            }:
                        </strong> {value}
                    </p>
                ))}
                <button onClick={handleEdit} className="edit-button">Edit</button>
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
            
            )}

            {isFormVisible && (
                <form className="personal-info-form" onSubmit={handleSubmit}>
                    <h2>{isEditMode ? 'Edit Personal Information' : 'Personal Information Form'}</h2>
                    <h3>Basic Information</h3>
<div className="inputGroup">
    <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
    <input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
    <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
    
    {/* Blood Group Dropdown */}
    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
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


                    <h3>Address</h3>
                    <div className="inputGroup">
                        <input name="flatNo" placeholder="Flat No" value={formData.flatNo} onChange={handleChange} />
                        <input name="area" placeholder="Area" value={formData.area} onChange={handleChange} />
                        <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} />
                        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
                        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                    </div>

                    <h3>Additional Information</h3>
                    <div className="inputGroup">
                        <input name="insuranceNumber" placeholder="Insurance Number" value={formData.insuranceNumber} onChange={handleChange} />
                        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} />
                        <input name="height" placeholder="Height" value={formData.height} onChange={handleChange} />
                        <select name="heightUnit" value={formData.heightUnit} onChange={handleChange}>
                            <option value="cm">cm</option>
                            <option value="ft">ft</option>
                        </select>
                        <input name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />
                        <select name="weightUnit" value={formData.weightUnit} onChange={handleChange}>
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                        </select>
                        <input name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
                        <input name="medication" placeholder="Medication" value={formData.medication} onChange={handleChange} />
                    </div>

                    <button type="submit" className="submit-button">{isEditMode ? 'Update' : 'Submit'}</button>
                    <button type="button" onClick={() => { setIsFormVisible(false); setIsEditMode(false); }} className="cancel-button">Cancel</button>
                </form>
            )}

            {!isFormVisible && !personal && (
                <button onClick={toggleFormVisibility} className="add-button">Add Personal Information</button>
            )}
        </div>
    );
};

export default PersonalInfo;
