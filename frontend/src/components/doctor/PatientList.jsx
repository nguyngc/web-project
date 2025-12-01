// src/components/PatientList.jsx
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import appointmentData from "../../data/appointments";
import userData from "../../data/users";
import PatientRow from './PatientRow';
import PatientDetail from '../admin/PatientDetail';
import Pagination from '../common/Pagination';

const PatientList = ({ currentDoctorId }) => {
  const [appointments] = useState([...appointmentData]);
  const [users] = useState([...userData]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const itemsPerPage = 5;

  // All appointments for this doctor
  const doctorAppointments = useMemo(
    () => appointments.filter((apt) => apt.doctorId === currentDoctorId),
    [appointments, currentDoctorId]
  );

  // Helper to get appointments for a patient (for this doctor only)
  const getPatientAppointments = (patientId) =>
    doctorAppointments.filter((apt) => apt.patientId === patientId);

  const getLastVisit = (patientId) => {
    const appts = getPatientAppointments(patientId).filter(
      (a) => a.status !== "cancelled"
    );
    if (!appts.length) return null;
    const latest = [...appts].sort((a, b) =>
      b.date.localeCompare(a.date)
    )[0];
    return latest.date;
  };

  const getLatestCompleted = (patientId) => {
    const completed = getPatientAppointments(patientId).filter(
      (a) => a.status === "completed"
    );
    if (!completed.length) return null;
    return [...completed].sort((a, b) =>
      b.date.localeCompare(a.date)
    )[0];
  };

  // Build unique patient records for this doctor
  const patientRecords = useMemo(() => {
    const patientIds = Array.from(
      new Set(doctorAppointments.map((a) => a.patientId))
    );

    return patientIds
      .map((id) => {
        const patient = users.find((u) => u.id === id && u.role === "user");
        if (!patient) return null;
        const lastVisit = getLastVisit(id);
        const latestCompleted = getLatestCompleted(id);
        const patientAppts = getPatientAppointments(id);
        return { patient, lastVisit, latestCompleted, appointments: patientAppts };
      })
      .filter(Boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorAppointments, users]);

  // Filter by search (patient name)
  const filtered = patientRecords.filter((record) => {
    const fullName = `${record.patient.firstName} ${record.patient.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleRowClick = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleBackFromDetail = () => {
    setSelectedPatientId(null);
  };

  // When a patient is selected → show detail page instead of list
  if (selectedPatientId) {
    const patientAppointments = doctorAppointments.filter(
      (a) => a.patientId === selectedPatientId
    );

    return (
      <PatientDetail
        patientId={selectedPatientId}
        appointments={patientAppointments}
        users={users}
        onBack={handleBackFromDetail}
        backLabel="Back to Patient List"
      />
    );
  }

  // List view
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-base font-semibold text-[#111827]">
          Patient Records
        </h1>
        <p className="text-sm text-gray-500">
          View patient details, history, and manage prescriptions
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#F3F3F5] rounded-lg">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search patients by name..."
          className="flex-1 bg-transparent outline-none text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {paginated.map(({ patient, lastVisit, latestCompleted }) => (
          <PatientRow
            key={patient.id}
            patient={patient}
            lastVisit={lastVisit}
            latestCompleted={latestCompleted}
            onClick={() => handleRowClick(patient.id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-6 text-center">
            No patients found for this doctor.
          </div>
        )}

        {filtered.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filtered.length}
            onPageChange={setPage}
            itemLabel="patients"
          />
        )}
      </div>
    </div>
  );
};

export default PatientList;
