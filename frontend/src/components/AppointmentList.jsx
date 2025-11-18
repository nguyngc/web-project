import { useState } from "react";
import { Search } from "lucide-react";
import appointmentData from "../data/appointments";
import userData from "../data/users";
import Pagination from "./common/Pagination";
import InfoMessage from "./common/InfoMessage";
import ConfirmDialog from "./common/ComfirmDialog";
import AppointmentRow from "./AppointmentRow";
import RescheduleDialog from "./RescheduleDialog";
import DoctorProfile from "./DoctorProfile";
import PatientDetail from "./PatientDetail";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([...appointmentData]);
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

  const handlePatientClick = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleDoctorClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const handleBack = () => {
    setSelectedPatientId(null);
    setSelectedDoctorId(null);
  };

  // const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  // const [showPatientDetail, setShowPatientDetail] = useState(false);


  const itemsPerPage = 5;

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

      {message && <InfoMessage message={message} onClose={() => setMessage(null)} />}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-medium text-[#0A0A0A]">Appointments Management</h1>
        <p className="text-base text-[#717182]">
          View and manage all appointments
        </p>
      </div>

      {/* Search */}
      {showList && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F3F3F5] rounded-lg">
          <Search className="w-4 h-4 text-[#99A1AF]" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="flex-1 bg-transparent text-sm text-[#717182] outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      )}

      {/* Table */}
      {showList && (
        <div className="flex flex-col pt-3">
          {/* Header (desktop only) */}
          <div className="hidden md:flex items-start gap-2.5 px-1.5 py-2 border-b border-black/10 font-medium text-[#0A0A0A]">
            <div className="flex-1 text-sm">Patient</div>
            <div className="w-[150px] text-sm">Doctor</div>
            <div className="w-[85px] text-sm">Date</div>
            <div className="w-[40px] text-sm">Time</div>
            <div className="w-[150px] text-sm">Service</div>
            <div className="w-[85px] text-sm">Status</div>
            <div className="w-[70px] text-sm">Actions</div>
          </div>


          {/* Rows */}
          <div>
            {paginated.map((apt) => (
              <AppointmentRow
                key={apt.id}
                appt={apt}
                onReschedule={handleRescheduleClick}
                onCancel={handleCancelClick}
                onPatientClick={() => handlePatientClick(apt.patientId)}
                onDoctorClick={() => handleDoctorClick(apt.doctorId)}
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
        </div>
      )}

      {/* PATIENT DETAIL PAGE */}
      {selectedPatientId && (
        <PatientDetail
          patientId={selectedPatientId}
          appointments={appointmentData}
          users={userData}
          onBack={handleBack}
        />
      )}

      {/* DOCTOR PROFILE PAGE */}
      {selectedDoctorId && (
        <DoctorProfile
          doctorId={selectedDoctorId}
          users={userData}
          onBack={handleBack}
        />
      )}

      {/* {showDoctorProfile && (
        <DoctorProfile
          show={showDoctorProfile}
          doctor={selectedDoctor}
          onClose={() => setShowDoctorProfile(false)}
        />
      )}

      {showPatientDetail && (
        <PatientDetail
          show={showPatientDetail}
          patient={selectedPatient}
          onClose={() => setShowPatientDetail(false)}
        />
      )} */}

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
            Are you sure you want to cancel the appointment for{" "}
            <strong>{selectedAppt?.patient}</strong>?
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
