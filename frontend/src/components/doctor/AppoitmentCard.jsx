import { Calendar, Clock, Eye, User, FileText, CheckCircle, XCircle } from "lucide-react";

const AppointmentCard = ({ appt, onAddNotes, onComplete, onCancel }) => {
  const borderColor =
    appt.status === "cancelled" ? "#B43F3F" : appt.status === "completed" ? "#3F9C36" : "#159EEC";

  return (
    <div
      className="flex flex-row justify-between items-start p-4 gap-4 w-full border rounded-[14px] border-l-[4px]"
      style={{ borderColor }}
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-row items-center gap-4">
          <h3 className="text-[#101828] text-base">{appt.patient}</h3>
          <div
            className="px-2.5 py-0.5 rounded-lg"
            style={{ backgroundColor: borderColor }}
          >
            <span className="text-white text-xs font-medium">{appt.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#4A5565]" />
            <span className="text-sm text-[#4A5565]">{appt.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#4A5565]" />
            <span className="text-sm text-[#4A5565]">{appt.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#4A5565]" />
            <span className="text-sm text-[#4A5565]">{appt.service}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#4A5565]" />
            <span className="text-sm text-[#4A5565]">{appt.phone}</span>
          </div>
        </div>

        {appt.notes && (
          <div className="bg-[#F9FAFB] rounded-lg p-3 flex items-start gap-2">
            <span className="text-[#364153] text-sm font-bold">Notes:</span>
            <span className="text-[#364153] text-sm">{appt.notes}</span>
          </div>
        )}
      </div>

      {/* Right Side: Actions */}
      {appt.status === "scheduled" && (
        <div className="flex flex-col gap-2 w-[120px]">
          <button
            onClick={() => onAddNotes(appt)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition"
          >
            <FileText className="w-4 h-4 text-[#0A0A0A]" />
            <span className="text-sm font-medium">Add Notes</span>
          </button>

          <button
            onClick={() => onComplete(appt)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#3F9C36] hover:bg-[#368230] transition"
          >
            <CheckCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Complete</span>
          </button>

          <button
            onClick={() => onCancel(appt)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#B43F3F] hover:bg-[#9C3636] transition"
          >
            <XCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Cancel</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
