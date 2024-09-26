import React, { useState } from 'react';
import './login.css';

const Login = () => {
    // Set the initial state to 'phone' so that it is selected by default
    const [loginMethod, setLoginMethod] = useState('phone'); // Choose between 'email' or 'phone'
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loginMethod === 'email') {
            console.log('Email:', email, 'Pin:', pin);
        } else {
            console.log('Phone Number:', phoneNumber, 'OTP:', otp);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                {/* Links to toggle between login methods */}
                <div className="toggle-method">
                    <button
                        type="button"
                        className={loginMethod === 'phone' ? 'active' : ''}
                        onClick={() => setLoginMethod('phone')}
                    >
                        Phone
                    </button>
                    <span> | </span>
                    <button
                        type="button"
                        className={loginMethod === 'email' ? 'active' : ''}
                        onClick={() => setLoginMethod('email')}
                    >
                        Email
                    </button>
                </div>

                {/* Conditional rendering based on login method */}
                {loginMethod === 'email' ? (
                    <>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='Enter Email-Id'
                            />
                        </div>
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
                    </>
                ) : (
                    <>
                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                pattern="[0-9]{10}"
                                required
                                placeholder="Enter 10-digit number"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="otp">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                pattern="[0-9]{6}"
                                required
                                placeholder="Enter OTP"
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
