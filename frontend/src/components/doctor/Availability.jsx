import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

const SLOT_MAP = [
  { key: "slot1", time: "09:00 AM" },
  { key: "slot2", time: "10:00 AM" },
  { key: "slot3", time: "11:00 AM" },
  { key: "slot4", time: "02:00 PM" },
  { key: "slot5", time: "03:00 PM" },
  { key: "slot6", time: "04:00 PM" },
];

const slotMapToHour = {
  slot1: 9,
  slot2: 10,
  slot3: 11,
  slot4: 14,
  slot5: 15,
  slot6: 16,
};

// Generate Monday–Friday
function getCurrentWeek() {
  const today = new Date();
  const day = today.getDay(); // Sun=0, Mon=1
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

  const week = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push({
      date: d,
      label: d.toLocaleDateString("en-US", { weekday: "long" }),
      dateString: d.toISOString().split("T")[0],
    });
  }
  return week;
}

function getWeekNumber(dateString) {
  const date = new Date(dateString);
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);

  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const diff =
    target - firstThursday +
    (firstThursday.getDay() + 6) % 7 * 86400000;

  return 1 + Math.floor(diff / (7 * 86400000));
}

function Availability() {
  const [week, setWeek] = useState(getCurrentWeek());
  const [schedule, setSchedule] = useState({});
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userId = user._id || user.id;
  const token = localStorage.getItem("token");

  // Load availability for each day
  useEffect(() => {
    const loadAvailability = async () => {
      const currentWeekNumber = getWeekNumber(week[0].dateString);

      const res = await fetch(
        `/api/doctor-time/user/${userId}/week/${currentWeekNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const weeklyData = res.ok ? await res.json() : [];

      // Convert to map: date => record
      const map = {};
      for (const record of weeklyData) {
        map[record.date] = {
          id: record._id,
          availableTime: record.availableTime,
        };
      }

      // Ensure UI has data for all five days
      const result = {};
      for (let day of week) {
        if (map[day.dateString]) {
          result[day.dateString] = map[day.dateString];
        } else {
          result[day.dateString] = {
            id: null,
            availableTime: {
              slot1: true,
              slot2: true,
              slot3: true,
              slot4: true,
              slot5: true,
              slot6: true,
            },
          };
        }
      }

      setSchedule(result);
    };

    loadAvailability();
  }, [week, user._id]);

  // Toggle a slot and send to backend
  const toggleSlot = async (dateString, slotKey) => {
    const day = schedule[dateString];
    const updatedTime = {
      ...day.availableTime,
      [slotKey]: !day.availableTime[slotKey],
    };

    const doctorTimeId = day.id;
    const payload = {
      availableTime: updatedTime,
      date: dateString,
      doctorId: user._id,
      week: getWeekNumber(dateString),
    };

    // Update UI optimistically
    setSchedule({
      ...schedule,
      [dateString]: {
        ...day,
        availableTime: updatedTime,
      },
    });

    // Decide CREATE vs UPDATE
    if (doctorTimeId) {
      // UPDATE existing schedule
      await fetch(`/api/doctor-time/${doctorTimeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } else {
      // CREATE new schedule
      const res = await fetch("/api/doctor-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();

        // Update new ID in schedule
        setSchedule((prev) => ({
          ...prev,
          [dateString]: {
            id: created._id,
            availableTime: created.availableTime,
          },
        }));
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2.5 pb-6">
        <h1 className="text-[#0A0A0A] text-base font-medium">Manage Availability</h1>
        <p className="text-[#717182] text-base">
          Set your available time slots for patient bookings
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {week.map((day) => (
          <div
            key={day.dateString}
            className="border border-black/10 rounded-lg p-4 flex flex-col gap-4"
          >
            <h3 className="text-[#101828] text-base capitalize">
              {day.label} ({day.dateString})
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SLOT_MAP.map((slot) => {
                const dayData = schedule[day.dateString];
                const available = dayData?.availableTime?.[slot.key];

                // Determine if day is in the past
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const slotDate = new Date(day.dateString);
                slotDate.setHours(0, 0, 0, 0);

                const isPastDay = slotDate < today;

                // Determine if slot time is already passed today
                let isPastTime = false;
                if (!isPastDay && slotDate.getTime() === today.getTime()) {
                  const now = new Date();
                  const slotHour = slotMapToHour[slot.key]; // <-- FIXED

                  const slotTime = new Date(day.dateString);
                  slotTime.setHours(slotHour, 0, 0, 0);

                  isPastTime = slotTime < now;
                }


                // True disabled state
                const disabled = isPastDay || isPastTime;

                return (
                  <button
                    key={slot.key}
                    disabled={disabled}
                    onClick={() => !disabled && toggleSlot(day.dateString, slot.key)}
                    className={`px-3.5 py-3.5 rounded-lg border flex justify-between items-center transition-all
                      ${disabled
                        ? "opacity-50 cursor-not-allowed bg-gray-200 border-gray-300"
                        : available
                          ? "bg-[#F0FDF4] border-[#3F9C36]"
                          : "bg-[#F3F4F6] border-[#D1D5DC]"
                      }`}
                  >
                    <span className="text-[#0A0A0A] text-sm">{slot.time}</span>
                    {available ? (
                      <Check className="w-4 h-4 text-[#00A63E]" />
                    ) : (
                      <X className="w-4 h-4 text-[#99A1AF]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Availability;
