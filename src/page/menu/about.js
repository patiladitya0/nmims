import React from 'react';
import './about.css'; // Ensure to link your CSS file

const AboutUs = () => {
    return (
        <div className="info-container">
            <h1>About Our App</h1>
            <p>
                Welcome to our <strong>Community Crisis Response and Resource Platform</strong>, a project designed to help communities become stronger during crises like natural disasters, pandemics, and other emergencies. Our app is built "for the people, by the people," with the goal of providing efficient, real-time assistance, support, and resources in times of need.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is simple: <strong>to strengthen communities by enhancing their ability to respond to crises.</strong> By connecting people in need with volunteers, resources, and local organizations, we help ensure that everyone gets the support they need, right when they need it.
            </p>

            <h2>Key Features</h2>
            <ul>
                <li><strong>Instant Crisis Alerts</strong>: Get immediate notifications about any emergencies or crises in your area so you can stay informed and prepared at all times.</li>
                <li><strong>Connect with Volunteers and Resources</strong>: Our platform helps match those in need with volunteers, hospitals, police stations, and NGOs nearby to provide timely support.</li>
                <li><strong>Easy Communication</strong>: Post in public chat rooms to raise alerts, request help, or give updates, ensuring that your message reaches the right people quickly.</li>
                <li><strong>Guides and Training</strong>: Access a library of educational resources to learn how to prepare for different types of crises, from natural disasters to public health emergencies.</li>
                <li><strong>AI-Powered Assistance</strong>: Get fast responses to questions or assistance navigating the app through our integrated AI chatbot.</li>
            </ul>

            <h2>Why Choose Us?</h2>
            <p>
                Whether you're in the middle of a crisis or planning for future emergencies, our platform offers <strong>real-time information</strong> and ensures that help is always just a click away. With resources ranging from educational materials to real-time alerts, we are committed to helping communities build resilience and handle any challenge with confidence.
            </p>
            
            <h2>Social Media</h2>
            <p>Stay connected with us on social media for the latest updates and community stories:</p>
            <ul className="social-links">
                <li><a href="https://www.instagram.com/yourapp" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.twitter.com/yourapp" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
        </div>
    );
};

export default AboutUs;
