const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Models
const Order = require("./models/Order"); // assume Order model already undi
const authRoutes = require("./routes/auth"); // signup + login
const auth = require("./middleware/auth");    // JWT middleware

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pizza_app")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

// 🔹 Test route
app.get("/data", (req, res) => {
  res.json({ message: "Hello from backend!", name: "Omkaareswari" });
});

// 🔹 Pizzas route
app.get("/pizzas", (req, res) => {
  res.json([
    { id: 1, name: "Margherita", price: 200 },
    { id: 2, name: "Pepperoni", price: 250 },
    { id: 3, name: "Veggie Delight", price: 220 }
  ]);
});

// 🔹 Signup/Login routes
app.use("/api/auth", authRoutes);

// 🔹 Save order (protected route)
app.post("/order", auth, async (req, res) => {
  const newOrder = new Order({
    items: req.body.items,
    total: req.body.total,
    userId: req.user.id // JWT middleware nundi
  });

  await newOrder.save();

  res.json({
    success: true,
    message: "Order saved in MongoDB ✅"
  });
});

// 🔹 Get orders (optional)
app.get("/orders", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

