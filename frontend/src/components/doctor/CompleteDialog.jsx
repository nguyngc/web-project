import React, { useState, useEffect } from "react";

const CompleteDialog = ({ show, appointment, onSave, onClose }) => {
  const [form, setForm] = useState({
    diagnosis: "",
    rightEye: "",
    leftEye: "",
    prescriptionNotes: "",
    doctorNotes: "",
    nextAppointment: "",
  });

  useEffect(() => {
    if (appointment) {
      setForm({
        diagnosis: appointment.diagnosis || "",
        rightEye: appointment.rightEye || "",
        leftEye: appointment.leftEye || "",
        prescriptionNotes: appointment.prescriptionNotes || "",
        doctorNotes: appointment.doctorNotes || "",
        nextAppointment: appointment.nextAppointment || "",
      });
    }
  }, [appointment]);

  if (!show || !appointment) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  const inputClass = 'w-full bg-gray-50 rounded-lg border border-gray-200 p-2';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-[9999]">
      <div className="bg-white max-w-2xl rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Complete Appointment</h2>

          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Diagnosis
            </label>
            <textarea
              className={inputClass}
              rows={2}
              value={form.diagnosis}
              onChange={(e) => handleChange("diagnosis", e.target.value)}
            />
          </div>

          {/* Eyes row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Right Eye
              </label>
              <input
                className={inputClass}
                value={form.rightEye}
                onChange={(e) => handleChange("rightEye", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Left Eye
              </label>
              <input
                className={inputClass}
                value={form.leftEye}
                onChange={(e) => handleChange("leftEye", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prescription Notes
            </label>
            <textarea
              className={inputClass}
              rows={2}
              value={form.prescriptionNotes}
              onChange={(e) => handleChange("prescriptionNotes", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor Notes
            </label>
            <textarea
              className={inputClass}
              rows={2}
              value={form.doctorNotes}
              onChange={(e) => handleChange("doctorNotes", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Next Appointment (optional)
            </label>
            <input
              type="date"
              className={inputClass}
              value={form.nextAppointment || ""}
              onChange={(e) => handleChange("nextAppointment", e.target.value)}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg text-sm text-white bg-[#2563EB] hover:bg-[#1D4ED8]`}
          >
            Save & Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteDialog;
