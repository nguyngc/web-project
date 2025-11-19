import { Calendar, Clock, CheckCircle } from "lucide-react";
import PropTypes from "prop-types";

function AppointmentCard({ title, doctor, date, time, status }) {
  const statusColors = {
    confirmed: "bg-vision-green",
    pending: "bg-yellow-500",
    cancelled: "bg-vision-red",
  };

  const statusText = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  return (
    <div className="bg-white border-l-4 border-t border-r border-b border-vision-secondary rounded-[14px] p-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex flex-col gap-2.5">
          <h4 className="text-base font-normal text-[#101828]">{title}</h4>
          <p className="text-sm text-vision-text-light">{doctor}</p>
        </div>
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg ${statusColors[status]}`}>
          <CheckCircle className="w-3 h-3 text-white" />
          <span className="text-white text-xs font-medium">{statusText[status]}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-vision-text-light" />
          <span className="text-sm text-vision-text-light">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-vision-text-light" />
          <span className="text-sm text-vision-text-light">{time}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 rounded-lg border border-vision-secondary text-vision-secondary text-sm font-medium hover:bg-vision-secondary/5 transition">
          Reschedule
        </button>
        <button className="px-4 py-2 rounded-lg border border-vision-red text-vision-red text-sm font-medium hover:bg-vision-red/5 transition">
          Cancel
        </button>
      </div>
    </div>
  );
}
AppointmentCard.propTypes = {
  title: PropTypes.string.isRequired,
  doctor: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["confirmed", "pending", "cancelled"]).isRequired,
};
export default AppointmentCard
