import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyActivity() {
  const [hist, setHist] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchUserData();
    fetchHist();
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

  const fetchHist = async () => {
    if (userData){
    const response = await axios.get('https://cap-server-2.onrender.com/userevents', {
      userId : userData._id
    });
    setHist(response.data);}
  };

  // Simple rendering with basic conditional display
  return (
    <div>
      {hist ? (<div>{hist}
        </div>
      ) : (
        <p>Loading events...</p>
      )}
    </div>
  );
}