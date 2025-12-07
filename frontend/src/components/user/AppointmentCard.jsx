import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import StatusBox from "../common/StatusBox";

const AppointmentCard = ({ appt, onReschedule, onCancel }) => {
  console.log(appt);

  const isRescheduleDisabled =
    appt.status === "completed" || appt.status === "confirmed" || appt.status === "cancelled";

  const isCancelDisabled =
    appt.status === "completed" || appt.status === "confirmed" || appt.status === "cancelled";

  const serviceName = appt.serviceId?.serviceName || appt.service || "";
  const doctorName = appt.doctorId
    ? `${appt.doctorId.firstName || ""} ${appt.doctorId.lastName || ""
      }`.trim()
    : "";

  return (
    <div className="flex flex-col items-start p-4 gap-4 bg-white border border-[#159EEC] border-l-4 rounded-[14px]">
      {/* Header: Service + Doctor + Status */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
        <div className="flex flex-col gap-2.5">
          <h4 className="text-base font-normal text-[#101828]">
            {serviceName || "Appointment"}
          </h4>
          {doctorName && (
            <p className="text-sm text-vision-text-light">{doctorName}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-white" />
          <StatusBox variant={appt.status}>
            {appt.status
              ? appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
              : "Pending"}
          </StatusBox>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex flex-col md:flex-row gap-3 text-sm text-[#4B5563]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#2563EB]" />
          <span>{appt.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2563EB]" />
          <span>{appt.time}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 w-full">
        <button
          type="button"
          disabled={isRescheduleDisabled}
          onClick={!isRescheduleDisabled ? onReschedule : undefined}
          className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition
            ${isRescheduleDisabled
              ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed opacity-50"
              : "border-[#155DFC] text-[#155DFC] hover:bg-[#155DFC]/5 cursor-pointer"
            }
          `}
        >
          <Calendar className="w-4 h-4 inline-block" />
          Reschedule
        </button>

        <button
          type="button"
          disabled={isCancelDisabled}
          onClick={!isCancelDisabled ? onCancel : undefined}
          className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition
            ${isCancelDisabled
              ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed opacity-50"
              : "border-vision-red text-vision-red hover:bg-vision-red/5 cursor-pointer"
            }
          `}
        >
          <XCircle className="w-4 h-4 inline-block" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
