import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log({ fullName, dob, gender, mobileNumber, email, pin });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Creating your account ...</h2>

        {/* Full Name */}
        <div className="input-group">
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="input-group">
          <label>Date of Birth</label>
          <div className="dob-select">
            <select
              value={dob.day}
              onChange={(e) => setDob({ ...dob, day: e.target.value })}
              required
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={dob.month}
              onChange={(e) => setDob({ ...dob, month: e.target.value })}
              required
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={dob.year}
              onChange={(e) => setDob({ ...dob, year: e.target.value })}
              required
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gender */}
        <div className="input-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                required
              /> Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
                required
              /> Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                checked={gender === 'Other'}
                onChange={(e) => setGender(e.target.value)}
                required
              /> Other
            </label>
          </div>
        </div>

        {/* Mobile Number */}
        <div className="input-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            pattern="[0-9]{10}"
            required
            placeholder="Enter 10-digit number"
          />
        </div>

        {/* Email Address */}
        <div className="input-group">
          <label htmlFor="email">Email Address (optional)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Security Pin */}
        <div className="input-group">
          <label htmlFor="pin">6-Digit Security Pin</label>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            pattern="[0-9]{6}"
            required
            placeholder="Enter 6-digit PIN"
          />
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;