<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:5001/events');
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
      const response = await axios.get('http://localhost:5001/api/user/account', config);
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
      await axios.post('http://localhost:5001/create', eventData);
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
      await axios.post(`http://localhost:5001/${eventId}/volunteer`, { userId: userData._id });
      alert('You have volunteered successfully!');
      fetchEvents(); // Refresh the event data
    } catch (error) {
      console.error('Error volunteering:', error);
    }
  };

  return (
    <div>
      <h2>NGO Events</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Create Event'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
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
=======
import React, { useState } from 'react';
import './VolunteerMatching.css';

export default function VolunteerMatching() {
  const [formData, setFormData] = useState({
    organizationName: '',
    headline: '',
    purpose: '',
    location: '',
    timeCommitment: '',
    volunteerBenefits: '',
    contactInfo: '',
    testimonials: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can add a submit function here to send formData to your backend
  };

  return (
    <div className="volunteer-matching-container">
      <h2>Advertise Your Volunteer Opportunity</h2>
      <form onSubmit={handleSubmit} className="volunteer-matching-form">
        <label>Organization Name:</label>
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder="Enter the NGO name"
          required
        />

        <label>Headline:</label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="Catchy title like 'Join Us to Make a Difference!'"
          required
        />

        <label>Purpose of the Volunteering:</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Describe the purpose and impact of this volunteer work"
          required
        ></textarea>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location of the activity"
          required
        />

        <label>Time Commitment:</label>
        <input
          type="text"
          name="timeCommitment"
          value={formData.timeCommitment}
          onChange={handleChange}
          placeholder="Duration (e.g., 4 hours per week)"
          required
        />

        <label>Benefits for Volunteers:</label>
        <textarea
          name="volunteerBenefits"
          value={formData.volunteerBenefits}
          onChange={handleChange}
          placeholder="Skill-building, networking, etc."
        ></textarea>

        <label>Contact Information:</label>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="Contact number, email, or website"
          required
        />

        <label>Testimonials or Success Stories:</label>
        <textarea
          name="testimonials"
          value={formData.testimonials}
          onChange={handleChange}
          placeholder="Brief quotes or success stories from past volunteers"
        ></textarea>

        <button type="submit">Submit Opportunity</button>
      </form>
>>>>>>> origin/HEAD
    </div>
  );
}
