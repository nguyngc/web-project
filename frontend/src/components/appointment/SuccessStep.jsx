import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function SuccessStep({ appointment }) {
  return (
    <div className="w-full bg-[#F5F6FA] flex flex-col items-center justify-center px-4 py-10">

      {/* Green Success Badge */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#DCFCE7] mb-6">
        <span className="text-green-600 text-4xl font-bold">✔</span>
      </div>

      {/* Title */}
      <h1 className="text-[28px] md:text-3xl font-bold text-[#166534] mb-3 text-center">
        Appointment Confirmed!
      </h1>

      {/* Subtitle */}
      <p className="text-[#4B5563] text-center max-w-md mb-10">
        Your appointment has been successfully scheduled. A confirmation email has been sent with all the details.
      </p>

      {/* Appointment Details Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 w-full max-w-md mb-10">
        <div className="flex items-center gap-3 mb-4">
          <CalendarDays className="h-5 w-5 text-[#2563EB]" />
          <span className="text-[#1F2937] text-sm">{appointment.dateDisplay}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-[#2563EB]" />
          <span className="text-[#1F2937] text-sm">{appointment.time}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-[#2563EB]" />
          <span className="text-[#1F2937] text-sm">Myllypurontie 1, Helsinki</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-center gap-4">

        {/* Primary Button */}
        <Link
          to="/profile"
          state={{ tab: "appointments" }}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC]  
                     text-white rounded-xl text-sm font-medium shadow text-center"
        >
          View My Appointments
        </Link>

        {/* Secondary Button */}
        <Link
          to="/"
          className="w-full md:w-auto px-6 py-3 border border-[#D1D5DB] rounded-xl 
                     text-[#374151] text-sm text-center"
        >
          Back to Home
        </Link>

        {/* Print Button */}
        <button
          className="w-full md:w-auto px-6 py-3 border border-[#D1D5DB] rounded-xl 
                     text-[#374151] text-sm"
          onClick={() => window.print()}
        >
          Print Confirmation
        </button>

      </div>
    </div>
  );
}
