import { useState, useEffect } from "react";
import { Clock, CalendarDays, AlertCircle } from "lucide-react";
import Calendar from "../Calendar";
import { format, isToday } from "date-fns";
import { cn } from "../../lib/utils";

const SLOT_MAP = [
  { key: "slot1", time: "9:00 AM - 10:00 AM", duration: "60 minutes" },
  { key: "slot2", time: "10:00 AM - 11:00 AM", duration: "60 minutes" },
  { key: "slot3", time: "11:00 AM - 12:00 PM", duration: "60 minutes" },
  { key: "slot4", time: "2:00 PM - 3:00 PM", duration: "60 minutes" },
  { key: "slot5", time: "3:00 PM - 4:00 PM", duration: "60 minutes" },
  { key: "slot6", time: "4:00 PM - 5:00 PM", duration: "60 minutes" },
];

function isPastDate(date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  return d < now;
}

function isPastSlot(date, slotKey) {
  const now = new Date();

  const slotStartHour = {
    slot1: 9,
    slot2: 10,
    slot3: 11,
    slot4: 14,
    slot5: 15,
    slot6: 16,
  }[slotKey];

  const slotDate = new Date(date);
  slotDate.setHours(slotStartHour, 0, 0, 0);

  return slotDate < now;
}

export default function SelectStep({ onSelectSlot }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // fetch services từ backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services?isActive=true");
        const data = await res.json();
        if (res.ok) {
          setServices(data);
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  //fetch doctor
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/users/doctors/public", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setDoctors(data);
        }
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  //fetch doctor time
  useEffect(() => {
    const fetchDoctorTime = async () => {
      if (!selectedDoctor || !selectedDate) {
        setDoctorSchedule(null);
        return;
      }

      const dateStr = format(selectedDate, "yyyy-MM-dd");

      setLoadingSlots(true);

      try {
        const res = await fetch(`/api/doctor-time/user/${selectedDoctor._id}/date/${dateStr}`);
        if (res.ok) {
          const data = await res.json();
          setDoctorSchedule(data);
        } else {
          setDoctorSchedule(null); // doctor has no schedule for this day
        }
      } catch (err) {
        console.error("Failed to load doctor schedule", err);
        setDoctorSchedule(null);
      }

      setLoadingSlots(false);
    };

    fetchDoctorTime();
  }, [selectedDoctor, selectedDate]);


  const handleClick = (slot) => {
    if (!slot.available || !selectedDate || !selectedService || !selectedDoctor) return;

    onSelectSlot({
      date: format(selectedDate, "EEEE, MMMM d, yyyy"),
      time: slot.time,
      serviceId: selectedService._id,
      serviceName: selectedService.serviceName,
      doctorId: selectedDoctor._id,
      doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
      title: selectedService, // serviceName
      slotKey: slot.key, // send slot identifier to booking system
    });
  };

  const formattedDate = selectedDate
    ? format(selectedDate, "EEEE, MMMM d, yyyy")
    : "";

  const showTodayBadge = selectedDate && isToday(selectedDate);

  const activeSlots = SLOT_MAP.map((slot, index) => {
    const available = doctorSchedule?.availableTime?.[slot.key] || false;

    const pastSlot =
      selectedDate &&
      (isPastDate(selectedDate) ||
        (isToday(selectedDate) && isPastSlot(selectedDate, slot.key)));

    return {
      id: index + 1,
      key: slot.key,
      time: slot.time,
      duration: slot.duration,
      available: available && !pastSlot, // disable if in past
      isPast: pastSlot,
    };
  });


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

        {/* Service selection */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-[#111827] mb-2">
            Select a Service
          </h2>
          <select
            value={selectedService?._id || ""}
            onChange={(e) => {
              const svc = services.find((s) => s._id === e.target.value);
              setSelectedService(svc);
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">-- Choose a Service --</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.serviceName}
              </option>
            ))}
          </select>
          {selectedService && (
            <p className="mt-2 text-sm text-[#2563EB]">
              Selected: {selectedService.serviceName}
            </p>
          )}
        </div>

        {/* Doctor selection */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-[#111827] mb-2">
            Select a Doctor
          </h2>
          <select
            value={selectedDoctor?._id || ""}
            onChange={(e) => {
              const doc = doctors.find((d) => d._id === e.target.value);
              setSelectedDoctor(doc);
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">-- Choose a Doctor --</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.firstName} {d.lastName}
              </option>
            ))}
          </select>
          {selectedDoctor && (
            <p className="mt-2 text-sm text-[#2563EB]">
              Selected: {selectedDoctor.firstName} {selectedDoctor.lastName}
            </p>
          )}
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

            {loadingSlots ? (
              <p className="text-sm text-gray-500">Loading available time...</p>
            ) : !doctorSchedule ? (
              <p className="text-sm text-gray-500">
                No schedule available for this doctor on this date.
              </p>
            ) : null}

            <div className="flex flex-col gap-3">
              {activeSlots.map((slot) => {
                const isClickable = selectedDate && slot.available && !slot.isPast && selectedService && selectedDoctor;

                return (
                  <div
                    key={slot.id}
                    onClick={() => handleClick(slot)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-4 py-3 transition",
                      isClickable
                        ? "cursor-pointer border-[#E5E7EB] bg-white hover:border-[#2563EB] hover:shadow-sm"
                        : slot.isPast
                          ? "cursor-not-allowed bg-gray-200 border-gray-300 opacity-70"
                          : "cursor-not-allowed border-[#E5E7EB] bg-[#F9FAFB] opacity-60"
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
