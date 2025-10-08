import React, { useState, useEffect } from 'react';
import LocationsAPI from '../services/LocationsAPI.jsx';
import '../css/Locations.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    })();
  }, []);

  return (
    <div className="available-locations">
      <h2>Choose a Venue</h2>

      <div className="venue-buttons">
        {locations.map((venue) => (
          <a
            key={venue.venue_id}
            href={
              venue.venue_name === 'Madison Square Garden'
                ? '/msg'
                : venue.venue_name === 'Barclays Center'
                ? '/barclays'
                : '/metlifestadium'
            }
          >
            <button className="venue-button">
              {venue.venue_name}
            </button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Locations;
