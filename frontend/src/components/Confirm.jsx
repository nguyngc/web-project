import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import AppointmentCard from "../components/user/AppointmentCard";

function ConfirmApp1() {
  const location = useLocation();
  const { service, doctor, date, time, status } = location.state || {};
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    const appointmentData = {
      patient: "John Smith",
      phone: "0123456789",
      service,
      doctor,
      date,
      time,
      status,
      notes: ""
    };

    let appointments = JSON.parse(localStorage.getItem("appointments"));
    if (!Array.isArray(appointments)) {
      appointments = [];
    }
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    setConfirmed(true);
  };

  return (
    <div className="flex flex-col gap-8 mx-auto">
      {/* Header */}
      <div className="flex-col items-start gap-[30px]  mx-auto p-6">
        {/* <Link
          to="/bookApp"
          className="flex flex-row justify-center items-center px-[13px] py-[8px] gap-[10px] w-[250px] h-[36px] bg-gradient-to-b from-[#159EEC]/50 to-[#159EEC] rounded-lg text-white text-sm font-medium leading-5 font-inter"
        >
          ← Back to Appointment Selection
        </Link> */}

        <h1 className="flex flex-row justify-center items-center gap-[10px] text-[#1F2B6C] text-2xl font-medium font-inter leading-6 mt-10">
          Confirm Your Appointment
        </h1>
      </div>

      {/* Appointment + Details */}
      <div className="mx-auto flex flex-col md:flex-row ">
        <div className=" flex-1 bg-white border-l-4 border-t border-r border-b border-vision-secondary rounded-[14px] p-6 flex flex-col">
          {/* AppointmentCard hiển thị thông tin */}
          <AppointmentCard
            appt={{ service, doctor, date, time, status }}
            onReschedule={() => { }}
            onCancel={() => { }}
          />

          {/* Appointment details card */}
          <div className="w-[400px] mx-auto ">
            <div className="rounded-xl border border-black/10 bg-white">
              <div className="p-6 border-b border-black/10">
                <p className=" text-[#4A5565] text-sm leading-6">
                  60-minute appointment including vision testing, eye health evaluation, and consultation.
                </p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#159EEC]" />
                    <span className="text-[#101828] text-sm">Visual acuity test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#159EEC]" />
                    <span className="text-[#101828] text-sm">Eye pressure measurement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#159EEC]" />
                    <span className="text-[#101828] text-sm">Prescription update (if needed)</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
                <h3 className="text-[#1F2B6C] text-sm font-medium">Preparation</h3>
                <p className="mt-2 text-[#4A5565] text-sm">
                  Please arrive 10 minutes early. Bring your insurance card and current eyewear if applicable.
                </p>
              </div>
            </div>
          </div>

          {/* Confirm area */}
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              className=" mx-auto w-[400px] mt-4 px-4 py-2 bg-[#159EEC] text-white rounded-lg"
            >
              Confirm
            </button>
          ) : (
            <p className="mt-4 text-green-600 text-sm">
              Your appointment confirmed
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row flex-wrap justify-center gap-4 w-full max-w-[1040px] mx-auto mb-10">
        <Link
          to="/profile"
          className="px-4 py-2 bg-gradient-to-b from-[#159EEC]/50 to-[#159EEC] text-white font-inter font-medium text-[14px] rounded-lg"
        >
          View My Appointments
        </Link>

        <Link
          to="/"
          className="px-4 py-2 border border-black/10 bg-white text-[#0A0A0A] font-inter font-medium text-[14px] rounded-lg"
        >
          Back to Home
        </Link>

        <button className="px-4 py-2 border border-black/10 bg-white text-[#0A0A0A] font-inter font-medium text-[14px] rounded-lg">
          Print Confirmation
        </button>
      </div>
    </div>
  );
}

export default ConfirmApp1;
