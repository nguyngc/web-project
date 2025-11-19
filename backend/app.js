const express = require("express");
const connectDB = require("./config/db"); 
const dotenv = require('dotenv');

dotenv.config();

//import routes
const faqRoutes = require("./routes/faqRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require("./routes/articleCategoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const doctorInfoRoutes = require("./routes/doctorInfoRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorTimeRoutes = require("./routes/doctorTimeRoutes");
const chatAi = require("./controllers/chatAi");
const app = express();

connectDB(); 

app.use(express.json());
app.use("/api/faq", faqRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctor-info", doctorInfoRoutes);
app.use("/api/doctor-time", doctorTimeRoutes);
app.post("/api/chat-ai", chatAi);

app.get("/", (req, res) => {
  res.send("Eye Clinic API is running");
});

// 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
