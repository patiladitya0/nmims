import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyActivity() {
  const [userData, setUserData] = useState(null);
  const [hist, setHist] = useState(null);
  const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage

  const fetchUserData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
        },
      };
      const response = await axios.get('https://cap-server-1.onrender.com/api/user/account', config); // Adjust with your actual API endpoint
      setUserData(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchHist = async (userId) => {
    try {
      const res = await axios.get(`https://cap-server-1.onrender.com/gethist`, {
        params: { id: userId },
      });
      setHist(res.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userData && userData._id) {
      fetchHist(userData._id);
    }
  }, [userData]);

  return <div>myactivity</div>;
}
