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
  const token = localStorage.getItem("token");

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/appointments?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAppointments(data);
        } else {
          showMessage(data.message || "Failed to fetch appointments", "error");
        }
      } catch (err) {
        showMessage("Network error", "error");
      }
    };

    if (user && token) fetchAppointments();
  }, [user, token]);

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

  // Reschedule
  const handleRescheduleClick = (apt) => {
    setSelectedAppt(apt);
    setShowReschedule(true);
  };

  const handleRescheduleSave = async (updatedFields) => {
    try {
      const res = await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields), // { date, time, userNotes }
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(
          appointments.map((a) => (a._id === data._id ? data : a))
        );
        showMessage("Appointment rescheduled successfully");
      } else {
        showMessage(data.message || "Failed to reschedule", "error");
      }
    } catch (err) {
      showMessage("Network error", "error");
    } finally {
      setShowReschedule(false);
      setSelectedAppt(null);
    }
  };

  // Cancel
  const handleCancelClick = (apt) => {
    setSelectedAppt(apt);
    setShowCancel(true);
  };

  const confirmCancel = async () => {
    try {
      const res = await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(
          appointments.map((a) => (a._id === data._id ? data : a))
        );
        showMessage("Appointment cancelled");
      } else {
        showMessage(data.message || "Failed to cancel", "error");
      }
    } catch (err) {
      showMessage("Network error", "error");
    } finally {
      setShowCancel(false);
      setSelectedAppt(null);
    }
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
