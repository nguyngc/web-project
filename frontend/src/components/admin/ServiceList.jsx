import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import ServiceRow from "./ServiceRow";
import ServiceForm from "./ServiceForm";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";

import {
  getServices,
  createService,
  updateService,
  toggleService
} from "../../services/serviceService";


const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  const itemsPerPage = 5;

  const filtered = services.filter((svc) =>
    svc.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggleStatus = async (id) => {
    await toggleService(id);
    loadServices();
    // setServices((prev) =>
    //   prev.map((svc) =>
    //     svc.id === id ? { ...svc, status: !svc.status } : svc
    //   )
    // );
    showMessage("Service status updated.");
  };

  const handleEdit = (svc) => {
    setSelectedService(svc);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setSelectedService(null);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    if (selectedService) {
      await updateService(selectedService._id, data);
      showMessage("Service updated successfully.");
    } else {
      await createService(data);
      showMessage("Service created successfully.");
    }

    setShowForm(false);
    setSelectedService(null);
    loadServices();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-base font-semibold text-[#111827]">
            Services Management
          </h1>
          <p className="text-sm text-gray-500">
            View and manage all services
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] text-white text-sm"
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Cancel" : "Add New Service"}
          </button>
        )}
      </div>

      {/* Success Message */}
      {message && (
        <InfoMessage
          message={message}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Form */}
      {showForm && (
        <ServiceForm
          mode={selectedService ? "edit" : "add"}
          initialData={selectedService}
          onCancel={() => setShowForm(false)}
          onSubmit={handleSave}
        />
      )}

      {/* List */}
      {!showForm && (
        <div className="flex flex-col gap-4">

          {/* Search */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F3F3F5] rounded-lg">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Search services..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Rows */}
          {paginated.map((svc) => {
            return (
              <ServiceRow
                key={svc.id}
                service={svc}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
              />
            );
          })}

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(filtered.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={filtered.length}
            onPageChange={setPage}
            itemLabel="services"
          />
        </div>
      )}
    </div>
  );
};

export default ServiceList;
