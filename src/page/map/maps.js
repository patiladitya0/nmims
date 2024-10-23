import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import axios from 'axios';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function Maps() {
  const [loading, setLoading] = useState(true); // State to show loading state
  const [userData, setUserData] = useState(null); // State to hold user data
  const [position, setPosition] = useState([19.1910554, 72.9441314]);
  const [error, setError] = useState(null);
  const [showHelpForm, setShowHelpForm] = useState(false); // For toggling the help form
  const [helpMessage, setHelpMessage] = useState(''); // For storing the user's input
  const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Pass the JWT token in the Authorization header
            }
        };

        // Make API call to fetch user data
        const response = await axios.get('http://localhost:5000/api/user/account', config); // Replace with your actual API endpoint
        setUserData(response.data); // Set the fetched data to the state
        setLoading(false); // Stop loading once data is fetched
    } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
        setLoading(false); // Stop loading in case of error
    }
};
useEffect(() => {
  fetchUserData();
}, []);

  useEffect(() => {
    // Check if browser supports Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          setError(error.message);
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleHelpMeClick = () => {
    setShowHelpForm(!showHelpForm); // Toggle the help form visibility
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Help Message: ${helpMessage}` + userData.fullName);
    setHelpMessage(''); // Clear the input after submission
    setShowHelpForm(false); // Close the form after submission
  };

  const handleVolunteerWorkClick = () => {
    alert("You clicked 'Volunteer Work'");
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="button-container">
        <button className="fancy" onClick={handleHelpMeClick}>
          Help Me!
        </button>
        <button className="fancy" onClick={handleVolunteerWorkClick}>
          Volunteer Work
        </button>
      </div>

      {/* Help form that appears on "Help Me!" click */}
      {showHelpForm && (
        <div className="help-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your help message"
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <div style={{ flex: 1 }}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {error ? (
                <span>Error: {error}</span>
              ) : (
                <span>Your location: {position[0]}, {position[1]}</span>
              )}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
