import { Calendar, User, Stethoscope } from "lucide-react";

const PrescriptionDetail = ({ appt, onBack }) => {
  if (!appt) return null;

  return (
    <div className="flex flex-col gap-6 p-6 bg-white border border-[#159EEC] rounded-[14px]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#101828]">
          Prescription Detail
        </h2>
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-lg border border-[#159EEC] text-[#159EEC] text-sm font-medium hover:bg-[#159EEC]/5 transition"
        >
          Back
        </button>
      </div>

      {/* Patient + Doctor */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 text-sm text-[#4A5565]">
          <User className="w-4 h-4" />
          <span>Patient: {appt.patient}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#4A5565]">
          <Stethoscope className="w-4 h-4" />
          <span>Doctor: {appt.doctor}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-col md:flex-row gap-4 text-sm text-[#4A5565]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Date: {appt.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Time: {appt.time}</span>
        </div>
        {appt.nextAppointment && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Next Appointment: {appt.nextAppointment}</span>
          </div>
        )}
      </div>

      {/* Diagnosis */}
      <div>
        <h3 className="text-sm font-medium text-[#101828]">Diagnosis</h3>
        <p className="text-sm text-[#4A5565]">
          {appt.diagnosis || "No diagnosis available"}
        </p>
      </div>

      {/* Eye Prescription */}
      {(appt.rightEye || appt.leftEye) && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[#101828]">Eye Prescription</h3>
          <div className="flex flex-col md:flex-row gap-6 text-sm text-[#4A5565]">
            {appt.rightEye && (
              <div>
                <strong>Right Eye:</strong>{" "}
                SPH {appt.rightEye.sphere}, CYL {appt.rightEye.cylinder}, AXIS {appt.rightEye.axis}
              </div>
            )}
            {appt.leftEye && (
              <div>
                <strong>Left Eye:</strong>{" "}
                SPH {appt.leftEye.sphere}, CYL {appt.leftEye.cylinder}, AXIS {appt.leftEye.axis}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-[#101828]">Notes</h3>
        <p className="text-sm text-[#4A5565]">
          <strong>Prescription Notes:</strong>{" "}
          {appt.prescriptionNotes || "—"}
        </p>
        <p className="text-sm text-[#4A5565]">
          <strong>User Notes:</strong>{" "}
          {appt.userNotes || "—"}
        </p>
        <p className="text-sm text-[#4A5565]">
          <strong>Doctor Notes:</strong>{" "}
          {appt.doctorNotes || "—"}
        </p>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
