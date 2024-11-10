import React, { useState } from 'react';
import './login.css';
import axios from 'axios';  // Assuming axios is used for API requests
import { Link } from 'react-router-dom';
import { CiTextAlignCenter } from 'react-icons/ci';

const Login = () => {
    const [loginMethod, setLoginMethod] = useState('phone');
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (loginMethod === 'email') {
                response = await axios.post('https://cap-server-2.onrender.com/login', { email, pin });
            } else {
                response = await axios.post('https://cap-server-2.onrender.com/login', { mobileNumber: phoneNumber, pin });
            }

            localStorage.setItem('token', response.data.token);
            if (response.data.token) {
                window.location.href = '/home';
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data.message : error.message);
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
                                type="password"
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

                <p style={{textAlign:"center"}}>OR</p>

                <Link to="/signup">
                    <button className="login-button">Create Account</button>
                </Link>
            </form>
        </div>
    );
};

export default Login;
