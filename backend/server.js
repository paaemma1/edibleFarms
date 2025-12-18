import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// --- TEMP STORAGE (in-memory) ---
let orders = [];
let inquiries = [];

// --- ROOT ---
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Edible Farms API" });
});

// --- CREATE ORDER ---
app.post("/api/order", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
    time: new Date().toISOString()
  };

  orders.push(newOrder);
  console.log("New Order:", newOrder);

  res.json({ success: true, message: "Order received!" });
});

// --- CREATE INQUIRY ---
app.post("/api/inquiry", (req, res) => {
  const newInquiry = {
    id: inquiries.length + 1,
    ...req.body,
    time: new Date().toISOString()
  };

  inquiries.push(newInquiry);
  console.log("New Inquiry:", newInquiry);

  res.json({ success: true, message: "Inquiry submitted!" });
});

// --- ADMIN: GET ALL ORDERS ---
app.get("/api/admin/orders", (req, res) => {
  res.json({ success: true, data: orders });
});

// --- ADMIN: GET ALL INQUIRIES ---
app.get("/api/admin/inquiries", (req, res) => {
  res.json({ success: true, data: inquiries });
});

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API running on port", PORT));
