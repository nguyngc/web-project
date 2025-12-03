import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import StatusBox from "../common/StatusBox";

const AppointmentCard = ({ appt, onReschedule, onCancel }) => {
  const isRescheduleDisabled =
    appt.status === "completed" || appt.status === "cancelled";

  const isCancelDisabled = appt.status !== "pending" || appt.status === "scheduled"

  //  populate 
  const serviceName = appt.serviceId?.serviceName || appt.service || "";
  const doctorName = appt.doctorId
    ? `${appt.doctorId.firstName || ""} ${appt.doctorId.lastName || ""}`
    : "";


  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col items-start p-4 gap-4 bg-white border border-[#159EEC] border-l-4 rounded-[14px]">
        {/* Header: Service + Doctor + Status */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
          <div className="flex flex-col gap-2.5">
            <h4 className="text-base font-normal text-[#101828]">
              {serviceName}
            </h4>
            <p className="text-sm text-vision-text-light">{doctorName}</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-white" />
            <StatusBox
              variant={
                appt.status === "scheduled"
                  ? "scheduled"
                  : appt.status === "completed"
                    ? "completed"
                    : appt.status === "cancelled"
                      ? "cancelled"
                      : "inactive"
              }
            >
              {appt.status}
            </StatusBox>

          </div>
        </div>

        {/* Date + Time */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-vision-text-light" />
            <span className="text-sm text-vision-text-light">{appt.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-vision-text-light" />
            <span className="text-sm text-vision-text-light">{appt.time}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {/* Reschedule */}
          <button
            onClick={() => !isRescheduleDisabled && onReschedule(appt)}
            disabled={isRescheduleDisabled}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
              ${isRescheduleDisabled
                ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed opacity-50"
                : "border-vision-secondary text-vision-secondary hover:bg-vision-secondary/5 cursor-pointer"
              }
            `}
          >
            Reschedule
          </button>

          {/* Cancel */}
          <button
            onClick={() => !isCancelDisabled && onCancel(appt)}
            disabled={isCancelDisabled}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
              ${isCancelDisabled
                ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed opacity-50"
                : "border-vision-red text-vision-red hover:bg-vision-red/5 cursor-pointer"
              }
            `}
          >
            <XCircle className="w-4 h-4 inline-block mr-1" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
