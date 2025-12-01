
import { Check, X } from "lucide-react";

const weekdays = [
  {
    day: "Monday", slots: [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: true },
    ]
  },
  {
    day: "Tuesday", slots: [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: false },
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: true },
    ]
  },
  {
    day: "Wednesday", slots: [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: true },
    ]
  },
  {
    day: "Thursday", slots: [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: true },
    ]
  },
  {
    day: "Friday", slots: [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: true },
    ]
  },
];

function Availability() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2.5 pb-6">
        <h1 className="text-[#0A0A0A] text-base font-medium">Manage Availability</h1>
        <p className="text-[#717182] text-base">
          Set your available time slots for patient bookings
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {weekdays.map((weekday) => (
          <div
            key={weekday.day}
            className="border border-black/10 rounded-lg p-4 flex flex-col gap-4"
          >
            <h3 className="text-[#101828] text-base capitalize">{weekday.day}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {weekday.slots.map((slot) => (
                <button
                  key={slot.time}
                  className={`px-3.5 py-3.5 rounded-lg border flex justify-between items-center transition-all ${slot.available
                    ? "bg-[#F0FDF4] border-[#3F9C36]"
                    : "bg-[#F3F4F6] border-[#D1D5DC]"
                    }`}
                >
                  <span className="text-[#0A0A0A] text-sm">{slot.time}</span>
                  {slot.available ? (
                    <Check className="w-4 h-4 text-[#00A63E]" />
                  ) : (
                    <X className="w-4 h-4 text-[#99A1AF]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Availability