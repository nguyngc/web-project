import { useState } from "react";
import appointmentData from "../../data/appointments";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import RescheduleDialog from "../RescheduleDialog";
import AppointmentCard from "./AppointmentCard";

const Appointments = () => {
  const [appointments, setAppointments] = useState([...appointmentData]);
  const [search] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  // dialogs
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const itemsPerPage = 3;

  const filtered = appointments.filter(
    (a) =>
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
      appointments.map((a) => (a.id === updated.id ? updated : a))
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
        a.id === selectedAppt.id ? { ...a, status: "cancelled" } : a
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
            key={apt.id}
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
