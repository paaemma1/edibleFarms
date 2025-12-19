import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Edible Farms API"
  });
});

// Contact inquiry
app.post("/api/inquiry", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false });
  }

  console.log("Inquiry:", req.body);
  res.json({ success: true });
});

// Order
app.post("/api/order", (req, res) => {
  const { name, phone, type, qty } = req.body;

  if (!name || !phone || !type || !qty) {
    return res.status(400).json({ success: false });
  }

  console.log("Order:", req.body);
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
