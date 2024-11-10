import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyActivity() {
  const [hist, setHist] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Pass the JWT token in the Authorization header
        }
      };
      const response = await axios.get('https://cap-server-2.onrender.com/api/user/account', config);
      setUserData(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchHist();
    }
  }, [userData]); // Dependency on userData

  const fetchHist = async () => {
    try {
      const response = await axios.post('https://cap-server-2.onrender.com/userevents', {
        userId: userData._id
      });
      setHist(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  // Simple rendering with basic conditional display
  return (
    <div>
      {hist ? (
        <div>{JSON.stringify(hist)}</div> // Display the fetched history
      ) : (
        <p>Loading events...</p>
      )}
    </div>
  );
}