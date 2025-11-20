import { useState } from "react";
import appointmentData from "../../data/appointments";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import RescheduleDialog from "../RescheduleDialog";
import AppointmentCard from "./AppoitmentCard";

const AppointmentList = ({ initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments || [...appointmentData]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const paginated = appointments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddNotes = (apt) => {
    setSelectedAppt(apt);
    setShowNotes(true);
  };

  const handleComplete = (apt) => {
    setAppointments(
      appointments.map((a) =>
        a.id === apt.id ? { ...a, status: "completed" } : a
      )
    );
    showMessage("Appointment marked as complete");
  };

  const handleCancel = (apt) => {
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
      <h1 className="text-[#0A0A0A] text-base font-medium">Appointment Schedule</h1>
      <p className="text-[#717182] text-base">View and manage all your appointments</p>
      {message && <InfoMessage message={message} onClose={() => setMessage(null)} />}
      <div className="flex flex-col gap-6">
        {paginated.map((apt) => (
          <AppointmentCard
            key={apt.id}
            appt={apt}
            onAddNotes={handleAddNotes}
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={appointments.length}
        onPageChange={setPage}
        itemLabel="appointments"
      />

      {/* Notes dialog */}
      {selectedAppt && (
        <RescheduleDialog
          show={showNotes}
          appointment={selectedAppt}
          onSave={(updated) => {
            setAppointments(
              appointments.map((a) => (a.id === updated.id ? updated : a))
            );
            showMessage("Notes added successfully");
            setShowNotes(false);
            setSelectedAppt(null);
          }}
          onCancel={() => setShowNotes(false)}
        />
      )}

      {/* Cancel dialog */}
      <ConfirmDialog
        show={showCancel}
        title="Cancel Appointment?"
        message={
          <>
            Are you sure you want to cancel the appointment?
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

export default AppointmentList;
