// backend/tests/serviceController.test.js
const mongoose = require("mongoose");
jest.mock("../models/serviceModel");
const Service = require("../models/serviceModel");

const ctrl = require("../controllers/serviceController");

// Mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Helper for chainable thenable
const makeThenableChain = (value) => ({
  sort() { return Promise.resolve(value); },
  then(onFulfilled) { return Promise.resolve(value).then(onFulfilled); },
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Service Controller", () => {

  describe("getAll", () => {
    it("returns all services without query", async () => {
      const req = { query: {} };
      const res = mockRes();

      const services = [{ _id: "s1", serviceName: "Service1" }];
      Service.find.mockReturnValue(makeThenableChain(services));

      await ctrl.getAll(req, res);

      expect(Service.find).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(services);
    });

    it("filters services by query and isActive", async () => {
      const req = { query: { q: "test", isActive: "true" } };
      const res = mockRes();

      const services = [{ _id: "s2", serviceName: "test service", isActive: true }];
      Service.find.mockReturnValue(makeThenableChain(services));

      await ctrl.getAll(req, res);

      expect(Service.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(services);
    });
  });

  describe("getById", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { serviceId: "bad" } };
      const res = mockRes();

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Service ID" });
    });

    it("returns 404 if not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id } };
      const res = mockRes();

      Service.findById.mockReturnValue(makeThenableChain(null));

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Service not found" });
    });

    it("returns service when found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id } };
      const res = mockRes();

      const service = { _id: id, serviceName: "S" };
      Service.findById.mockReturnValue(makeThenableChain(service));

      await ctrl.getById(req, res);

      expect(res.json).toHaveBeenCalledWith(service);
    });
  });

  describe("create", () => {
    it("returns 400 if missing serviceName", async () => {
      const req = { body: {}, user: { id: "admin1" } };
      const res = mockRes();

      await ctrl.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "serviceName is required" });
    });

    it("creates service successfully", async () => {
      const req = { body: { serviceName: "New Service" }, user: { id: "admin1" } };
      const res = mockRes();

      const created = { _id: "s1", serviceName: "New Service", createdBy: "admin1" };
      Service.create.mockResolvedValue(created);

      await ctrl.create(req, res);

      expect(Service.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });
  });

  describe("update", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { serviceId: "bad" }, body: {}, user: { id: "admin1" } };
      const res = mockRes();

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Service ID" });
    });

    it("returns 404 if service not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id }, body: {}, user: { id: "admin1" } };
      const res = mockRes();

      Service.findByIdAndUpdate.mockResolvedValue(null);

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Service not found" });
    });

    it("updates service successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id }, body: { serviceName: "Updated" }, user: { id: "admin1" } };
      const res = mockRes();

      const updated = { _id: id, serviceName: "Updated", modifiedBy: "admin1" };
      Service.findByIdAndUpdate.mockResolvedValue(updated);

      await ctrl.update(req, res);

      expect(Service.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("remove", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { serviceId: "bad" } };
      const res = mockRes();

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Service ID" });
    });

    it("returns 404 if service not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id } };
      const res = mockRes();

      Service.findByIdAndDelete.mockResolvedValue(null);

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Service not found" });
    });

    it("deletes service successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id } };
      const res = mockRes();

      Service.findByIdAndDelete.mockResolvedValue({ _id: id });

      await ctrl.remove(req, res);

      expect(Service.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
    });
  });

  describe("toggle", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { serviceId: "bad" }, user: { id: "admin1" } };
      const res = mockRes();

      await ctrl.toggle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Service ID" });
    });

    it("returns 404 if service not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id }, user: { id: "admin1" } };
      const res = mockRes();

      Service.findById.mockResolvedValue(null);

      await ctrl.toggle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Service not found" });
    });

    it("toggles isActive successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { serviceId: id }, user: { id: "admin1" } };
      const res = mockRes();

      const service = { _id: id, isActive: false, save: jest.fn().mockResolvedValue(true) };
      Service.findById.mockResolvedValue(service);

      await ctrl.toggle(req, res);

      expect(service.isActive).toBe(true);
      expect(service.modifiedBy).toBe("admin1");
      expect(service.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(service);
    });
  });

});
