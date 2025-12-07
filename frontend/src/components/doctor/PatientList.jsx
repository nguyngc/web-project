
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import PatientRow from "./PatientRow";
import PatientDetail from "../admin/PatientDetail";
import Pagination from "../common/Pagination";

const PatientList = ({ currentDoctorId }) => {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const itemsPerPage = 5;

  // ---------------------------
  // LOAD APPOINTMENTS FOR DOCTOR
  // ---------------------------
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await fetch(
          `/api/appointments?doctorId=${currentDoctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
    };
    loadAppointments();
  }, [currentDoctorId, token]);

  // ---------------------------
  // LOAD ALL PATIENT USERS
  // ---------------------------
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(`/api/users?role=user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };
    loadUsers();
  }, [token]);

  // ---------------------------
  // FILTER APPOINTMENTS BY DOCTOR
  // ---------------------------
  const doctorAppointments = useMemo(
    () => appointments.filter((apt) => apt.doctorId?._id === currentDoctorId),
    [appointments, currentDoctorId]
  );

  const getPatientAppointments = (patientId) =>
    doctorAppointments.filter((apt) => apt.userId?._id === patientId);

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

  // ---------------------------
  // BUILD UNIQUE PATIENT LIST
  // ---------------------------
  const patientRecords = useMemo(() => {
    const patientIds = Array.from(
      new Set(doctorAppointments.map((a) => a.userId?._id))
    );

    return patientIds
      .map((id) => {
        const patient = patients.find((u) => u._id === id);
        if (!patient) return null;

        return {
          patient,
          lastVisit: getLastVisit(id),
          latestCompleted: getLatestCompleted(id),
          appointments: getPatientAppointments(id),
        };
      })
      .filter(Boolean);
  }, [doctorAppointments, patients]);

  // ---------------------------
  // SEARCH
  // ---------------------------
  const filtered = patientRecords.filter((record) => {
    const name = `${record.patient.firstName} ${record.patient.lastName}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ---------------------------
  // PATIENT DETAIL VIEW
  // ---------------------------
  if (selectedPatientId) {
    const patientAppointments = doctorAppointments.filter(
      (a) => a.userId?._id === selectedPatientId
    );

    return (
      <PatientDetail
        patientId={selectedPatientId}
        appointments={patientAppointments}
        users={patients}
        onBack={() => setSelectedPatientId(null)}
        backLabel="Back to Patient List"
      />
    );
  }

  // ---------------------------
  // LIST VIEW
  // ---------------------------
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-base font-semibold text-[#111827]">Patient Records</h1>
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
            key={patient._id}
            patient={patient}
            lastVisit={lastVisit}
            latestCompleted={latestCompleted}
            onClick={() => setSelectedPatientId(patient._id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 px-4 py-6 text-center">
            No patients found.
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
