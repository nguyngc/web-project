import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BottomBar from "../components/BottomBar";
import DashboardSidebar from "../components/DashboardSidebar";
import PatientList from "../components/doctor/PatientList";
import AppointmentList from "../components/doctor/AppointmentList";
import Availability from "../components/doctor/Availability";
import UserProfile from "../components/user/UserProfile";
import DoctorDbCard from "../components/doctor/DoctorDbCard";
import { ChevronDown } from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  //appointments 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

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
                <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex flex-col gap-2.5">
                        <h1 className="text-[#0A0A0A] text-base font-medium">Appointment Schedule</h1>
                        <p className="text-[#717182] text-base">View and manage all your appointments</p>
                      </div>

                      <div className="bg-[#F3F3F5] rounded-lg px-3 py-2 flex items-center justify-between gap-2 min-w-[192px]">
                        <span className="text-[#0A0A0A] text-sm">All Appointments</span>
                        <ChevronDown className="w-4 h-4 text-[#717182] opacity-50" />
                      </div>
                    </div>

                    {/* Appointment List */}
                    <div className="flex flex-col gap-4">
                      {appointments.length > 0 ? (
                        appointments.map((appt) => (
                          <AppointmentList
                            key={appt._id}   // ✅ dùng _id thay vì index
                            type={appt.type}
                            patientName={appt.patientName}
                            date={appt.date}
                            time={appt.time}
                            phone={appt.phone}
                            status={appt.status}
                            notes={appt.notes}
                          />
                        ))
                      ) : (
                        <p className="text-[#717182] text-sm">No appointments found</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "patients" && <PatientList currentDoctorId={3} />}
              {activeTab === "availability" && <Availability />}
              {activeTab === "profile" && <UserProfile />}
            </section>
          </div>
        </main>
      </div>

      <BottomBar />
    </>
  );
};

export default DoctorDashboard;
