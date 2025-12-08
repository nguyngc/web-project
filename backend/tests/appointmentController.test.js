// backend/tests/appointmentController.test.js
const mongoose = require("mongoose");

// Mock the Appointment model used by the controller
jest.mock("../models/appointmentModel");
const Appointment = require("../models/appointmentModel");

const ctrl = require("../controllers/appointmentController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const makeThenableChain = (value) => {
  return {
    populate() {
      return this;
    },
    then(onFulfilled, onRejected) {
      return Promise.resolve(value).then(onFulfilled, onRejected);
    },
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Appointment Controller", () => {
  describe("getAll", () => {
    it("returns appointments for admin with query filters", async () => {
      const req = {
        query: { q: "check", userId: "u1" },
        user: { role: "admin", id: "admin1" },
      };
      const res = mockRes();

      // Simulate chainable query: find(...).populate(...).populate(...).populate(...).sort(...)
      const fakeResult = [{ _id: "a1", diagnosis: "checkup" }];
      const chain = {
        populate() { return this; },
        sort() { return Promise.resolve(fakeResult); },
      };
      Appointment.find.mockReturnValue(chain);

      await ctrl.getAll(req, res);

      expect(Appointment.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });

    it("returns appointments for doctor limited to their doctorId", async () => {
      const req = {
        query: {},
        user: { role: "doctor", id: "doc123" },
      };
      const res = mockRes();

      const fakeResult = [{ _id: "a2", doctorId: "doc123" }];
      const chain = {
        populate() { return this; },
        sort() { return Promise.resolve(fakeResult); },
      };
      Appointment.find.mockImplementation((filter) => {
        expect(filter.doctorId).toBe("doc123");
        return chain;
      });

      await ctrl.getAll(req, res);

      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
  });

  describe("getById", () => {
    it("returns 400 for invalid appointment id", async () => {
      const req = { params: { appointmentId: "bad-id" }, user: { role: "admin", id: "x" } };
      const res = mockRes();

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Appointment ID" });
    });

    it("returns 404 when appointment not found", async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      const req = { params: { appointmentId: validId }, user: { role: "admin", id: "x" } };
      const res = mockRes();

      Appointment.findById.mockReturnValue(makeThenableChain(null));

      await ctrl.getById(req, res);

      expect(Appointment.findById).toHaveBeenCalledWith(validId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Appointment not found" });
    });

    it("returns appointment for owner user", async () => {
      const userId = new mongoose.Types.ObjectId();
      const appointmentId = new mongoose.Types.ObjectId().toString();
      const req = { params: { appointmentId }, user: { role: "user", id: userId.toString() } };
      const res = mockRes();

      // appointment.userId may be a populated object with _id
      const appointment = {
        _id: appointmentId,
        userId: { _id: userId },
        doctorId: { _id: new mongoose.Types.ObjectId() },
        serviceId: null,
      };
      Appointment.findById.mockReturnValue(makeThenableChain(appointment));

      await ctrl.getById(req, res);

      expect(res.json).toHaveBeenCalledWith(appointment);
    });

    it("forbids user from viewing someone else's appointment", async () => {
      const userId = new mongoose.Types.ObjectId();
      const appointmentId = new mongoose.Types.ObjectId().toString();
      const req = { params: { appointmentId }, user: { role: "user", id: "differentUser" } };
      const res = mockRes();

      const appointment = {
        _id: appointmentId,
        userId: { _id: userId },
        doctorId: { _id: new mongoose.Types.ObjectId() },
        serviceId: null,
      };
      Appointment.findById.mockReturnValue(makeThenableChain(appointment));

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Forbidden: you can only view your own appointments",
      });
    });
  });

  describe("create", () => {
    it("returns 400 when required fields missing", async () => {
      const req = { body: { userId: "", doctorId: "", date: "", time: "" }, user: { role: "user", id: "u1" } };
      const res = mockRes();

      await ctrl.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "userId, doctorId, date and time are required",
      });
    });

    it("creates appointment for patient user and overrides userId", async () => {
      const validUserId = new mongoose.Types.ObjectId().toString();
      const req = {
        body: {
          userId: "someOther",
          doctorId: new mongoose.Types.ObjectId().toString(),
          date: "2025-01-01",
          time: "09:00",
        },
        user: { role: "user", id: validUserId },
      };
      const res = mockRes();

      const created = { _id: "created1", userId: validUserId, doctorId: req.body.doctorId };
      Appointment.create.mockResolvedValue(created);

      await ctrl.create(req, res);

      expect(Appointment.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });
  });

  describe("update", () => {
    it("returns 400 for invalid appointment id", async () => {
      const req = { params: { appointmentId: "bad-id" }, body: {}, user: { role: "admin", id: "a" } };
      const res = mockRes();

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Appointment ID" });
    });

    it("returns 404 when appointment not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { appointmentId: id }, body: {}, user: { role: "admin", id: "a" } };
      const res = mockRes();

      Appointment.findById.mockResolvedValue(null);

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Appointment not found" });
    });

    it("prevents user updating non-owned appointment", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = {
        params: { appointmentId: id },
        body: { date: "2025-01-02" },
        user: { role: "user", id: "userA" },
      };
      const res = mockRes();

      const current = { _id: id, userId: new mongoose.Types.ObjectId().toString(), doctorId: "doc" };
      Appointment.findById.mockResolvedValue(current);

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Forbidden: you can only update your own appointments",
      });
    });

    it("allows doctor to update medical fields", async () => {
      const doctorId = new mongoose.Types.ObjectId().toString();
      const id = new mongoose.Types.ObjectId().toString();
      const req = {
        params: { appointmentId: id },
        body: { diagnosis: "new dx", status: "completed" },
        user: { role: "doctor", id: doctorId },
      };
      const res = mockRes();

      const current = { _id: id, userId: "u1", doctorId };
      Appointment.findById.mockResolvedValue(current);
      const updated = { ...current, diagnosis: "new dx", status: "completed" };
      Appointment.findByIdAndUpdate.mockResolvedValue(updated);

      await ctrl.update(req, res);

      expect(Appointment.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("remove", () => {
    it("returns 400 for invalid appointment id", async () => {
      const req = { params: { appointmentId: "bad-id" }, user: { role: "admin", id: "a" } };
      const res = mockRes();

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Appointment ID" });
    });

    it("returns 404 when appointment not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { appointmentId: id }, user: { role: "admin", id: "a" } };
      const res = mockRes();

      Appointment.findByIdAndDelete.mockResolvedValue(null);

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Appointment not found" });
    });

    it("deletes appointment successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { appointmentId: id }, user: { role: "admin", id: "a" } };
      const res = mockRes();

      Appointment.findByIdAndDelete.mockResolvedValue({ _id: id });

      await ctrl.remove(req, res);

      expect(Appointment.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
    });
  });
});