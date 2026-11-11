// Exercise 3 - Academic Course Grading
// req holds the request from Postman; res sends the reply.
// Load Express so we can build our API.
const express = require("express");
// Create the app.
const app = express();
// Let the app read JSON sent from Postman.
app.use(express.json());

// Our starting data. Changes are lost when the server restarts.
let studentResults = [
  { id: 1, name: "Saman", marks: 85, grade: "A" },
  { id: 2, name: "Kavindi", marks: 45, grade: "Fail" }
];

// GET: send the full list back to Postman.
app.get("/api/results", (req, res) => {
  res.json(studentResults);
});

// POST: add a new record using the JSON body from Postman.
app.post("/api/results", (req, res) => {
  // Read the name and marks sent from Postman.
  const { name, marks } = req.body;
  let grade;
  // Check the highest grade first, then work down.
  if (marks >= 75) grade = "A";
  else if (marks >= 65) grade = "B";
  else if (marks >= 50) grade = "C";
  else grade = "Fail";

  const newResult = { id: studentResults.length + 1, name, marks, grade };
  // Save the new record in the array.
  studentResults.push(newResult);
  // 201 means created. Send the new record back to Postman.
  res.status(201).json(newResult);
});

// Start the server on port 3000. Run one exercise at a time.
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
