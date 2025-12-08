const mongoose = require("mongoose");
jest.mock("../models/userModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const ctrl = require("../controllers/userController");

// Mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Helper to mock chainable Mongoose queries with proper promise
const mockQueryThenable = (result) => ({
  sort: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  then: jest.fn((cb) => Promise.resolve(result).then(cb)),
  catch: jest.fn().mockReturnThis(),
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("User Controller", () => {

  describe("getAll", () => {
    it("returns all users without query", async () => {
      const req = { query: {} };
      const res = mockRes();
      const users = [{ _id: "u1", firstName: "John" }];

      User.find.mockReturnValue(mockQueryThenable(users));

      await ctrl.getAll(req, res);

      expect(User.find).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("filters users by query, role and status", async () => {
      const req = { query: { q: "Jo", role: "doctor", status: "true" } };
      const res = mockRes();
      const users = [{ _id: "u2", firstName: "John", role: "doctor", status: true }];

      User.find.mockReturnValue(mockQueryThenable(users));

      await ctrl.getAll(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("getPublicDoctors", () => {
    it("returns active doctors with public info", async () => {
      const req = {};
      const res = mockRes();
      const doctors = [
        { _id: "d1", firstName: "Dr", role: "doctor", status: true }
      ];

      User.find.mockReturnValue(mockQueryThenable(doctors));

      await ctrl.getPublicDoctors(req, res);

      expect(User.find).toHaveBeenCalledWith({ role: "doctor", status: true });
      expect(res.json).toHaveBeenCalledWith(doctors);
    });
  });

  describe("getById", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { userId: "bad" } };
      const res = mockRes();

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid User ID" });
    });

    it("returns 404 if user not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { userId: id }, user: { id: "admin1", role: "admin" } };
      const res = mockRes();

      User.findById.mockReturnValue(mockQueryThenable(null));

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("returns user when found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { userId: id }, user: { id: "admin1", role: "admin" } };
      const res = mockRes();

      const user = { _id: id, firstName: "John" };
      User.findById.mockReturnValue(mockQueryThenable(user));

      await ctrl.getById(req, res);

      expect(User.findById).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

});
