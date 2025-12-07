import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import RescheduleDialog from "../common/RescheduleDialog";
import AppointmentCard from "./AppoitmentCard";
import CompleteDialog from "./CompleteDialog";

const AppointmentList = () => {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const id = currentUser?._id || currentUser?.id;

  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showCancel, setShowCancel] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const itemsPerPage = 3;

  // -----------------------------
  // LOAD APPOINTMENTS FROM API
  // -----------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/appointments?doctorId=${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
    };

    loadData();
  }, [token]);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // -----------------------------
  // COMPLETE APPOINTMENT
  // -----------------------------
  const handleComplete = async (apt) => {
    try {
      const res = await fetch(`/api/appointments/${apt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }),
      });

      const updated = await res.json();

      setAppointments((prev) =>
        prev.map((a) => (a._id === updated._id ? { ...a, ...updated } : a))
      );

      showMessage("Appointment marked as completed");
    } catch (err) {
      console.error(err);
      showMessage("Failed to update appointment", "error");
    }
  };

  // -----------------------------
  // CANCEL APPOINTMENT
  // -----------------------------
  const confirmCancel = async () => {
    try {
      const res = await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const updated = await res.json();

      setAppointments((prev) =>
        prev.map((a) => (a._id === updated._id ? { ...a, ...updated } : a))
      );

      showMessage("Appointment cancelled");
      setShowCancel(false);
      setSelectedAppt(null);
    } catch (err) {
      showMessage("Failed to cancel appointment", "error");
    }
  };

  // -----------------------------
  // RESCHEDULE APPOINTMENT
  // -----------------------------
  const handleRescheduleSave = async (updatedData) => {
    try {
      // Update appointment
      await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: updatedData.isoDate,
          time: updatedData.time,
          slotKey: updatedData.slotKey,
          status: "confirmed"
        }),
      });

      // Fetch fully populated appointment
      const populatedRes = await fetch(`/api/appointments/${selectedAppt._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const populated = await populatedRes.json();

      setAppointments((prev) =>
        prev.map((a) => (a._id === populated._id ? populated : a))
      );

      showMessage("Appointment rescheduled successfully");
      setShowReschedule(false);
      setSelectedAppt(null);

    } catch (err) {
      console.error("Reschedule error:", err);
      showMessage("Failed to reschedule", "error");
    }
  };

  // -----------------------------
  // COMPLETE APPOINTMENT
  // -----------------------------
  const handleCompleteSave = async (fields) => {
    try {
      await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...fields,
          status: "completed"
        }),
      });

      // Fetch populated result
      const populatedRes = await fetch(`/api/appointments/${selectedAppt._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const populated = await populatedRes.json();

      setAppointments((prev) =>
        prev.map((a) => (a._id === populated._id ? populated : a))
      );

      showMessage("Appointment completed successfully");

      setShowComplete(false);
      setSelectedAppt(null);

    } catch (err) {
      console.error("Failed to complete:", err);
      showMessage("Failed to complete appointment", "error");
    }
  };

  // -----------------------------
  // PAGINATION
  // -----------------------------
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const paginated = appointments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[#0A0A0A] text-base font-medium">Appointment Schedule</h1>
      <p className="text-[#717182] text-base">View and manage your appointments</p>

      {message && <InfoMessage message={message} onClose={() => setMessage(null)} />}

      <div className="flex flex-col gap-6">
        {paginated.length === 0 && (
          <div className="text-sm text-gray-500 px-4 py-6 text-center">
            No appointment found.
          </div>
        )}

        {paginated.map((apt) => (
          <AppointmentCard
            key={apt._id}
            appt={apt}
            onComplete={(apt) => {
              setSelectedAppt(apt);
              setShowComplete(true);
            }}
            onCancel={(apt) => {
              setSelectedAppt(apt);
              setShowCancel(true);
            }}
            onReschedule={(apt) => {
              setSelectedAppt(apt);
              setShowReschedule(true);
            }}
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

      {/* Reschedule Dialog */}
      {selectedAppt && (
        <RescheduleDialog
          open={showReschedule}
          appointment={selectedAppt}
          onSave={handleRescheduleSave}
          onClose={() => setShowReschedule(false)}
        />
      )}

      {/* Complete Dialog */}
      {selectedAppt && (
        <CompleteDialog
          show={showComplete}
          appointment={selectedAppt}
          onSave={handleCompleteSave}
          onCancel={() => setShowComplete(false)}
        />
      )}


      {/* Cancel Dialog */}
      <ConfirmDialog
        show={showCancel}
        title="Cancel Appointment?"
        message="Are you sure you want to cancel this appointment?"
        confirmText="Cancel Appointment"
        confirmVariant="danger"
        onConfirm={confirmCancel}
        onCancel={() => setShowCancel(false)}
      />
    </div>
  );
};

export default AppointmentList;
