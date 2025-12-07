import { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import RescheduleDialog from "../RescheduleDialog";
import AppointmentCard from "./AppoitmentCard";

const AppointmentList = ({ }) => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
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

  const handleAddNotes = (appt) => {
    setSelectedAppt(appt);
    setShowNotes(true);
  };

  const handleComplete = (appt) => {
    setAppointments(
      appointments.map((a) =>
        a._id === appt._id ? { ...a, status: "completed" } : a
      )
    );
    showMessage("Appointment marked as complete");
  };

  const handleCancel = (appt) => {
    setSelectedAppt(appt);
    setShowCancel(true);
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
    <div className="flex flex-col gap-4">
      <h1 className="text-[#0A0A0A] text-base font-medium">Appointment Schedule</h1>
      <p className="text-[#717182] text-base">View and manage all your appointments</p>
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
          <div className="flex flex-col gap-6">
            {pagedAppointments.map((appt) => (
              <AppointmentCard
                key={appt._id}
                appt={appt}
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
                  appointments.map((a) => (a._id === updated._id ? updated : a))
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
        </>
      )}
    </div>
  );
};
export default AppointmentList;
