const formatEye = (eye) => {
  if (!eye) return "No data";
  const { sphere, cylinder, axis } = eye;
  return `SPH: ${sphere ?? "-"}, CYL: ${cylinder ?? "-"}, AXIS: ${axis ?? "-"}`;
};

const PatientRow = ({ patient, lastVisit, latestCompleted, onClick }) => {
  const fullName = `${patient.firstName} ${patient.lastName}`;
  const lastVisitLabel = lastVisit
    ? new Date(lastVisit).toLocaleDateString()
    : "—";

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left"
    >
      <div
        className="
          bg-white rounded-2xl border-2 border-[#C9B5FF]
          px-4 py-4 md:px-5 md:py-5
          hover:shadow-md transition-shadow
        "
      >
        {/* Top row: name + last visit */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            {fullName}
          </h3>
          <span className="text-xs md:text-sm text-gray-500">
            Last Visit: {lastVisitLabel}
          </span>
        </div>

        {/* Email / phone */}
        <div className="mt-1 flex flex-col md:flex-row md:items-center md:justify-between gap-1 text-xs md:text-sm text-gray-600">
          <span>
            <span className="font-semibold">Email:</span>{" "}
            {patient.email || "—"}
          </span>
          <span>
            <span className="font-semibold">Phone:</span>{" "}
            {patient.phone || "—"}
          </span>
        </div>

        {/* Medical history */}
        <p className="mt-2 text-xs md:text-sm text-gray-700">
          <span className="font-semibold">Medical History:</span>{" "}
          {patient.medicalHistory || "No medical history on file."}
        </p>

        {/* Latest prescription */}
        <div className="mt-3 rounded-xl bg-[#F9F5FF] border border-[#E3D5FF] px-3 py-3 text-xs md:text-sm text-gray-800">
          <p className="font-semibold mb-1">Latest Prescription:</p>

          {latestCompleted ? (
            <>
              <div className="flex flex-wrap gap-4">
                <p>
                  <span className="font-semibold">Right Eye:</span>{" "}
                  {formatEye(latestCompleted.rightEye)}
                </p>
                <p>
                  <span className="font-semibold">Left Eye:</span>{" "}
                  {formatEye(latestCompleted.leftEye)}
                </p>
              </div>

              {latestCompleted.prescriptionNotes && (
                <p className="mt-1 text-xs text-gray-600">
                  <span className="font-semibold">Notes:</span>{" "}
                  {latestCompleted.prescriptionNotes}
                </p>
              )}
            </>
          ) : (
            <p className="text-xs text-gray-500">
              No completed prescriptions available yet.
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default PatientRow;
