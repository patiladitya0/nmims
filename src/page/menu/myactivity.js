import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyActivity() {
  const [userData, setUserData] = useState(null);
  const [hist, setHist] = useState(null);
  const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://cap-server-2.onrender.com/api/user/account', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
        },
      });
      setUserData(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchHist = async () => {
    try {
        if (!userData || !userData._id) {
            console.error('User  data is not available');
            return; // Exit early if userData is not available
        }
        const id = userData._id;
        console.log(id);
        const token = localStorage.getItem('token'); // Ensure you have the token
        const response = await axios.get('https://cap-server-2.onrender.com/userevents', {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request headers
            }
        });
        setHist(response.data);
    } catch (error) {
        console.error('Error fetching history:', error);
    }
};

  useEffect(() => {
    fetchUserData();
    fetchHist();
  }, []);

  return <div>{hist ? JSON.stringify(hist) : 'Loading...'}</div>;
}