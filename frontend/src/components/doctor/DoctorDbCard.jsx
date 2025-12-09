import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

function DoctorDbCard() {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const todayString = new Date().toISOString().split("T")[0];

  // ========== FETCH DOCTOR APPOINTMENTS ==========
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/appointments?doctorId=${currentUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load doctor appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser._id, token]);

  // ========== FILTER DATA ==========
  const todaysAppointments = appointments.filter(
    (a) => a.date === todayString && a.status === "confirmed"
  );

  const upcomingAppointments = appointments
    .filter((a) => a.date > todayString && a.status === "confirmed")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const nextUpcoming = upcomingAppointments[0] || null;

  // Loading state
  if (loading) {
    return (
      <div className="w-full flex justify-center py-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">

      {/* ===== TOP CARDS ROW ===== */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full">

        {/* CARD 1: Today's Appointments */}
        <div className="
          flex-1 bg-white border border-black/10 rounded-[14px]
          flex flex-row justify-between sm:justify-center items-center
          gap-6 sm:gap-10 px-4 py-6
        ">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#4A5565] text-sm font-inter">
              Today's Appointments
            </p>
            <span className="text-[#1C398E] text-base font-inter">
              {todaysAppointments.length}
            </span>
          </div>

          {/* ICON */}
          <div className="w-[50px] h-[50px] border border-[#155DFC] rounded-full flex items-center justify-center">
            <Calendar color="#155DFC" />
          </div>
        </div>

        {/* CARD 2: Upcoming */}
        <div className="
          flex-1 bg-white border border-black/10 rounded-[14px]
          flex flex-row justify-between sm:justify-center items-center
          gap-6 sm:gap-10 px-4 py-6
        ">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#4A5565] text-sm font-inter">Upcoming</p>
            <span className="text-[#1C398E] text-base font-inter">
              {upcomingAppointments.length}
            </span>
          </div>

          <div className="w-[50px] h-[50px] border border-[#00A63E] rounded-full flex items-center justify-center">
            <Clock color="#00A63E" />
          </div>
        </div>
      </div>

      {/* ===== TODAY'S SCHEDULE ===== */}
      <div className="w-full bg-white border border-black/10 rounded-[14px] p-6 flex flex-col gap-6">
        <div>
          <h2 className="font-inter font-medium text-[16px] text-[#0A0A0A]">
            Today's Schedule
          </h2>
          <p className="font-inter text-[16px] text-[#717182]">
            Your appointments for today
          </p>
        </div>

        {todaysAppointments.length === 0 ? (
          <p className="text-center text-[#6A7282] text-sm">
            No appointments scheduled for today
          </p>
        ) : (
          todaysAppointments.map((apt) => (
            <div
              key={apt._id}
              className="w-full border border-black/10 rounded-[10px] p-4 flex justify-between"
            >
              <div className="flex flex-col">
                <span className="text-[#101828] text-[16px] font-inter">
                  {apt.userId?.firstName} {apt.userId?.lastName}
                </span>
                <p className="text-[#4A5565] text-sm">
                  {apt.serviceId?.serviceName || "Service"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[#101828] text-[16px] font-inter">
                  {apt.date}
                </p>
                <p className="text-[#6A7282] text-sm">{apt.time}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ===== UPCOMING APPOINTMENTS ===== */}
      <div className="w-full bg-white border border-black/10 rounded-[14px] p-6 flex flex-col gap-6">
        <div>
          <h2 className="font-inter font-medium text-[16px] text-[#0A0A0A]">
            Upcoming Appointments
          </h2>
          <p className="font-inter text-[16px] text-[#717182]">
            Next scheduled appointments
          </p>
        </div>

        {!nextUpcoming ? (
          <p className="text-center text-[#6A7282] text-sm">
            No upcoming appointments
          </p>
        ) : (
          <div className="w-full border border-black/10 rounded-[10px] p-4 flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <span className="text-[#101828] text-[16px] font-inter">
                  {nextUpcoming.userId?.firstName} {nextUpcoming.userId?.lastName}
                </span>

                <div className="
                  bg-[#159EEC] text-white text-xs font-medium px-2.5 py-0.5 
                  rounded-[10px] w-fit
                ">
                  {nextUpcoming.status}
                </div>
              </div>

              <p className="text-[#4A5565] text-sm">
                {nextUpcoming.serviceId?.serviceName}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[#101828] text-[16px] font-inter">
                {nextUpcoming.date}
              </p>
              <p className="text-[#6A7282] text-sm">
                {nextUpcoming.time}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDbCard;
