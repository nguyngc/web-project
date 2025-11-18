import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import DashboardSidebar from "../components/DashboardSidebar";
import AppointmentCard from "../components/AppointmentCard";
import UserProfile from "../components/UserProfile";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile"); // mặc định là profile

  return (
    <>
      <Header />
      <Hero page="profile" />
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 bg-vision-bg-light px-4 md:px-8 lg:px-[200px] py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-auto lg:min-w-[228px]">
              <DashboardSidebar onSelect={setActiveTab} activeTab={activeTab} />
            </aside>

            <section className="flex-1 bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-10">
              {activeTab === "profile" && (
                <div>
                  <UserProfile />
                </div>
              )}

              {activeTab === "appointments" && (
                <>
                  <h2 className="text-base font-medium text-[#0A0A0A]">My Appointments</h2>
                  <AppointmentCard
                    title="Comprehensive Eye Exam"
                    doctor="Dr. Sarah Mitchell"
                    date="Monday, November 3, 2025"
                    time="9:00 AM - 10:00 AM"
                    status="confirmed"
                  />
                </>
              )}
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
