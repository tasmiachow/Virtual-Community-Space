import React, { useState, useEffect } from 'react';
import Event from '../components/Event.jsx';
import '../css/Event.css';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3000/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    })();
  }, []);
  

  return (
    <div className="all-events">
      <h2>All Events</h2>
      {events.length > 0 ? (
        <div className="events-grid">
            {events.map(event => (
            <Event
                key={event.event_id}
                artist={event.artist}
                date={event.date}
                time={event.time}
                image_url={event.image_url}
                timezone={event.timezone}
            />
            ))}
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Events;
