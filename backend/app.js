const express = require("express");
const app = express();
const faqRoutes = require("./routes/faqRoutes");
const bannerRoutes = require("./routes/bannerRoutes")
    

app.use(express.json());
app.use("/faq", faqRoutes);
app.use("/banner", bannerRoutes);



// 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.listen(4000, () => console.log("API running on http://localhost:4000"));

