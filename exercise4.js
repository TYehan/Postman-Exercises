// Exercise 4 - Library Book Search
// req holds the request from Postman; res sends the reply.
// Load Express so we can build our API.
const express = require("express");
// Create the app.
const app = express();
// Let the app read JSON sent from Postman.
app.use(express.json());

// Our starting data. Changes are lost when the server restarts.
let libraryBooks = [
  { id: 1, title: "C Programming Modern Approach", category: "Programming", available: true },
  { id: 2, title: "Database Systems", category: "Database", available: false },
  { id: 3, title: "Web Application Architecture", category: "Programming", available: true }
];

// GET: show all books, or filter them by category.
app.get("/api/books", (req, res) => {
  // Read the value after ?category= in the URL.
  const category = req.query.category;
  // If a category was supplied, return only matching books.
  if (category !== undefined) {
    return res.json(libraryBooks.filter(book => book.category === category));
  }
  // Without a category, return every book.
  res.json(libraryBooks);
});

// GET: find one record using the ID in the URL.
app.get("/api/books/:id", (req, res) => {
  // The URL ID is text, so convert it to a number before comparing.
  const book = libraryBooks.find(book => book.id === Number(req.params.id));
  // 404 means nothing was found. Return stops this request here.
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST: add a new record using the JSON body from Postman.
app.post("/api/books", (req, res) => {
  // Read the JSON fields. Use an empty object if no body was sent.
  const { title, category } = req.body ?? {};
  // Reject missing or blank text. trim() removes spaces at the ends.
  if (typeof title !== "string" || title.trim() === "" ||
      typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ message: "Title and category are required" });
  }
  const newBook = {
    // Use the next ID. This works here because we only add records.
    id: libraryBooks.length + 1,
    title: title.trim(),
    category: category.trim(),
    // For this example, new books start as available.
    available: true
  };
  // Save the new record in the array.
  libraryBooks.push(newBook);
  // 201 means created. Send the new record back to Postman.
  res.status(201).json(newBook);
});

// Start the server on port 3000. Run one exercise at a time.
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
