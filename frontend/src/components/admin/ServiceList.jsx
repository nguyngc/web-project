import { useState } from "react";
import { Plus, Search } from "lucide-react";
import servicesData from "../../data/services";
import ServiceRow from "./ServiceRow";
import ServiceForm from "./ServiceForm";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";

const ServiceList = () => {
  const [services, setServices] = useState([...servicesData]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const itemsPerPage = 5;

  const filtered = services.filter((svc) =>
    svc.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggleStatus = (id) => {
    setServices((prev) =>
      prev.map((svc) =>
        svc.id === id ? { ...svc, status: !svc.status } : svc
      )
    );
    showMessage("Service status updated.");
  };

  const handleMoveUp = (id) => {
    setServices((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx <= 0) return prev;

      const newArr = [...prev];
      [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];

      return newArr;
    });
    showMessage("Service order updated.");
  };

  const handleMoveDown = (id) => {
    setServices((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === prev.length - 1) return prev;

      const newArr = [...prev];
      [newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]];

      return newArr;
    });
    showMessage("Service order updated.");
  };

  const handleEdit = (svc) => {
    setSelectedService(svc);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setSelectedService(null);
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (selectedService) {
      // update
      setServices((prev) =>
        prev.map((svc) =>
          svc.id === selectedService.id
            ? { ...data, id: selectedService.id }
            : svc
        )
      );
      showMessage("Service updated successfully.");
    } else {
      // create
      setServices([
        {
          ...data,
          id: `svc-${Date.now()}`,
          order: services.length + 1
        },
        ...services
      ]);
      showMessage("Service created successfully.");
    }

    setShowForm(false);
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
          {paginated.map((svc, index) => {
            const globalIndex = services.findIndex(s => s.id === svc.id);
            const isFirst = globalIndex === 0;
            const isLast = globalIndex === services.length - 1;

            return (
              <ServiceRow
                key={svc.id}
                service={svc}
                onToggleStatus={handleToggleStatus}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onEdit={handleEdit}
                isFirst={isFirst}
                isLast={isLast}
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
