const User = require("../models/userModel");

// GET /users
const getAllUsers = (req, res) => {
  res.json({ message: "Hello from getAll" });
};

// POST /users
const createUser = (req, res) => {
  res.json({ message: "Hello from create" });
};

// GET /users/:userId
const getUserById = (req, res) => {
  res.json({ message: "Hello from getById" });
};

// PUT /users/:userId
const updateUser = (req, res) => {
  res.json({ message: "Hello from update" });
};

// DELETE /users/:userId
const deleteUser = (req, res) => {
  res.json({ message: "Hello from delete" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
