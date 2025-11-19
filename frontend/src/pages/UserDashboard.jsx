import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import DashboardSidebar from "../components/DashboardSidebar";
import AppointmentCard from "../components/User/AppointmentCard";
import UserProfile from "../components/User/UserProfile";
import Prescriptions from "../components/User/Prescriptions";

function UserDashboard({ userId }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [appointments, setAppointments] = useState([]);

  //appointments 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  return (
    <>
      <Header />
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
              {activeTab === "profile" && <UserProfile userId={userId} />}

              {activeTab === "appointments" && (
                <>
                  <h2 className="text-base font-medium text-[#0A0A0A]">
                    My Appointments
                  </h2>

                  {appointments.length > 0 ? (
                    appointments.map((appt, index) => (
                      <AppointmentCard
                        key={index}
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
                {activeTab === "prescriptions" && (
                  <>
                  <h2 className="text-base font-medium text-[#0A0A0A]">
                    My Prescriptions
                  </h2>
                  <Prescriptions />
                  </>
                )}
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
