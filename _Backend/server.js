const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===== Mock Data for Testing =====
const notices = [
  {
    id: 1,
    title: "Exam Schedule Announced",
    message: "Final exams will be held from 10th September.",
    posted_by: 1,
    audience: "all",
    created_at: new Date()
  },
  {
    id: 2,
    title: "Sports Meet Registration",
    message: "Register before 25th August for the annual sports meet.",
    posted_by: 2,
    audience: "students",
    created_at: new Date()
  }
];

const events = [
  {
    id: 1,
    title: "Guest Lecture: AI in Health",
    description: "AI in healthcare trends",
    location: "Auditorium",
    date_time: "2025-08-20T10:00:00",
    organizer_id: 2,
    event_type: "technical",
    created_at: new Date()
  },
  {
    id: 2,
    title: "Cultural Fest",
    description: "Annual cultural celebration",
    location: "Main Hall",
    date_time: "2025-09-15T17:00:00",
    organizer_id: 3,
    event_type: "cultural",
    created_at: new Date()
  }
];

// ===== API Endpoints =====
app.get("/api/notices", (req, res) => {
  res.json(notices);
});

app.get("/api/events", (req, res) => {
  res.json(events);
});


app.post("/api/events", (req, res) => {
  const { title, description, location, date_time, organizer_id, event_type } = req.body;

  if (!title || !location || !date_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    description,
    location,
    date_time,
    organizer_id: organizer_id || 1, // fallback
    event_type: event_type || "general",
    created_at: new Date()
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});




// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
