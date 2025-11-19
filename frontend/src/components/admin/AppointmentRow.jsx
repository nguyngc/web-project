import { CalendarClock, XCircle } from "lucide-react";
import StatusBox from "../common/StatusBox";

const AppointmentRow = ({
  appt,
  onReschedule,
  onCancel,
  onDoctorClick,
  onPatientClick,
}) => {
  const isRescheduleDisabled =
    appt.status === "completed" || appt.status === "cancelled";

  const isCancelDisabled = appt.status !== "scheduled";

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
        {appt.patient}
      </div>

      {/* Doctor */}
      <div
        className="flex-1 md:w-[150px] text-sm text-[#1C398E] cursor-pointer hover:underline"
        onClick={() => onDoctorClick(appt.doctorId)}
      >
        {appt.doctor}
      </div>

      {/* Date + Time (grouped on mobile) */}
      <div className="flex md:block items-center gap-2 text-sm md:w-[130px]">
        <span>{appt.date}</span>
        <span className="md:hidden">—</span>
        <span>{appt.time}</span>
      </div>

      {/* Service */}
      <div className="flex-1 md:w-[150px] text-sm">
        {appt.service}
      </div>

      {/* Status */}
      <div className="md:w-[85px]">
        <StatusBox
          variant={
            appt.status === "scheduled"
              ? "scheduled"
              : appt.status === "completed"
              ? "completed"
              : "inactive"
          }
        >
          {appt.status}
        </StatusBox>
      </div>

      {/* Actions */}
      <div className="flex gap-2 md:w-[70px] mt-2 md:mt-0">

        {/* Reschedule */}
        <button
          onClick={() => !isRescheduleDisabled && onReschedule(appt)}
          disabled={isRescheduleDisabled}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 transition
            ${
              isRescheduleDisabled
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
            ${
              isCancelDisabled
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
