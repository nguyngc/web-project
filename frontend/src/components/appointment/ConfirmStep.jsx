import { CalendarDays, Clock, MapPin, CheckCircle2 } from "lucide-react";
import GradientButton from "../GradientButton";

export default function ConfirmStep({ user, appointment, setStep }) {
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          serviceId: appointment.serviceId,
          serviceName: appointment.serviceName,
          doctorId: appointment.doctorId,
          date: appointment.dateISO,
          time: appointment.time,
          status: "confirmed",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep(4);
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F6FA] py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <GradientButton
          onClick={() => setStep(1)}
          isFull={false}
        >
          ← Back to Appointment Selection
        </GradientButton>

        <h1 className="text-2xl font-semibold text-[#1F2B6C] mb-6 pt-5">
          Confirm Your Appointment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT — Appointment Summary */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#1F2B6C] mb-4">
              Appointment Summary
            </h2>

            {/* Date */}
            <div className="flex items-center gap-3 mb-3">
              <CalendarDays className="h-5 w-5 text-[#1D4ED8]" />
              <span className="text-[#1F2937]">{appointment.dateDisplay}</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-[#1D4ED8]" />
              <span className="text-[#1F2937]">{appointment.time}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="h-5 w-5 text-[#1D4ED8]" />
              <span className="text-[#1F2937]">Myllypurontie 1, Helsinki</span>
            </div>

            {/* Tag */}
            <span className="inline-block bg-[#E0F2FE] text-[#2563EB] px-3 py-1 rounded-md text-xs font-medium mb-4">
              {appointment.serviceName}
            </span>

            {/* Description */}
            <p className="text-sm text-[#4B5563] mb-4 leading-relaxed">
              60-minute appointment including vision testing, eye health evaluation,
              and optometrist consultation.
            </p>

            {/* Bullet Points */}
            <ul className="space-y-2 text-sm text-[#374151]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Visual acuity test
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Retinal examination
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Eye pressure measurement
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Prescription update (if needed)
              </li>
            </ul>

            {/* Info Box */}
            <div className="mt-5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-3 text-sm text-[#4B5563]">
              Please arrive 10 minutes early. Bring your insurance card and
              current eyewear if applicable.
            </div>

          </div>

          {/* RIGHT — User Info + Confirm */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#1F2B6C] mb-4">
              Patient Information
            </h2>

            <div className="space-y-2 text-sm text-[#374151] mb-6">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || "No phone provided"}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E7EB] my-4" />

            <h2 className="text-lg font-semibold text-[#1F2B6C] mb-4">
              Your Exam Includes:
            </h2>

            <ul className="space-y-2 text-sm text-[#374151] mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Full eye health check
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Vision prescription update
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Professional consultation
              </li>
            </ul>

            {/* Confirm button */}
            <GradientButton
              onClick={handleConfirm}
            >
              Confirm Appointment
            </GradientButton>

          </div>

        </div>
      </div>
    </div>
  );
}
