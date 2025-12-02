const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const optionalAuth = require("./middleware/optionalAuth");

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/middleware"); // logger + 404 + error handler

dotenv.config();

// import routes
const faqRoutes = require("./routes/faqRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const articleRoutes = require("./routes/articleRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorTimeRoutes = require("./routes/doctorTimeRoutes");

// controller chat AI
const chatAi = require("./controllers/chatAi");

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for all origins (frontend can run on any URL)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Log all incoming requests (method, path, body)
app.use(requestLogger);

// API routes
app.use("/api/faq", faqRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctor-time", doctorTimeRoutes);

// AI chat route
app.post("/api/chat-ai", optionalAuth, chatAi);

// Health check / root route
app.get("/", (req, res) => {
  res.send("Eye Clinic API is running");
});

// 404 handler for unknown endpoints
app.use(unknownEndpoint);

// Centralized error handler
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
