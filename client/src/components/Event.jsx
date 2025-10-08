import React from 'react';
import '../css/Event.css';

const Event = ({ artist, date, time, image_url, timezone }) => {

   const formatDateTime = (dateString, timeString, tz) => {
        if (!dateString || !timeString) return '';

        // Convert the dateString to a date object and extract just YYYY-MM-DD
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return '';
        const formattedDate = dateObj.toISOString().split('T')[0]; // '2026-09-04'

        // Remove timezone from timeString if any
        const cleanedTime = timeString.split('+')[0];

        const iso = `${formattedDate}T${cleanedTime}`;
        const dateTime = new Date(iso);
        if (isNaN(dateTime.getTime())) {
            console.warn('Invalid dateTime:', iso);
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: tz || 'UTC',
        }).format(dateTime);
        };


  return (
    <article className='event-information'>
      <img src={image_url} alt={artist} />
      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{artist}</h3>
          <p><i className="fa-regular fa-calendar fa-bounce"></i>  {formatDateTime(date, time, timezone)}</p>
        </div>
      </div>
    </article>
  )
}

export default Event;