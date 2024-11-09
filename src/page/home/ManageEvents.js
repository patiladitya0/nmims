import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get('https://cap-server-1.onrender.com/hosted-events', {
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
        await axios.delete(`https://cap-server-1.onrender.com/events/${eventId}`, {
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

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    tabs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    tab: {
      padding: '10px 20px',
      border: 'none',
      background: '#f0f0f0',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    activeTab: {
      background: '#007bff',
      color: 'white',
    },
    eventCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '15px',
      overflow: 'hidden',
    },
    eventHeader: {
      padding: '15px',
      cursor: 'pointer',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eventTitle: {
      margin: '0',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    eventInfo: {
      display: 'flex',
      gap: '20px',
      fontSize: '14px',
      color: '#666',
      marginTop: '5px',
    },
    expandedContent: {
      padding: '15px',
      borderTop: '1px solid #ddd',
    },
    description: {
      marginBottom: '20px',
    },
    volunteersList: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
    },
    volunteer: {
      padding: '8px',
      backgroundColor: 'white',
      marginBottom: '8px',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    '@media (max-width: 768px)': {
      eventInfo: {
        flexDirection: 'column',
        gap: '5px',
      },
      container: {
        padding: '10px',
      },
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Manage Your Events</h1>
      
      <div style={styles.tabs}>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'active' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('active')}
        >
          Active Events
        </button>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'past' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('past')}
        >
          Past Events
        </button>
      </div>

      {loading ? (
        <div>Loading events...</div>
      ) : hostedEvents.length === 0 ? (
        <div>No events found</div>
      ) : (
        hostedEvents
          .filter(event => {
            const isPast = new Date(event.date) < new Date();
            return activeTab === 'past' ? isPast : !isPast;
          })
          .map(event => (
            <div key={event._id} style={styles.eventCard}>
              <div 
                style={styles.eventHeader}
                onClick={() => toggleEventDetails(event._id)}
              >
                <div>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <div style={styles.eventInfo}>
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>👥 {event.volunteers.length} volunteers</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>
                <span>{expandedEvent === event._id ? '▼' : '▶'}</span>
              </div>

              {expandedEvent === event._id && (
                <div style={styles.expandedContent}>
                  <div style={styles.description}>
                    <h4>Description</h4>
                    <p>{event.description}</p>
                  </div>

                  <div style={styles.volunteersList}>
                    <h4>Volunteers</h4>
                    {event.volunteers.length > 0 ? (
                      event.volunteers.map(volunteer => (
                        <div key={volunteer._id} style={styles.volunteer}>
                          <span>{volunteer.name}</span>
                          <span>{volunteer.email}</span>
                        </div>
                      ))
                    ) : (
                      <p>No volunteers yet</p>
                    )}
                  </div>

                  <button
                    style={styles.deleteButton}
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