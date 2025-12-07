import { Calendar, Clock, Eye, FileText, CheckCircle, XCircle } from "lucide-react";
import StatusBox from "../common/StatusBox";

const AppointmentCard = ({ appt, onAddNotes, onComplete, onCancel, onReschedule }) => {
  const borderColor =
    appt.status === "cancelled"
      ? "#B43F3F"
      : appt.status === "completed"
        ? "#3F9C36"
        : "#159EEC";

  const patient = `${appt.userId?.firstName || ""} ${appt.userId?.lastName || ""}`.trim();
  const service = appt.serviceId?.serviceName || "Unknown Service";

  return (
    <div
      className="flex flex-row justify-between items-start p-4 gap-4 w-full border rounded-[14px] border-l-[4px]"
      style={{ borderColor }}
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-row items-center gap-4">
          <h3 className="text-[#101828] text-base">{patient}</h3>
          <div className="md:w-[85px]">
            <StatusBox variant={appt.status}>
              {appt.status
                ? appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
                : "Pending"}
            </StatusBox>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#4A5565]" />
            <span className="text-sm text-[#4A5565]">{appt.date}</span>
            <Clock className="w-4 h-4 text-[#4A5565]" />
            <span className="text-sm text-[#4A5565]">{appt.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#4A5565]" />
            <span className="text-sm text-[#4A5565]">{service}</span>
          </div>
        </div>

        {appt.doctorNotes && (
          <div className="bg-[#F9FAFB] rounded-lg p-3 flex items-start gap-2">
            <span className="text-[#364153] text-sm font-bold">Notes:</span>
            <span className="text-[#364153] text-sm">{appt.doctorNotes}</span>
          </div>
        )}
      </div>

      {/* Right Side Actions */}

      <div className="flex flex-col gap-2 w-[140px]">
        {appt.status === "pending" && (
          <button
            onClick={() => onReschedule(appt)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition"
          >
            <FileText className="w-4 h-4 text-[#0A0A0A]" />
            <span className="text-sm font-medium">Reschedule</span>
          </button>
        )}

        {appt.status === "scheduled" && (
          <button
            onClick={() => onComplete(appt)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#3F9C36] hover:bg-[#368230] transition"
          >
            <CheckCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Complete</span>
          </button>
        )}

        {appt.status === "pending" && (
          <button
            onClick={() => onCancel(appt)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#B43F3F] hover:bg-[#9C3636] transition"
          >
            <XCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Cancel</span>
          </button>

        )}
      </div>

    </div>
  );
};

export default AppointmentCard;
