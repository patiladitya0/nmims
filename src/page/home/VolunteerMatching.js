import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VolunteerMatching.css'; // Ensure this file is in the same directory

export default function VolunteerMatching() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    skillsRequired: '',
  });
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [locationResults, setLocationResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://cap-server-2.onrender.com/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('https://cap-server-2.onrender.com/api/user/account', config);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleLocationChange = async (e) => {
    const query = e.target.value;
    setEventData({ ...eventData, location: query });

    if (query.length > 2) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: { q: query, format: 'json', countrycodes: 'IN', addressdetails: 1, limit: 5 },
        });
        setLocationResults(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    } else {
      setLocationResults([]);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setEventData({ ...eventData, location: location.display_name });
    setLocationResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('https://cap-server-2.onrender.com/create', eventData, config);
      alert('Event created successfully!');
      setEventData({ title: '', description: '', date: '', location: '', skillsRequired: '' });
      fetchEvents();
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
      await axios.post(`https://cap-server-2.onrender.com/${eventId}/volunteer`, { userId: userData._id });
      alert('You have volunteered successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error volunteering:', error);
    }
  };

  return (
    <div className="volunteer-matching-container-unique">
      <h2>NGO Events</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Create Event'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="volunteer-matching-form-unique">
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
            Location:
            <input type="text" name="location" value={eventData.location} onChange={handleLocationChange} />
            {locationResults.length > 0 && (
              <ul className="location-suggestions-unique">
                {locationResults.map((location) => (
                  <li key={location.place_id} onClick={() => handleLocationSelect(location)}>
                    {location.display_name}
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label>
            Skills Required:
            <input type="text" name="skillsRequired" value={eventData.skillsRequired} onChange={handleChange} />
          </label>

          <button type="submit" className="volunteer-matching-button-unique">Create Event</button>
        </form>
      )}

      <h2>Available Events</h2>
      {events.length > 0 ? (
        <div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {events.map((event) => (
              <li key={event._id} style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
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
