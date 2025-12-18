import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- EMAIL SETUP ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ---------------- TEMP STORAGE ----------------
let orders = [];
let inquiries = [];

// ---------------- ROOT ----------------
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Edible Farms API" });
});

// ---------------- CREATE ORDER ----------------
app.post("/api/order", async (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
    time: new Date().toISOString()
  };

  orders.push(newOrder);

  try {
    await transporter.sendMail({
      from: `"Edible Farms" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🟢 New Order Received",
      html: `
        <h3>New Order</h3>
        <p><strong>Name:</strong> ${newOrder.name}</p>
        <p><strong>Phone:</strong> ${newOrder.phone}</p>
        <p><strong>Order Type:</strong> ${newOrder.type}</p>
        <p><strong>Quantity:</strong> ${newOrder.qty} kg</p>
        <p><strong>Address:</strong> ${newOrder.address}</p>
      `
    });
  } catch (err) {
    console.error("Order email failed:", err);
  }

  res.json({ success: true });
});

// ---------------- CREATE INQUIRY ----------------
app.post("/api/inquiry", async (req, res) => {
  const newInquiry = {
    id: inquiries.length + 1,
    ...req.body,
    time: new Date().toISOString()
  };

  inquiries.push(newInquiry);

  try {
    await transporter.sendMail({
      from: `"Edible Farms" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Inquiry",
      html: `
        <h3>New Inquiry</h3>
        <p><strong>Name:</strong> ${newInquiry.name}</p>
        <p><strong>Email:</strong> ${newInquiry.email}</p>
        <p><strong>Message:</strong><br>${newInquiry.message}</p>
      `
    });
  } catch (err) {
    console.error("Inquiry email failed:", err);
  }

  res.json({ success: true });
});

// ---------------- ADMIN ----------------
app.get("/api/admin/orders", (req, res) => {
  res.json({ success: true, data: orders });
});

app.get("/api/admin/inquiries", (req, res) => {
  res.json({ success: true, data: inquiries });
});

// ---------------- START ----------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API running on port", PORT));
