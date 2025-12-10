import { CalendarClock, XCircle, CheckCircle } from "lucide-react";
import StatusBox from "../common/StatusBox";

const AppointmentRow = ({
  appt,
  onReschedule,
  onCancel,
  onDoctorClick,
  onPatientClick,
  onConfirm,       // thêm handler confirm
  isAdmin          // thêm flag admin
}) => {
  const isRescheduleDisabled =
    appt.status === "completed" || appt.status === "cancelled";

  const isCancelDisabled = appt.status !== "scheduled";

  const canConfirm = isAdmin && appt.status === "pending";

  return (
    <div className="
      flex flex-col md:flex-row 
      md:items-center 
      gap-2.5 px-1.5 py-3 
      border-b border-black/10
    ">
      {/* Patient */}
      <div
        className="flex-1 text-sm text-[#1C398E] cursor-pointer hover:underline"
        onClick={() => onPatientClick(appt.patientId)}
      >
        {appt.patientName}
      </div>

      {/* Doctor */}
      <div
        className="w-[120px] text-sm text-[#1C398E] cursor-pointer hover:underline"
        onClick={() => onDoctorClick(appt.doctorId)}
      >
        {appt.doctorName}
      </div>

      {/* Date + Time */}
      <div className="w-[130px] text-sm">
        {appt.date} — {appt.time}
      </div>

      {/* Service */}
      <div className="w-[150px] text-sm">
        {appt.serviceId?.serviceName}
      </div>

      {/* Status */}
      <div className="w-[85px]">
        <StatusBox variant={appt.status}>
          {appt.status
            ? appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
            : "Pending"}
        </StatusBox>
      </div>

      {/* Actions */}
      <div className="flex gap-2 w-[110px] mt-2 md:mt-0">
        {/* Confirm (Admin only) */}
        {canConfirm && (
          <button
            onClick={() => onConfirm(appt)}
            disabled={appt.status !== "pending"}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-green-50 hover:bg-green-100"
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
          </button>
        )}

        {/* Reschedule */}
        <button
          onClick={() => !isRescheduleDisabled && onReschedule(appt)}
          disabled={isRescheduleDisabled}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 transition
            ${isRescheduleDisabled
              ? "bg-gray-100 cursor-not-allowed opacity-50"
              : "bg-white hover:bg-gray-50 cursor-pointer"
            }
          `}
        >
          <CalendarClock className="w-4 h-4" />
        </button>

        {/* Cancel */}
        <button
          onClick={() => !isCancelDisabled && onCancel(appt)}
          disabled={isCancelDisabled}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 transition
            ${isCancelDisabled
              ? "bg-gray-100 cursor-not-allowed opacity-50"
              : "bg-white hover:bg-gray-50 cursor-pointer"
            }
          `}
        >
          <XCircle className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default AppointmentRow;
