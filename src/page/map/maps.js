import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function Maps() {
  const [position, setPosition] = useState([19.1910554, 72.9441314]);
  const [error, setError] = useState(null);

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
    alert("You clicked 'Help Me!'");
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
