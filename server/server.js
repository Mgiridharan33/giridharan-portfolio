require("dotenv").config();
const express = require("express");
const cors = require("cors");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = new Set(
  [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"].filter(Boolean)
);

// Allow the frontend origin to call this API
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS"));
    },
  })
);

app.use(express.json());

// Health check — useful for confirming the server is up after deployment
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/contact", contactRouter);

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler — never leak internals (e.g. SMTP credentials) to the client
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
