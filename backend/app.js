const express = require("express");
const app = express();
const userRouter = require('./routes/userRouter');

// Middleware to parse JSON
app.use(express.json());

// ROUTES
// Use the userRouter for all /users routes
app.use('/users', userRouter);



const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});