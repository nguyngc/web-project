import { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import RescheduleDialog from "../RescheduleDialog";
import AppointmentCard from "./AppointmentCard";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  // dialogs
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const itemsPerPage = 3;

  // fetch user
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/appointments?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAppointments(data);
        } else {
          setMessage({ text: data.message || "Failed to fetch appointments", type: "error" });
        }
      } catch (err) {
        setMessage({ text: "Network error", type: "error" });
      }
    };

    if (user) fetchAppointments();
  }, [user]);

  // Filter + paginate
  const filtered = appointments.filter((a) => {
    const doctorName = a.doctorId
      ? `${a.doctorId.firstName || ""} ${a.doctorId.lastName || ""}`.toLowerCase()
      : "";

    const serviceName = a.serviceId?.serviceName
      ? a.serviceId.serviceName.toLowerCase()
      : "";

    return (
      doctorName.includes(search.toLowerCase()) ||
      serviceName.includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRescheduleClick = (apt) => {
    setSelectedAppt(apt);
    setShowReschedule(true);
  };

  const handleRescheduleSave = (updated) => {
    setAppointments(
      appointments.map((a) => (a._id === updated._id ? updated : a))
    );
    showMessage("Appointment rescheduled successfully");
    setShowReschedule(false);
    setSelectedAppt(null);
  };

  const handleCancelClick = (apt) => {
    setSelectedAppt(apt);
    setShowCancel(true);
  };

  const confirmCancel = () => {
    setAppointments(
      appointments.map((a) =>
        a._id === selectedAppt._id ? { ...a, status: "cancelled" } : a
      )
    );
    showMessage("Appointment cancelled");
    setShowCancel(false);
    setSelectedAppt(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-medium text-[#0A0A0A]">Appointments</h1>
      </div>

      {message && (
        <InfoMessage message={message} onClose={() => setMessage(null)} />
      )}

      {/* Cards */}
      <div className="flex flex-col gap-6">
        {paginated.map((apt) => (
          <AppointmentCard
            key={apt._id}
            appt={apt}
            onReschedule={handleRescheduleClick}
            onCancel={handleCancelClick}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filtered.length}
        onPageChange={setPage}
        itemLabel="appointments"
      />

      {/* Reschedule dialog */}
      {selectedAppt && (
        <RescheduleDialog
          show={showReschedule}
          appointment={selectedAppt}
          onSave={handleRescheduleSave}
          onCancel={() => setShowReschedule(false)}
        />
      )}

      {/* Cancel dialog */}
      <ConfirmDialog
        show={showCancel}
        title="Cancel Appointment?"
        message={
          <>
            Are you sure you want to cancel the appointment at{" "}
            <strong>{selectedAppt?.date}</strong>?
          </>
        }
        confirmText="Cancel Appointment"
        confirmVariant="danger"
        onConfirm={confirmCancel}
        onCancel={() => setShowCancel(false)}
      />
    </div>
  );
};

export default Appointments;
