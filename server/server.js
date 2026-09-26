require("dotenv").config();
const express = require("express");
const cors = require("cors");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = new Set(
  [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"].filter(Boolean)
);

function isAllowedOrigin(origin) {
  if (!origin || allowedOrigins.has(origin)) return true;

  try {
    const parsedOrigin = new URL(origin);
    return (
      parsedOrigin.protocol === "https:" &&
      parsedOrigin.hostname.startsWith("giridharan-portfolio") &&
      parsedOrigin.hostname.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

// Allow the frontend origin to call this API
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) return callback(null, true);
      const error = new Error("Origin is not allowed by CORS");
      error.status = 403;
      return callback(error);
    },
  })
);

app.use(express.json());

// Health check — useful for confirming the server is up after deployment
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running"
  });
});

app.use("/api/contact", contactRouter);

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler — never leak internals (e.g. SMTP credentials) to the client
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  const status = err.status === 403 ? 403 : 500;
  const message = status === 403 ? err.message : "Something went wrong. Please try again.";
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
