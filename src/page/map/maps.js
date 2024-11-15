import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap, Circle } from 'react-leaflet'; // Added Circle
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

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

function RecenterAutomatically({ position }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  
  return null;
}

export default function Maps() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [position, setPosition] = useState([19.1066094,72.834363]);
  const [error, setError] = useState(null);
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [desc, setHelpMessage] = useState('');
  const [crises, setCrises] = useState([]);
  const RADIUS = 4; // Radius in kilometers

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('/api/user/account', config);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch crises data
  const fetchCrises = async () => {
    try {
      const response = await axios.get('/crises');
      setCrises(response.data);
    } catch (error) {
      console.error('Error fetching crises:', error);
      setError('Failed to fetch crises');
    }
  }; 

  useEffect(() => {
    fetchUserData();
    fetchCrises();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  // Filter crises within radius
  const getCrisesWithinRadius = () => {
    return crises.filter(crisis => {
      const distance = calculateDistance(
        position[0], 
        position[1], 
        crisis.cords[0], 
        crisis.cords[1]
      );
      return distance <= RADIUS;
    });
  };

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
      const response = await axios.post('/crisis', {
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
      <div style={{ flex: 1 }}>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%' }}
        >
          <RecenterAutomatically position={position} />
          
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Street Map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite Map">
              <TileLayer
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a> contributors'
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* 4km radius circle */}
          <Circle
            center={position}
            radius={3000} // 3km in meters
            pathOptions={{
              color: 'blue',
              fillColor: 'blue',
              fillOpacity: 0.1
            }}
          />

          {/* User location marker */}
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

          {/* Filtered crisis markers */}
          {getCrisesWithinRadius().map((crisis, index) => (
            <Marker
              key={index}
              position={[crisis.cords[0], crisis.cords[1]]}
              icon={L.divIcon({
                className: 'blinking-marker',
                html: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%;"></div>',
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
                <br />
                <strong>Distance:</strong> {calculateDistance(
                  position[0], 
                  position[1], 
                  crisis.cords[0], 
                  crisis.cords[1]
                ).toFixed(2)} km
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="button-container">
        <button className="fancy" onClick={handleHelpMeClick}>
          Help Me!
        </button>
      </div>

      {/* Help form that appears on "Help Me!" click */}
      {showHelpForm && (
        <div className="help-form-overlay">
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
            <button className="close-button" onClick={handleHelpMeClick}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}