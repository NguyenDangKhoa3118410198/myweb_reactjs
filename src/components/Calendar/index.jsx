import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { dataCalendar } from "./DataCalendar";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState(dataCalendar);

  const EventTemplate = ({ event }) => {
    return (
      <div>
        <strong>{event.title}</strong>
        <p>Thời gian: {moment(event.start).format("DD/MM/YYYY HH:mm")}</p>
        <p>Địa điểm: {event.location}</p>
      </div>
    );
  };

  return (
    <div style={{ overflow: "hidden", height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          padding: "1.5rem 2rem",
          overflow: "auto",
          height: 600,
          color: "#000",
          fontWeight: "bold",
          backgroundColor: "#fff",
        }}
        components={{
          event: EventTemplate,
        }}
      />
    </div>
  );
};

export default MyCalendar;
