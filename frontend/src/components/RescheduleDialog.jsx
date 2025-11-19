import { useState } from "react";

const RescheduleDialog = ({ show, appointment, onSave, onCancel }) => {
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);

  if (!show) return null;

  const handleSave = () => {
    onSave({
      ...appointment,
      date,
      time
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-8">

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Reschedule Appointment
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Time</label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-lg"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default RescheduleDialog;
