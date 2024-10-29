import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './nominee.css';

const Nominee = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className="nominee-container">
            {/* Button to toggle form visibility */}
            <button className="cssbuttons-io-button" onClick={toggleFormVisibility}>
            
                <span className="button-text">{isFormVisible ? '-' : '+'}</span>
            </button>

            {/* Conditionally rendered form */}
            {isFormVisible && (
                <form className="form">
                    <div className="inputGroup">
                        <input required placeholder="" type="text" />
                        <label>Full Name</label>
                    </div>

                    <div className="inputGroup">
                        <select required>
                            <option value="" disabled selected hidden></option>
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
                        <input required type="tel" placeholder="" />
                        <label>Contact Number</label>
                    </div>

                    <button className="fancy">
                        <span className="">Submit</span>
                    </button>
                </form>
            )}
        </div>
    );
};

export default Nominee;
