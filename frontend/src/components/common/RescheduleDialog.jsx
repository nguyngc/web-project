import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

// Slot definitions
const SLOT_MAP = [
  { key: "slot1", label: "09:00 AM - 10:00 AM", hour: 9 },
  { key: "slot2", label: "10:00 AM - 11:00 AM", hour: 10 },
  { key: "slot3", label: "11:00 AM - 12:00 PM", hour: 11 },
  { key: "slot4", label: "02:00 PM - 03:00 PM", hour: 14 },
  { key: "slot5", label: "03:00 PM - 04:00 PM", hour: 15 },
  { key: "slot6", label: "04:00 PM - 05:00 PM", hour: 16 },
];

// Utility: today in YYYY-MM-DD format (no timezone shift)
const getTodayISO = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// Format for display on frontend (not stored)
const formatDisplayDate = (isoDate) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Date is past?
const isPastDate = (isoDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d = new Date(isoDate);
  d.setHours(0, 0, 0, 0);

  return d < today;
};

// Slot time is past?
const isPastSlot = (isoDate, hour) => {
  const now = new Date();
  const slotDate = new Date(isoDate);
  slotDate.setHours(hour, 0, 0, 0);
  return slotDate < now;
};

const RescheduleDialog = ({ open, appointment, onClose, onSave }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const role = currentUser.role;

  const doctorId =
    typeof appointment?.doctorId === "string"
      ? appointment.doctorId
      : appointment?.doctorId?._id;

  // Fix "yesterday" issue: do NOT use toISOString; use raw YYYY-MM-DD
  const initialISODate = (() => {
    if (!appointment?.date) return getTodayISO();

    // If backend gives ISO format already: "2025-12-05"
    if (/^\d{4}-\d{2}-\d{2}$/.test(appointment.date)) {
      return appointment.date;
    }

    // Otherwise parse human-readable date
    const parsed = new Date(appointment.date);
    if (!isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const m = String(parsed.getMonth() + 1).padStart(2, "0");
      const d = String(parsed.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    return getTodayISO();
  })();

  // Reactive state (hooks must always be called)
  const [selectedDate, setSelectedDate] = useState(initialISODate);
  const [selectedSlotKey, setSelectedSlotKey] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableTime, setAvailableTime] = useState(null); // doctorTime table
  const [bookedSlots, setBookedSlots] = useState([]); // appointments table

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // Keep selectedDate in sync when appointment changes
  useEffect(() => {
    setSelectedDate(initialISODate);
    setSelectedSlotKey(null);
  }, [initialISODate]);

  // -------------------------
  // LOAD DOCTOR AVAILABILITY
  // -------------------------
  useEffect(() => {
    const loadDoctorAvailability = async () => {
      if (!doctorId || !selectedDate) {
        setAvailableTime(null);
        return;
      }

      setLoadingSlots(true);

      try {
        const res = await fetch(
          `/api/doctor-time/user/${doctorId}/rescheduledate/${selectedDate}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (res.ok) {
          const data = await res.json();
          // availableTime is an object like {slot1:true, slot2:false,...}
          setAvailableTime(data.availableTime || {});
        } else {
          // No doctorTime entry — handle based on role
          if (role === "doctor" || role === "admin") {
            // They can reschedule into ANY future date → allow all slots
            setAvailableTime({
              slot1: true,
              slot2: true,
              slot3: true,
              slot4: true,
              slot5: true,
              slot6: true,
            });
          } else {
            // NORMAL USER → doctor has no schedule → disable all slots
            setAvailableTime({
              slot1: false,
              slot2: false,
              slot3: false,
              slot4: false,
              slot5: false,
              slot6: false,
            });
          }
        }
      } catch (err) {
        console.error("load doctorTime error", err);
        // No doctorTime entry — handle based on role
        if (role === "doctor" || role === "admin") {
          // They can reschedule into ANY future date → allow all slots
          setAvailableTime({
            slot1: true,
            slot2: true,
            slot3: true,
            slot4: true,
            slot5: true,
            slot6: true,
          });
        } else {
          // NORMAL USER → doctor has no schedule → disable all slots
          setAvailableTime({
            slot1: false,
            slot2: false,
            slot3: false,
            slot4: false,
            slot5: false,
            slot6: false,
          });
        }
      } finally {
        // don't clear loading here; bookedSlots effect finishes it
      }
    };

    loadDoctorAvailability();
  }, [doctorId, selectedDate]);

  // -------------------------
  // LOAD BOOKED APPOINTMENTS
  // -------------------------
  useEffect(() => {
    const loadBooked = async () => {
      if (!doctorId || !selectedDate) {
        setBookedSlots([]);
        return;
      }

      try {
        const res = await fetch(
          `/api/appointments?doctorId=${doctorId}&date=${selectedDate}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (res.ok) {
          const data = await res.json(); // ARRAY of appointments
          const slots = data
            .map((a) => a.slotKey) // slotKey stored in each appointment
            .filter(Boolean);
          setBookedSlots(slots);
        } else {
          setBookedSlots([]);
        }
      } catch (err) {
        console.error("load bookedSlots error", err);
        setBookedSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    loadBooked();
  }, [doctorId, selectedDate, token]);

  // SAVE selection
  const handleSave = () => {
    const slot = SLOT_MAP.find((s) => s.key === selectedSlotKey);
    if (!slot) return;

    onSave({
      isoDate: selectedDate,          // <-- backend date format
      displayDate: formatDisplayDate(selectedDate),  // <-- for UI only
      time: slot.label,
      slotKey: selectedSlotKey,
    });
  };

  if (!open || !appointment) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-1">
          Reschedule Appointment
        </h2>
        <p className="text-sm text-[#6B7280] mb-4">
          Choose a new date and time for your appointment.
        </p>

        {/* Current appointment */}
        <div className="mb-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-3 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="w-4 h-4 text-[#1D4ED8]" />
            <span>
              Current: {appointment.date} at {appointment.time}
            </span>
          </div>
        </div>

        {/* DATE PICKER */}
        <div className="mb-4">
          <label className="block text-sm text-[#4B5563] mb-1">
            Select date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm"
            value={selectedDate}
            min={getTodayISO()}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlotKey(null);
            }}
          />
        </div>

        {/* TIME SLOTS */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-[#1D4ED8]" />
            <span className="text-sm font-medium text-[#111827]">
              Available time slots
            </span>
          </div>

          {loadingSlots ? (
            <p className="text-xs text-[#6B7280]">Loading available slots…</p>
          ) : !availableTime ? (
            <p className="text-xs text-[#6B7280]">
              Select a date to view available time.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SLOT_MAP.map((slot) => {
                const baseAvailable = availableTime?.[slot.key];
                const past =
                  isPastDate(selectedDate) ||
                  isPastSlot(selectedDate, slot.hour);
                const booked = bookedSlots.includes(slot.key);

                const disabled = !baseAvailable || past || booked;
                const isSelected = selectedSlotKey === slot.key;

                return (
                  <button
                    key={slot.key}
                    disabled={disabled}
                    onClick={() => !disabled && setSelectedSlotKey(slot.key)}
                    className={`flex justify-between items-center rounded-lg border px-3 py-2 text-xs transition
                      ${disabled
                        ? booked
                          ? "border-red-300 bg-red-50 text-red-500 cursor-not-allowed opacity-70"
                          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                        : isSelected
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#E5E7EB] bg-white hover:border-[#2563EB]"
                      }
                    `}
                  >
                    <span>{slot.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50"
          >
            Close
          </button>

          <button
            onClick={handleSave}
            disabled={!selectedSlotKey}
            className={`px-4 py-2 rounded-lg text-sm text-white ${!selectedSlotKey
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#2563EB] hover:bg-[#1D4ED8]"
              }`}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleDialog;
