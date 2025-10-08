import React, { useState, useEffect } from 'react';
import Event from '../components/Event.jsx';
import '../css/LocationEvents.css';

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])
    useEffect(() => {
        (async () => {
            try {
            const res = await fetch(`http://localhost:3000/api/events/venue/${index}`);
            const data = await res.json();
            setEvents(data);

            // If you don't already have the location info, fetch that too:
            const locRes = await fetch(`http://localhost:3000/api/locations`);
            const locData = await locRes.json();
            const matched = locData.find(loc => loc.venue_id === Number(index));
            setLocation(matched);
            } catch (err) {
            console.error(err);
            }
        })();
        }, [index]);
    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>{location?.venue_name || ''}</h2>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.event_id}
                            id={event.event_id}
                            artist={event.artist}
                            date={event.date}
                            time={event.time}
                            image_url={event.image_url}
                            venue={location.venue_name}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents