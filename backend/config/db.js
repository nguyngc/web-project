
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use environment variable if available,
    // otherwise use local MongoDB for development
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/web-dev";

    // Connect to MongoDB
    const conn = await mongoose.connect(uri);

    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    // Show a clear error message if something goes wrong
    console.error("Failed to connect to MongoDB:", error.message);

    // Stop the app if the database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
