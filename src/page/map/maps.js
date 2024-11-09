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
      const response = await axios.get('https://cap-server-1.onrender.com/api/user/account', config);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch crises data
  const fetchCrises = async () => {
    try {
      const response = await axios.get('https://cap-server-1.onrender.com/crises');
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

  // Rest of your existing handlers (handleHelpMeClick, handleSubmit, etc.)

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

      {/* Rest of your existing UI components */}
    </div>
  );
}