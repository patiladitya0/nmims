import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VolunteerMatching.css'; // Ensure this file is in the same directory

export default function VolunteerMatching() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    latitude: '',
    longitude: '',
  });
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null); // Store the user data
  const [showForm, setShowForm] = useState(false); // Control form visibility

  useEffect(() => {
    fetchUserData();
    fetchEvents();
  }, []);

  // Fetch all events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://cap-server-nv40.onrender.com/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('https://cap-server-nv40.onrender.com/api/user/account', config);
      setUserData(response.data); // Save user data to state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://cap-server-nv40.onrender.com/create', eventData);
      alert('Event created successfully!');
      setEventData({ title: '', description: '', date: '', latitude: '', longitude: '' }); // Reset form
      fetchEvents(); // Refresh the list of events
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleVolunteer = async (eventId) => {
    if (!userData || !userData._id) {
      alert('Please log in to volunteer');
      return;
    }
    try {
      await axios.post(`https://cap-server-nv40.onrender.com/${eventId}/volunteer`, { userId: userData._id });
      alert('You have volunteered successfully!');
      fetchEvents(); // Refresh the event data
    } catch (error) {
      console.error('Error volunteering:', error);
    }
  };

  return (
    <div className="volunteer-matching-container">
      <h2>NGO Events</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Create Event'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="volunteer-matching-form">
          <label>
            Event Title:
            <input type="text" name="title" value={eventData.title} onChange={handleChange} />
          </label>
          
          <label>
            Description:
            <textarea name="description" value={eventData.description} onChange={handleChange} />
          </label>

          <label>
            Date:
            <input type="date" name="date" value={eventData.date} onChange={handleChange} />
          </label>

          <label>
            Latitude:
            <input type="number" name="latitude" value={eventData.latitude} onChange={handleChange} step="any" />
          </label>

          <label>
            Longitude:
            <input type="number" name="longitude" value={eventData.longitude} onChange={handleChange} step="any" />
          </label>

          <button type="submit">Create Event</button>
        </form>
      )}

      <h2>Available Events</h2>
      {events.length > 0 ? (
        <div>
          {userData && (
            <p><strong>Logged in as:</strong> {userData.fullName} (ID: {userData._id})</p>
          )}
          <ul>
            {events.map((event) => (
              <li key={event._id} style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> Lat: {event.latitude}, Lng: {event.longitude}</p>
                <p><strong>Volunteers:</strong> {event.volunteers.length}</p>
                <button onClick={() => handleVolunteer(event._id)}>Volunteer</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}
