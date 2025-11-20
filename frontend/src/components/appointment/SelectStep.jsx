import { useState } from "react";
import { Clock, CalendarDays, AlertCircle } from "lucide-react";
import Calendar from "../Calendar";
import { format, isToday } from "date-fns";
import { cn } from "../../lib/utils";

const timeSlots = [
  { id: "1", time: "9:00 AM - 10:00 AM", duration: "60 minutes", available: false },
  { id: "2", time: "10:00 AM - 11:00 AM", duration: "60 minutes", available: false },
  { id: "3", time: "11:00 AM - 12:00 AM", duration: "60 minutes", available: false },
  { id: "4", time: "2:00 PM - 3:00 PM", duration: "60 minutes", available: true },
  { id: "5", time: "3:00 PM - 4:00 PM", duration: "60 minutes", available: false },
  { id: "6", time: "4:00 PM - 5:00 PM", duration: "60 minutes", available: true },
];

export default function SelectStep({ onSelectSlot }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClick = (slot) => {
    if (!slot.available || !selectedDate) return;

    onSelectSlot({
      date: format(selectedDate, "EEEE, MMMM d, yyyy"),
      time: slot.time,
      doctor: "Dr. Smith",
      title: "Eye Checkup",
    });
  };

  const formattedDate = selectedDate
    ? format(selectedDate, "EEEE, MMMM d, yyyy")
    : "";

  const showTodayBadge = selectedDate && isToday(selectedDate);

  return (
    <section className="bg-[#F5F6FA] py-10 lg:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Info bar */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#4B5563]">
          <AlertCircle className="mt-0.5 h-4 w-4 text-[#6B7280]" />
          <p>
            Appointments are 60 minutes long. Please arrive 10 minutes early to
            complete any necessary paperwork. If you need to cancel or
            reschedule, please contact us at least 24 hours in advance.
          </p>
        </div>

        {/* Main cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Select Date */}
          <div className="flex flex-col gap-6 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#2563EB]" />
              <h2 className="text-[18px] font-semibold text-[#111827]">
                Select a Date
              </h2>
            </div>

            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            {/* Selected date panel */}
            <div className="rounded-2xl bg-[#EFF6FF] px-4 py-3">
              <div className="text-sm text-[#6B7280]">Selected Date:</div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {selectedDate ? (
                  <>
                    <span className="text-[15px] font-medium text-[#111827]">
                      {formattedDate}
                    </span>
                    {showTodayBadge && (
                      <span className="inline-flex items-center rounded-full bg-[#2563EB] px-2 py-0.5 text-xs font-medium text-white">
                        Today
                      </span>
                    )}
                  </>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-[#2563EB] px-2 py-0.5 text-xs font-medium text-white">
                    Today
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Time slots */}
          <div className="flex flex-col gap-6 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#2563EB]" />
                <h2 className="text-[18px] font-semibold text-[#111827]">
                  Available Time Slots
                </h2>
              </div>
              <p className="text-sm text-[#6B7280]">
                {selectedDate ? formattedDate : "No date selected"}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {timeSlots.map((slot) => {
                const isClickable = selectedDate && slot.available;

                return (
                  <div
                    key={slot.id}
                    onClick={() => handleClick(slot)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition",
                      isClickable
                        ? "border-[#E5E7EB] bg-white hover:border-[#2563EB] hover:shadow-sm"
                        : "border-[#E5E7EB] bg-[#F9FAFB] opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]">
                        <Clock className="h-5 w-5 text-[#2563EB]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-[#111827]">
                          {slot.time}
                        </span>
                        <span className="text-sm text-[#6B7280]">
                          {slot.duration}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                        slot.available
                          ? "border-[#16A34A] text-[#15803D] bg-[#ECFDF3]"
                          : "border-[#D1D5DB] text-[#6B7280] bg-white"
                      )}
                    >
                      {slot.available ? "Available" : "Booked"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 border-t border-[#E5E7EB] pt-4">
              <div className="flex items-center justify-between text-sm text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#9CA3AF]" />
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect section */}
        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-6">
          <h2 className="mb-4 text-[18px] font-semibold text-[#111827]">
            What to Expect at Your Appointment
          </h2>

          <div className="grid gap-6 md:grid-cols-3 text-sm text-[#4B5563]">
            <div>
              <h3 className="mb-1 text-[15px] font-semibold text-[#1D4ED8]">
                Comprehensive Eye Exam
              </h3>
              <p>
                Complete evaluation of your vision and eye health, including
                retinal imaging and pressure testing.
              </p>
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-semibold text-[#1D4ED8]">
                Expert Consultation
              </h3>
              <p>
                Discuss your vision concerns with our experienced optometrists
                and receive personalized recommendations.
              </p>
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-semibold text-[#1D4ED8]">
                Prescription &amp; Fitting
              </h3>
              <p>
                If needed, receive updated prescriptions and professional
                assistance with eyewear selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
