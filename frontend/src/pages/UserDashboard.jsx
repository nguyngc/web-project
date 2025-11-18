import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import DashboardSidebar from "../components/DashboardSidebar";
import AppointmentCard from "../components/AppointmentCard";
import UserProfile from "../components/UserProfile";

function UserDashboard({userId}) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  
  //const userId = "65a456def789012345678901"; 

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  // Fetch appointments từ backend
  useEffect(() => {
    if (activeTab === "appointments") {
      async function fetchAppointments() {
        setLoadingAppointments(true);
        try {
          const res = await fetch(`http://localhost:4000/appointments?userId=${userId}`);
          if (!res.ok) throw new Error("Failed to fetch appointments");
          const data = await res.json();
          setAppointments(data);
        } catch (err) {
          console.error("Error fetching appointments:", err);
        } finally {
          setLoadingAppointments(false);
        }
      }
      fetchAppointments();
    }
  }, [activeTab, userId]);

  return (
    <>
      <Hero page="profile" />
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 bg-vision-bg-light px-4 md:px-8 lg:px-[200px] py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-auto lg:min-w-[228px]">
              <DashboardSidebar onSelect={setActiveTab} activeTab={activeTab} />
            </aside>

            {/* Nội dung chính */}
            <section className="flex-1 bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-10">
              {activeTab === "profile" && (
                <UserProfile userId={userId} />
              )}

              {activeTab === "appointments" && (
                <>
                  <h2 className="text-base font-medium text-[#0A0A0A]">My Appointments</h2>
                  {loadingAppointments ? (
                    <p>Loading appointments...</p>
                  ) : appointments.length > 0 ? (
                    appointments.map((appt) => (
                      <AppointmentCard
                        key={appt._id}
                        title={appt.title}
                        doctor={appt.doctor}
                        date={appt.date}
                        time={appt.time}
                        status={appt.status}
                      />
                    ))
                  ) : (
                    <p>No appointments found</p>
                  )}
                </>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default UserDashboard;
