// Exercise 6 - Canteen Food Orders
// req holds the request from Postman; res sends the reply.
// Load Express so we can build our API.
const express = require("express");
// Create the app.
const app = express();
// Let the app read JSON sent from Postman.
app.use(express.json());

// Our starting data. Changes are lost when the server restarts.
let menu = [
  { id: 1, item: "Rice and Curry", price: 250, stock: 15 },
  { id: 2, item: "Fish Bun", price: 80, stock: 30 },
  { id: 3, item: "Fruit Juice", price: 120, stock: 8 }
];
// Keep new orders here.
let orders = [];

// GET: send the full list back to Postman.
app.get("/api/menu", (req, res) => {
  res.json(menu);
});

// POST: add a new record using the JSON body from Postman.
app.post("/api/orders", (req, res) => {
  // Read the JSON fields. Use an empty object if no body was sent.
  const { itemId, quantity } = req.body ?? {};
  // Quantity must be a whole number greater than zero.
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be a positive integer" });
  }
  // Find the food item the student selected.
  const item = menu.find(item => item.id === itemId);
  // 404 means nothing was found. Return stops this request here.
  if (!item) return res.status(404).json({ message: "Menu item not found" });
  // Reject the order if there is not enough food left.
  if (item.stock < quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }
  // Subtract the ordered quantity from the stock.
  item.stock -= quantity;
  const newOrder = {
    orderId: orders.length + 1,
    item: item.item,
    quantity,
    // The bill is the price of one item times the quantity.
    totalBill: item.price * quantity
  };
  // Save the new record in the array.
  orders.push(newOrder);
  // 201 means created. Send the new record back to Postman.
  res.status(201).json(newOrder);
});

// Start the server on port 3000. Run one exercise at a time.
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
