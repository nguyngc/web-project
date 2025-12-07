import {
  ArrowLeft, User, Mail, Phone, Calendar, MapPin, AlertCircle, FileText,
  Heart, Shield, ClipboardList, Eye, Glasses, Download,
} from "lucide-react";
import StatusBox from "../common/StatusBox";

const PatientDetail = ({ patientId, appointments, users, onBack, backLabel = "Back" }) => {
  const patient = users.find(u => u._id === patientId);

  if (!patient) {
    return (
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
        <p className="mt-4 text-red-600 text-sm">Patient not found.</p>
      </div>
    );
  }

  // Load this patient's appointment history from appointments.js
  const patientAppointments = appointments?.filter(a => a.patientId === patientId) || [];
  const patientInitials = `${patient.firstName?.[0] || ""}${patient.lastName?.[0] || ""
    }`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </button>

      {/* Header Card */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 md:px-6 md:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-xl font-semibold">
              <User className="hidden md:block w-7 h-7" />
              <span className="md:hidden">{patientInitials}</span>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-sm text-gray-500">
                Patient ID: {patient._id}
              </p>
            </div>
          </div>

          <StatusBox variant={patient.status ? "active" : "inactive"}>
            {patient.status ? "Active" : "Inactive"}
          </StatusBox>
        </div>

        {/* Personal Information */}
        <div className="mt-8">
          <SectionTitle icon={<User className="w-4 h-4" />} title="Personal Information" />

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <InfoTile
              icon={<Mail className="w-4 h-4 text-gray-400" />}
              label="Email Address"
              value={patient.email}
            />
            <InfoTile
              icon={<Phone className="w-4 h-4 text-gray-400" />}
              label="Phone Number"
              value={patient.phone}
            />
            <InfoTile
              icon={<Calendar className="w-4 h-4 text-gray-400" />}
              label="Date of Birth"
              value={patient.dob}
            />
            <InfoTile
              icon={<MapPin className="w-4 h-4 text-gray-400" />}
              label="Address"
              value={patient.address}
            />
          </div>
        </div>

        {/* Divider */}
        {/* <div className="my-6 h-px bg-gray-100" /> */}

        {/* Medical Information */}
        {/* <div>
          <SectionTitle
            icon={<Heart className="w-4 h-4 text-red-500" />}
            title="Medical Information"
          />
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <PillCard
              color="red"
              icon={<Heart className="w-4 h-4 text-red-500" />}
              label="Blood Type"
              value={patient.bloodType}
            />
            <PillCard
              color="amber"
              icon={<AlertCircle className="w-4 h-4 text-amber-500" />}
              label="Allergies"
              value={patient.allergies}
            />
            <PillCard
              color="blue"
              icon={<FileText className="w-4 h-4 text-blue-500" />}
              label="Medical History"
              value={patient.medicalHistory}
            />
          </div>
        </div> */}

        {/* Divider */}
        {/* <div className="my-6 h-px bg-gray-100" /> */}

        {/* Emergency + Insurance */}
        {/* <div className="grid gap-6 md:grid-cols-2">
          <div>
            <SectionTitle
              icon={<AlertCircle className="w-4 h-4 text-amber-500" />}
              title="Emergency Contact"
            />
            <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 space-y-2">
              <InfoLine label="Contact Name" value={patient.emergencyContact} />
              <InfoLine label="Contact Phone" value={patient.emergencyPhone} />
            </div>
          </div>

          <div>
            <SectionTitle
              icon={<Shield className="w-4 h-4 text-emerald-500" />}
              title="Insurance Information"
            />
            <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 space-y-2">
              <InfoLine label="Provider" value={patient.insuranceProvider} />
              <InfoLine label="Policy Number" value={patient.insuranceNumber} />
            </div>
          </div>
        </div> */}
      </section>

      {/* Medical Records */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 md:px-6 md:py-6">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-900">
              Medical Records
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              Complete visit history and prescription records
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {patientAppointments.length === 0 && (
            <div className="rounded-2xl bg-gray-50 px-4 py-6 text-center text-gray-500 text-sm">
              This patient has no medical records yet.
            </div>
          )}

          {patientAppointments.map((visit) => (
            <div
              key={visit._id}
              className="rounded-2xl border border-gray-100 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.02)]"
            >
              <div
                className={`rounded-2xl border-l-4 ${visit.status === "completed"
                  ? "border-l-emerald-500"
                  : visit.status === "confirmed"
                    ? "border-l-blue-500"
                    : "border-l-gray-300"
                  } px-5 py-4 md:px-6 md:py-5`}
              >
                <VisitHeader visit={visit} />

                {visit.status !== "completed" ? (
                  <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600 border border-gray-100">
                    No prescription or diagnosis available for{" "}
                    <span className="font-medium">{visit.status}</span> appointment.
                  </div>
                ) : (
                  <VisitDetails visit={visit} />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientDetail;

/* ------------------------- Helper Components ------------------------- */

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2">
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
      {icon}
    </div>
    <h3 className="text-sm font-medium text-gray-900">{title}</h3>
  </div>
);

const InfoTile = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl bg-[#F7F7F9] px-4 py-3 text-sm">

    {/* Icon */}
    <div className="mt-1">
      {icon}
    </div>

    {/* Text */}
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="mt-1 text-sm font-medium text-gray-900">
        {value || "—"}
      </span>
    </div>

  </div>
);

const PillCard = ({ color, icon, label, value }) => {
  if (!value) return null;

  const colorMap = {
    red: "bg-red-50 border-red-100 text-red-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    blue: "bg-blue-50 border-blue-100 text-blue-700",
  };

  return (
    <div
      className={`flex flex-col gap-1 rounded-2xl border px-4 py-3 text-sm ${colorMap[color]}`}
    >
      <div className="flex items-center gap-2 text-xs font-medium">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-base font-semibold text-gray-900">{value}</span>
    </div>
  );
};

const InfoLine = ({ label, value }) => (
  <div className="text-sm">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-0.5 text-gray-900">{value || "—"}</p>
  </div>
);

const VisitHeader = ({ visit }) => {
  const statusColor =
    visit.status === "completed"
      ? "bg-emerald-50 text-emerald-700"
      : visit.status === "confirmed"
        ? "bg-blue-50 text-blue-700"
        : "bg-gray-100 text-gray-600";

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Eye className="w-4 h-4" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm md:text-base font-semibold text-gray-900">
              {visit.service}
            </h4>
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusColor}`}
            >
              {visit.status}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {visit.date}
            </span>
            {visit.doctor && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {visit.doctor}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VisitDetails = ({ visit }) => (
  <div className="mt-4 space-y-4">
    {/* Diagnosis */}
    <div className="rounded-xl bg-blue-50 px-4 py-3">
      <p className="text-xs text-gray-600 mb-1">Diagnosis</p>
      <p className="text-sm text-gray-900">{visit.diagnosis}</p>
    </div>

    {/* Notes */}
    {visit.userNotes && (
      <div className="rounded-xl bg-gray-50 px-4 py-3">
        <p className="text-xs text-gray-600 mb-1">Notes</p>
        <p className="text-sm text-gray-900">{visit.userNotes}</p>
      </div>
    )}

    {/* Prescription Issued */}
    {(visit.rightEye || visit.prescriptionNotes) && (
      <div className="pt-2 border-t border-gray-100">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <Glasses className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Prescription Issued
              </p>
              <p className="text-xs text-gray-500">
                {visit.service?.includes("Contact")
                  ? "Contacts"
                  : "Glasses"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        {visit.rightEye && (
          <div className="grid gap-3 md:grid-cols-2">
            <EyePrescriptionBox
              title="Right Eye (OD)"
              color="blue"
              data={visit.rightEye}
            />
            <EyePrescriptionBox
              title="Left Eye (OS)"
              color="green"
              data={visit.leftEye}
            />
          </div>
        )}

        {visit.prescriptionNotes && (
          <div className="mt-3 rounded-xl bg-purple-50 px-4 py-3">
            <p className="text-xs text-purple-700 mb-1">Prescription Notes</p>
            <p className="text-sm text-gray-900">{visit.prescriptionNotes}</p>
          </div>
        )}
      </div>
    )}
  </div>
);

const EyePrescriptionBox = ({ title, color, data }) => {
  const colorMap = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-emerald-50 border-emerald-100",
  };

  if (!data) return null;

  return (
    <div className={`rounded-xl border px-4 py-3 text-xs ${colorMap[color]}`}>
      <p className={color === "blue" ? "text-blue-700" : "text-emerald-700"}>
        {title}
      </p>
      <div className="mt-2 space-y-1 text-gray-800">
        <p>
          <span className="font-semibold">SPH:</span> {data.sphere}
        </p>
        <p>
          <span className="font-semibold">CYL:</span> {data.cylinder}
        </p>
        <p>
          <span className="font-semibold">AXIS:</span> {data.axis}°
        </p>
      </div>
    </div>
  );
};
