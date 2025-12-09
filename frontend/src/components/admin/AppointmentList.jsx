import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import AppointmentRow from "./AppointmentRow";
import RescheduleDialog from "../common/RescheduleDialog";
import DoctorProfile from "./DoctorProfile";
import PatientDetail from "./PatientDetail";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  // dialogs
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const showList = !selectedPatientId && !selectedDoctorId;
  const itemsPerPage = 5;

  const token = localStorage.getItem("token");

  // ---------------- FETCH REAL DATA ------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const [apptRes, userRes] = await Promise.all([
          fetch("/api/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const apptData = await apptRes.json();
        const userData = await userRes.json();

        if (apptRes.ok && userRes.ok) {
          // Map data for use in AppointmentRow
          const mapped = apptData.map((a) => {
            const patient = userData.find((u) => u._id === a.userId._id);
            const doctor = userData.find((u) => u._id === a.doctorId._id);

            return {
              ...a,
              patientName: patient ? `${patient.firstName} ${patient.lastName}` : "Unknown",
              doctorName: doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown",
              patientId: a.userId._id,
              doctorId: a.doctorId._id,
              service: a.serviceName || a.serviceId?.serviceName || "Unknown",
            };
          });

          setUsers(userData);
          setAppointments(mapped);
        }
      } catch (err) {
        setMessage({ text: "Failed to load appointments", type: "error" });
      }
    };

    loadData();
  }, []);

  // ----------------- FILTERING ------------------------
  const filtered = appointments.filter((a) =>
    `${a.patientName} ${a.doctorName} ${a.service}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // ------------------ HANDLERS ------------------------
  const showMsg = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRescheduleClick = (apt) => {
    setSelectedAppt(apt);
    setShowReschedule(true);
  };

  const handleRescheduleSave = async (newData) => {
    try {
      const res = await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: newData.isoDate,
          time: newData.time,
          slotKey: newData.slotKey,
          status: "confirmed",
        }),
      });

      const updated = await res.json();
      if (!res.ok) throw updated;

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === updated._id
            ? {
              ...a,
              date: updated.date,
              time: updated.time,
              slotKey: updated.slotKey,
              dateDisplay: newData.displayDate,
            }
            : a
        )
      );

      showMsg("Appointment rescheduled successfully");
      setShowReschedule(false);
      setSelectedAppt(null);

    } catch (err) {
      showMsg(err.message || "Reschedule failed", "error");
    }
  };

  const handleCancelClick = (apt) => {
    setSelectedAppt(apt);
    setShowCancel(true);
  };

  const confirmCancel = async () => {
    try {
      const res = await fetch(`/api/appointments/${selectedAppt._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const data = await res.json();
      if (!res.ok) throw data;

      setAppointments((prev) =>
        prev.map((a) => (a._id === data._id ? data : a))
      );

      showMsg("Appointment cancelled");
    } catch (err) {
      showMsg(err.message || "Cancel failed", "error");
    }

    setShowCancel(false);
    setSelectedAppt(null);
  };
  const handleConfirmClick = async (apt) => {
    const res = await fetch(`/api/appointments/${apt._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "confirmed" }),
    });

    const updated = await res.json();
    if (res.ok) {
      setAppointments(prev =>
        prev.map(a => a._id === updated._id ? { ...a, status: updated.status } : a)
      );
      showMsg("Appointment confirmed as confirmed");
    } else {
      showMsg("Failed to confirm appointment", "error");
    }
  };


  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <h1 className="text-base font-medium text-[#0A0A0A]">Appointments Management</h1>
      <p className="text-base text-[#717182]">View and manage all appointments</p>

      {message && <InfoMessage message={message} onClose={() => setMessage(null)} />}

      {/* Search */}
      {showList && (
        <div className="flex items-center gap-2.5 px-4 py-2 bg-[#F3F3F5] rounded-lg">
          <Search className="w-4 h-4 text-[#99A1AF]" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="flex-1 bg-transparent text-sm text-[#717182] outline-none placeholder:text-[#717182]"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      )}

      {/* LIST VIEW */}
      {showList && (
        <div className="flex flex-col pt-3">
          {/* Table Header */}
          <div className="hidden md:flex items-start gap-2.5 px-1.5 py-2 border-b border-black/10 font-medium text-[#0A0A0A]">
            <div className="flex-1 text-sm">Patient</div>
            <div className="w-[150px] text-sm">Doctor</div>
            <div className="w-[130px] text-sm">Date Time</div>
            <div className="w-[150px] text-sm">Service</div>
            <div className="w-[85px] text-sm">Status</div>
            <div className="w-[70px] text-sm">Actions</div>
          </div>

          {/* Rows */}
          {paginated.map((apt) => (
            <AppointmentRow
              key={apt._id}
              appt={apt}
              onReschedule={handleRescheduleClick}
              onCancel={handleCancelClick}
              onConfirm={handleConfirmClick}   
              isAdmin={true}
              onPatientClick={() => setSelectedPatientId(apt.patientId)}
              onDoctorClick={() => setSelectedDoctorId(apt.doctorId)}
            />
          ))}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filtered.length}
            onPageChange={setPage}
            itemLabel="appointments"
          />
        </div>
      )}

      {/* PATIENT DETAIL */}
      {selectedPatientId && (
        <PatientDetail
          patientId={selectedPatientId}
          users={users}
          appointments={appointments}
          onBack={() => setSelectedPatientId(null)}
        />
      )}

      {/* DOCTOR PROFILE */}
      {selectedDoctorId && (
        <DoctorProfile
          doctorId={selectedDoctorId}
          users={users}
          onBack={() => setSelectedDoctorId(null)}
        />
      )}

      {/* Reschedule Dialog */}
      {selectedAppt && (
        <RescheduleDialog
          open={showReschedule}
          appointment={selectedAppt}
          onSave={handleRescheduleSave}
          onClose={() => setShowReschedule(false)}
        />
      )}

      {/* Cancel Confirmation */}
      <ConfirmDialog
        show={showCancel}
        title="Cancel Appointment?"
        message={
          <>
            Are you sure you want to cancel appointment for{" "}
            <strong>{selectedAppt?.patientName}</strong>?
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
