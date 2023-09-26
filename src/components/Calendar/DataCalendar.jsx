import moment from "moment";

export const dataCalendar = [
  {
    title: "Event 1",
    start: moment().toDate(),
    end: moment().add(5, "hours").toDate(),
    location: "HO CHI MINH CITY",
  },
  {
    title: "Event 2",
    start: moment().add(1, "day").toDate(),
    end: moment().add(1, "day").add(2, "hours").toDate(),
    location: "HO CHI MINH CITY",
  },
  {
    title: "Meeting with Client A",
    start: moment().add(1, "day").toDate(),
    end: moment().add(1, "day").add(2, "hours").toDate(),
    location: "Conference Room 1",
  },
  {
    title: "Team Workshop",
    start: new Date(2023, 8, 28, 14, 0),
    end: new Date(2023, 8, 28, 16, 0),
    location: "Training Center",
  },
  {
    title: "Product Launch",
    start: new Date(2023, 8, 29, 9, 30),
    end: new Date(2023, 8, 29, 12, 0),
    location: "Event Hall",
  },
  {
    title: "Team Lunch",
    start: new Date(2023, 8, 30, 12, 30),
    end: new Date(2023, 8, 30, 13, 30),
    location: "Cafeteria",
  },
  {
    title: "Project Deadline",
    start: new Date(2023, 9, 1, 16, 0),
    end: new Date(2023, 9, 1, 18, 0),
    location: "Office",
  },
];
