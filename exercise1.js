// Exercise 1 - Book Store API
// req holds the request from Postman; res sends the reply.
// Load Express so we can build our API.
const express = require("express");
// Create the app.
const app = express();
// Let the app read JSON sent from Postman.
app.use(express.json());

// Our starting data. Changes are lost when the server restarts.
let books = [{ id: 1, title: "HTML & CSS", price: 1500 }];

// GET: send the full list back to Postman.
app.get("/api/books", (req, res) => {
  res.json(books);
});

// GET: find one record using the ID in the URL.
app.get("/api/books/:id", (req, res) => {
  // The URL ID is text, so convert it to a number before comparing.
  const book = books.find(book => book.id === Number(req.params.id));
  // 404 means nothing was found. Return stops this request here.
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST: add a new record using the JSON body from Postman.
app.post("/api/books", (req, res) => {
  const newBook = {
    // Use the next ID. This works here because we only add records.
    id: books.length + 1,
    title: req.body.title,
    price: req.body.price
  };
  // Save the new record in the array.
  books.push(newBook);
  // 201 means created. Send the new record back to Postman.
  res.status(201).json(newBook);
});

// Start the server on port 3000. Run one exercise at a time.
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
