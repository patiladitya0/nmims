import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEvents.css';

const ManageEvents = () => {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHostedEvents();
  }, []);

  const fetchHostedEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/hosted-events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHostedEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hosted events:', error);
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchHostedEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const toggleEventDetails = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="manage-events-container">
      <h1 className="manage-events-header">Manage Your Events</h1>
      
      <div className="manage-events-tabs">
        <button 
          className={`manage-events-tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Events
        </button>
        <button 
          className={`manage-events-tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Events
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading events...</div>
      ) : hostedEvents.length === 0 ? (
        <div className="no-events">No events found</div>
      ) : (
        hostedEvents
          .filter(event => {
            const isPast = new Date(event.date) < new Date();
            return activeTab === 'past' ? isPast : !isPast;
          })
          .map(event => (
            <div key={event._id} className="event-card">
              <div 
                className="event-header"
                onClick={() => toggleEventDetails(event._id)}
              >
                <div>
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-info">
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>👥 {event.volunteers.length} volunteers</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>
                <span>{expandedEvent === event._id ? '▼' : '▶'}</span>
              </div>

              {expandedEvent === event._id && (
                <div className="expanded-content">
                  <div className="description">
                    <h4>Description</h4>
                    <p>{event.description}</p>
                  </div>

                  <div className="volunteers-list">
                    <h4>Volunteers</h4>
                    {event.volunteers.length > 0 ? (
                      event.volunteers.map(volunteer => (
                        <div key={volunteer._id} className="volunteer">
                          <span>{volunteer.name}</span>
                          <span>{volunteer.email}</span>
                        </div>
                      ))
                    ) : (
                      <p>No volunteers yet</p>
                    )}
                  </div>

                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event._id);
                    }}
                  >
                    Delete Event
                  </button>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default ManageEvents;
