import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { dataCalendar } from './DataCalendar';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
   // eslint-disable-next-line no-unused-vars
   const [events, setEvents] = useState(dataCalendar);

   const EventTemplate = ({ event }) => {
      return (
         <div>
            <strong>{event.title}</strong>
            <p>Thời gian: {moment(event.start).format('DD/MM/YYYY HH:mm')}</p>
            <p>Địa điểm: {event.location}</p>
         </div>
      );
   };

   return (
      <div
         style={{
            overflow: 'hidden',
         }}
      >
         <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            style={{
               height: 'fit-content',
               padding: '1.5rem 2rem',
               overflow: 'auto',
               color: '#000',
               transform: 'scale(0.95)',
               fontWeight: 'bold',
               borderRadius: '5px',
               backgroundColor: '#fff',
            }}
            components={{
               event: EventTemplate,
            }}
         />
      </div>
   );
};

export default MyCalendar;
