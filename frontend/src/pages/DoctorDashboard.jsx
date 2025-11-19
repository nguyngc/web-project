import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BottomBar from "../components/BottomBar";
import DashboardSidebar from "../components/DashboardSidebar";
import UserList from "../components/UserList";
import AppointmentList from "../components/AppointmentList";
import Availability from "../components/Availability";
import UserProfile from "../components/UserProfile";
import DoctorDbCard from "../components/DoctorDbCard";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const doctorId = "64f123abc456def789012345"; 

  // State appointments
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  // Fetch appointments
  useEffect(() => {
    if (activeTab === "appointments") {
      async function fetchAppointments() {
        setLoadingAppointments(true);
        try {
          const res = await fetch(`http://localhost:4000/appointments?doctorId=${doctorId}`);
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
  }, [activeTab, doctorId]);

  return (
    <>
      <Header />
      <Hero page="doctor" />

      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 bg-vision-bg-light px-4 md:px-8 lg:px-[200px] py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-auto lg:min-w-[228px]">
              <DashboardSidebar onSelect={setActiveTab} activeTab={activeTab} />
            </aside>

            <section className="flex-1 bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-10">
              {activeTab === "dashboard" && <DoctorDbCard />}

              {activeTab === "appointments" && (
                <>
                  <h2 className="text-base font-medium text-[#0A0A0A]">Appointments</h2>
                  {loadingAppointments ? (
                    <p>Loading appointments...</p>
                  ) : appointments.length > 0 ? (
                    <AppointmentList appointments={appointments} />
                  ) : (
                    <p>No appointments found</p>
                  )}
                </>
              )}

              {activeTab === "patients" && <UserList />}
              {activeTab === "availability" && <Availability />}
              {activeTab === "profile" && <UserProfile doctorId={doctorId} />}
            </section>
          </div>
        </main>
      </div>

      <BottomBar />
    </>
  );
};

export default DoctorDashboard;
