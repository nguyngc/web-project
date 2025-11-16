const express = require("express");
const connectDB = require("./config/db"); 
const faqRoutes = require("./routes/faqRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require("./routes/articleCategoryRoutes");
const app = express();

connectDB(); 

app.use(express.json());
app.use("/faq", faqRoutes);
app.use("/articles", articleRoutes);
app.use("/banner", bannerRoutes);
app.use("/categories", categoryRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
