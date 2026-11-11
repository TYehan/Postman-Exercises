// Exercise 5 - Doctor Appointment Booking
// req holds the request from Postman; res sends the reply.
// Load Express so we can build our API.
const express = require("express");
// Create the app.
const app = express();
// Let the app read JSON sent from Postman.
app.use(express.json());

// Our starting data. Changes are lost when the server restarts.
let appointments = [
  { id: 1, patientName: "Sunil Perera", doctorName: "Dr. Silva", date: "2026-11-15", timeSlot: "10:00 AM" }
];

// GET: send the full list back to Postman.
app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

// POST: add a new record using the JSON body from Postman.
app.post("/api/appointments", (req, res) => {
  // Read the JSON fields. Use an empty object if no body was sent.
  const { patientName, doctorName, date, timeSlot } = req.body ?? {};
  // The exercise leaves validation rules unspecified; require all fields.
  // Check that all four fields contain text.
  const fields = [patientName, doctorName, date, timeSlot];
  if (fields.some(value => typeof value !== "string" || value.trim() === "")) {
    return res.status(400).json({ message: "All four fields are required" });
  }
  // Read the date at midnight UTC so we can check it.
  const parsedDate = new Date(date + "T00:00:00Z");
  // Check YYYY-MM-DD and reject impossible dates, like February 30.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date) {
    return res.status(400).json({ message: "Use a valid date in YYYY-MM-DD format" });
  }
  // Accept a 12-hour time such as 10:00 AM or 02:30 PM.
  if (!/^(0?[1-9]|1[0-2]):[0-5]\d (AM|PM)$/.test(timeSlot)) {
    return res.status(400).json({ message: "Use a time such as 10:00 AM" });
  }
  const newAppointment = {
    // Use the next ID. This works here because we only add records.
    id: appointments.length + 1, patientName, doctorName, date, timeSlot
  };
  // Save the new record in the array.
  appointments.push(newAppointment);
  // 201 means created. Send the new record back to Postman.
  res.status(201).json(newAppointment);
});

// Start the server on port 3000. Run one exercise at a time.
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
