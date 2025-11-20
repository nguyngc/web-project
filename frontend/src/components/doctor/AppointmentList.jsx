import { Calendar, Clock, Eye, User, FileText, CheckCircle, XCircle, ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

function AppointmentList({ patientName, status, date, time, type, phone, notes }) {
  return (
    <div className="w-full">
            {/* Appointment Card */}
            <div
              className="border-l-4 border rounded-2xl p-4 flex flex-col lg:flex-row justify-between items-start gap-4"
              style={{ borderColor: status === "cancelled" ? "#B43F3F" : status === "confirmed" ? "#3F9C36" : "#159EEC" }}
            >
              {/* Left Side: Appointment Details */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-5">
                  <h3 className="text-[#101828] text-base">{patientName}</h3>
                  <div
                    className="px-2.5 py-0.5 rounded-lg"
                    style={{ backgroundColor: status === "cancelled" ? "#B43F3F" : status === "confirmed" ? "#3F9C36" : "#159EEC" }}
                  >
                    <span className="text-white text-xs font-medium">{status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#4A5565]" />
                    <span className="text-[#4A5565] text-sm">{date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#4A5565]" />
                    <span className="text-[#4A5565] text-sm">{phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#4A5565]" />
                    <span className="text-[#4A5565] text-sm">{type}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4A5565]" />
                    <span className="text-[#4A5565] text-sm">{time}</span>
                  </div>
                </div>

                {notes && (
                  <div className="bg-[#F9FAFB] rounded-lg p-3 flex items-start gap-2">
                    <span className="text-[#364153] text-sm font-bold">Notes:</span>
                    <span className="text-[#364153] text-sm">{notes}</span>
                  </div>
                )}
              </div>

              {/* Right Side: Action Buttons */}
              {status === "pending" && (
                <div className="flex flex-col gap-2 w-full lg:w-[120px]">
                  <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4 text-[#0A0A0A]" />
                    <span className="text-[#0A0A0A] text-sm font-medium">Add Notes</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#3F9C36] hover:bg-[#368230] transition-colors">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">Complete</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#B43F3F] hover:bg-[#9C3636] transition-colors">
                    <XCircle className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        
  );
}

AppointmentList.propTypes = {
  type: PropTypes.string.isRequired,
  patientName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  notes: PropTypes.string,
  status: PropTypes.oneOf(["confirmed", "pending", "cancelled"]).isRequired,
};

export default AppointmentList;
