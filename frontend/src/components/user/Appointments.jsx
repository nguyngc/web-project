import { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import RescheduleDialog from "../common/RescheduleDialog";
import AppointmentCard from "./AppointmentCard";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // dialogs
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const token = localStorage.getItem("token");

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const loadAppointments = async () => {
    const userRaw = localStorage.getItem("currentUser");
    if (!userRaw) return;

    const currentUser = JSON.parse(userRaw);
    const userId = currentUser._id || currentUser.id;
    console.log(userId);
    if (!userId) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/appointments?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setAppointments(data);
      } else {
        showMessage(data.message || "Failed to load appointments", "error");
      }
    } catch (err) {
      console.error("load appointments error", err);
      showMessage("Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // ----------------- Actions -----------------

  const handleRescheduleClick = (appt) => {
    setSelectedAppt(appt);
    setShowReschedule(true);
  };

  const handleCancelClick = (appt) => {
    setSelectedAppt(appt);
    setShowCancel(true);
  };

  // called by RescheduleDialog when user picks new date/time
  const handleRescheduleSave = async ({ isoDate, displayDate, time, slotKey }) => {
    if (!selectedAppt) return;

    try {
      const res = await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ date: isoDate, time, slotKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || "Failed to reschedule", "error");
        return;
      }

      // SUCCESS — update UI
      setAppointments((prev) =>
        prev.map((a) => (a._id === data._id ? data : a))
      );
      showMessage("Appointment rescheduled successfully");

      // Close dialog
      setShowReschedule(false);
      setSelectedAppt(null);
    } catch (err) {
      console.error("reschedule error", err);
      showMessage("Network error", "error");
    }
  };


  const confirmCancel = async () => {
    if (!selectedAppt) return;

    try {
      const res = await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const data = await res.json();
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a._id === data._id ? data : a))
        );
        showMessage("Appointment cancelled");
      } else {
        showMessage(data.message || "Failed to cancel appointment", "error");
      }
    } catch (err) {
      console.error("cancel error", err);
      showMessage("Network error", "error");
    } finally {
      setShowCancel(false);
      setSelectedAppt(null);
    }
  };

  // ----------------- Pagination -----------------

  const itemsPerPage = 5;
  const totalPages =
    appointments.length === 0
      ? 1
      : Math.ceil(appointments.length / itemsPerPage);

  const pagedAppointments = appointments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-medium text-[#0A0A0A]">
          My Appointments
        </h1>
        <p className="text-sm text-[#717182]">
          View, reschedule or cancel your upcoming appointments
        </p>
      </div>

      {message && (
        <InfoMessage message={message} onClose={() => setMessage(null)} />
      )}

      {loading ? (
        <p className="text-sm text-[#717182]">Loading appointments...</p>
      ) : pagedAppointments.length === 0 ? (
        <p className="text-sm text-[#717182]">
          You have no appointments yet.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {pagedAppointments.map((appt) => (
              <AppointmentCard
                key={appt._id}
                appt={appt}
                onReschedule={() => handleRescheduleClick(appt)}
                onCancel={() => handleCancelClick(appt)}
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
        </>
      )}

      {/* Reschedule modal with full date/slot form */}
      <RescheduleDialog
        open={showReschedule}
        appointment={selectedAppt}
        onClose={() => {
          setShowReschedule(false);
          setSelectedAppt(null);
        }}
        onSave={handleRescheduleSave}
      />

      {/* Cancel confirm dialog */}
      <ConfirmDialog
        show={showCancel}
        title="Cancel appointment"
        message={
          <>
            Are you sure you want to cancel the appointment on{" "}
            <strong>{selectedAppt?.date}</strong> at{" "}
            <strong>{selectedAppt?.time}</strong>?
          </>
        }
        confirmText="Cancel appointment"
        confirmVariant="danger"
        onConfirm={confirmCancel}
        onCancel={() => setShowCancel(false)}
      />
    </div>
  );
};

export default Appointments;
