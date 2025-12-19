import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// --- health check ---
app.get("/", (req, res) => {
  res.status(200).json({ ok: true });
});

// --- contact ---
app.post("/api/inquiry", (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    console.log("Inquiry:", req.body);
    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// --- order ---
app.post("/api/order", (req, res) => {
  try {
    const { name, phone, type, qty } = req.body;

    if (!name || !phone || !type || !qty) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    console.log("Order:", req.body);
    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// --- fallback (CRITICAL) ---
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
