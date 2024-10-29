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
  const [position, setPosition] = useState([19.1066094,72.834363]); // Default position
  const [error, setError] = useState(null);
  const [showHelpForm, setShowHelpForm] = useState(false); // For toggling the help form
  const [desc, setHelpMessage] = useState(''); // For storing the user's input
  const [crises, setCrises] = useState([]); // State to hold crises data

  // Fetch user data
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
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch crises data
  const fetchCrises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/crises'); // Fetch crises from your backend
      setCrises(response.data); // Set crises data
    } catch (error) {
      console.error('Error fetching crises:', error);
      setError('Failed to fetch crises');
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCrises(); // Fetch crises on component mount
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch current date and time
    const currentDate = new Date();
    const fullName = userData.fullName;
    const time = currentDate.toTimeString().split(' ')[0]; // Get time in HH:MM:SS format
    const date = currentDate.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format

    alert(`Help Message: ${desc} - ${userData.fullName}`);

    try {
      // Make the POST request to send data to the server
      const response = await axios.post('http://localhost:5000/crisis', {
        desc,
        fullName,
        time,
        date,
        cords: position, // Assuming position contains coordinates in [lat, long] format
      });

      console.log(response.data.message); // Handle success message if needed
      setHelpMessage(''); // Clear help message input
      setShowHelpForm(false); // Close the form after successful submission
    } catch (error) {
      console.error(
        'Error submitting crisis form:',
        error.response ? error.response.data.message : error.message
      );
      alert('There was an issue submitting your request. Please try again.');
    }
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
              value={desc}
              onChange={(e) => setHelpMessage(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <div style={{ flex: 1 }}>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {error ? (
                <span>Error: {error}</span>
              ) : (
                <span>
                  Your location: {position[0]}, {position[1]}
                </span>
              )}
            </Popup>
          </Marker>

          {/* Display crisis markers with blinking effect */}
          {crises.map((crisis, index) => (
            <Marker
              key={index}
              position={[crisis.cords[0], crisis.cords[1]]}
              icon={L.divIcon({
                className: 'blinking-marker', // Apply blinking class
                html: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%;"></div>', // Customize marker appearance
                iconSize: [20, 20],
              })}
            >
              <Popup>
                <strong>Description:</strong> {crisis.desc}
                <br />
                <strong>Name:</strong> {crisis.fullName}
                <br />
                <strong>Time:</strong> {crisis.time}
                <br />
                <strong>Date:</strong> {crisis.date}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
