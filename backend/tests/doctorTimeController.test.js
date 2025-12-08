// backend/tests/doctorTimeController.test.js
const mongoose = require("mongoose");
jest.mock("../models/doctorTimeModel");
const DoctorTime = require("../models/doctorTimeModel");

const ctrl = require("../controllers/doctorTimeController");

// Mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Helper: chainable thenable for populate()
const makeThenableChain = (value) => ({
  populate() { return this; },
  sort() { return Promise.resolve(value); },
  then(onFulfilled) { return Promise.resolve(value).then(onFulfilled); },
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DoctorTime Controller", () => {

  describe("getAll", () => {
    it("returns doctor times with filters", async () => {
      const req = { query: { userId: "u1", week: "2", status: "active" } };
      const res = mockRes();

      const fakeResult = [{ _id: "dt1", userId: "u1" }];
      DoctorTime.find.mockReturnValue({
        populate() { return this; },
        sort() { return Promise.resolve(fakeResult); }
      });

      await ctrl.getAll(req, res);

      expect(DoctorTime.find).toHaveBeenCalledWith({
        userId: "u1",
        week: "2",
        status: "active",
      });
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
  });

  describe("getById", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { doctorTimeId: "bad-id" } };
      const res = mockRes();

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid DoctorTime ID" });
    });

    it("returns 404 if not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { doctorTimeId: id } };
      const res = mockRes();

      DoctorTime.findById.mockReturnValue(makeThenableChain(null));

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Doctor time not found" });
    });

    it("returns doctorTime when found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { doctorTimeId: id } };
      const res = mockRes();

      const doctorTime = { _id: id, userId: "u1" };
      DoctorTime.findById.mockReturnValue(makeThenableChain(doctorTime));

      await ctrl.getById(req, res);

      expect(res.json).toHaveBeenCalledWith(doctorTime);
    });
  });

  describe("getByUserIdAndDate", () => {
    it("returns 400 for invalid userId", async () => {
      const req = { params: { userId: "bad", date: "2025-12-08" } };
      const res = mockRes();

      await ctrl.getByUserIdAndDate(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid User ID" });
    });

    it("returns 404 if schedule not found", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const req = { params: { userId, date: "2025-12-08" } };
      const res = mockRes();

      DoctorTime.findOne.mockReturnValue(makeThenableChain(null));

      await ctrl.getByUserIdAndDate(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Doctor time not found" });
    });

    it("returns schedule if found", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const req = { params: { userId, date: "2025-12-08" } };
      const res = mockRes();

      const schedule = { _id: "dt1", userId, date: "2025-12-08" };
      DoctorTime.findOne.mockReturnValue(makeThenableChain(schedule));

      await ctrl.getByUserIdAndDate(req, res);

      expect(res.json).toHaveBeenCalledWith(schedule);
    });
  });

  describe("getByUserIdAndDateForReschedule", () => {
    it("returns existing schedule if exists", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const req = { params: { userId, date: "2025-12-08" }, user: { role: "user", id: "u1" } };
      const res = mockRes();

      const schedule = { _id: "dt1", userId, date: "2025-12-08" };
      DoctorTime.findOne.mockReturnValue(makeThenableChain(schedule));

      await ctrl.getByUserIdAndDateForReschedule(req, res);

      expect(res.json).toHaveBeenCalledWith(schedule);
    });

    it("auto-creates schedule for admin/doctor", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const req = { params: { userId, date: "2025-12-08" }, user: { role: "admin", id: "admin1" } };
      const res = mockRes();

      DoctorTime.findOne.mockReturnValue(makeThenableChain(null));
      const created = { _id: "dt2", userId };
      DoctorTime.create.mockResolvedValue(created);

      await ctrl.getByUserIdAndDateForReschedule(req, res);

      expect(DoctorTime.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(created);
    });

    it("returns 404 for patient (cannot auto-create)", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const req = { params: { userId, date: "2025-12-08" }, user: { role: "user", id: "u1" } };
      const res = mockRes();

      DoctorTime.findOne.mockReturnValue(makeThenableChain(null));

      await ctrl.getByUserIdAndDateForReschedule(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Doctor time not found" });
    });
  });

  describe("create", () => {
    it("returns 400 if missing userId/date", async () => {
      const req = { body: { userId: "", date: "" }, user: { role: "admin", id: "a" } };
      const res = mockRes();

      await ctrl.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "userId & date are required" });
    });

    it("creates schedule successfully", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const req = { body: { userId, date: "2025-12-08" }, user: { role: "admin", id: "a" } };
      const res = mockRes();

      const created = { _id: "dt1", userId, date: "2025-12-08" };
      DoctorTime.create.mockResolvedValue(created);

      await ctrl.create(req, res);

      expect(DoctorTime.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });
  });

  describe("update", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { doctorTimeId: "bad" }, body: {}, user: { id: "a", role: "admin" } };
      const res = mockRes();

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid DoctorTime ID" });
    });

    it("returns 404 if schedule not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { doctorTimeId: id }, body: {}, user: { role: "admin", id: "a" } };
      const res = mockRes();

      DoctorTime.findById.mockResolvedValue(null);

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Doctor time not found" });
    });
  });

  describe("remove", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { doctorTimeId: "bad" }, user: { id: "a", role: "admin" } };
      const res = mockRes();

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid DoctorTime ID" });
    });

    it("deletes successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { doctorTimeId: id }, user: { id: "a", role: "admin" } };
      const res = mockRes();

      const current = { _id: id, deleteOne: jest.fn().mockResolvedValue(true), userId: "a" };
      DoctorTime.findById.mockResolvedValue(current);

      await ctrl.remove(req, res);

      expect(current.deleteOne).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
    });
  });

  describe("toggleSlot", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { doctorTimeId: "bad", slotName: "slot1" }, user: { id: "a", role: "admin" } };
      const res = mockRes();

      await ctrl.toggleSlot(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid DoctorTime ID" });
    });

    it("returns 400 for invalid slotName", async () => {
      const req = { params: { doctorTimeId: new mongoose.Types.ObjectId().toString(), slotName: "slotX" }, user: { id: "a", role: "admin" } };
      const res = mockRes();

      await ctrl.toggleSlot(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid slot name" });
    });

    it("toggles slot successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { doctorTimeId: id, slotName: "slot1" }, user: { id: "a", role: "admin" } };
      const res = mockRes();

      const schedule = { _id: id, userId: "a", availableTime: { slot1: false }, save: jest.fn().mockResolvedValue(true) };
      DoctorTime.findById.mockResolvedValue(schedule);

      await ctrl.toggleSlot(req, res);

      expect(schedule.availableTime.slot1).toBe(true);
      expect(schedule.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(schedule);
    });
  });

});
