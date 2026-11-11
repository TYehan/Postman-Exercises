// Exercise 2 - Student Attendance Logger
// req holds the request from Postman; res sends the reply.
// Load Express so we can build our API.
const express = require("express");
// Create the app.
const app = express();
// Let the app read JSON sent from Postman.
app.use(express.json());

// Our starting data. Changes are lost when the server restarts.
let attendance = [
  { id: 1, regNo: "AS2023001", studentName: "Kasun", present: true },
  { id: 2, regNo: "AS2023002", studentName: "Nimasha", present: false }
];

// GET: send the full list back to Postman.
app.get("/api/attendance", (req, res) => {
  res.json(attendance);
});

// GET: find one record using the ID in the URL.
app.get("/api/attendance/:id", (req, res) => {
  // The URL ID is text, so convert it to a number before comparing.
  const record = attendance.find(record => record.id === Number(req.params.id));
  // 404 means nothing was found. Return stops this request here.
  if (!record) return res.status(404).json({ message: "Attendance record not found" });
  res.json(record);
});

// POST: add a new record using the JSON body from Postman.
app.post("/api/attendance", (req, res) => {
  const newRecord = {
    // Use the next ID. This works here because we only add records.
    id: attendance.length + 1,
    regNo: req.body.regNo,
    studentName: req.body.studentName,
    // New attendance records always start as present.
    present: true
  };
  // Save the new record in the array.
  attendance.push(newRecord);
  // 201 means created. Send the new record back to Postman.
  res.status(201).json(newRecord);
});

// Start the server on port 3000. Run one exercise at a time.
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
