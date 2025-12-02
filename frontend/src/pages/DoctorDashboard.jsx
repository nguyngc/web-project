import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BottomBar from "../components/BottomBar";
import DashboardSidebar from "../components/DashboardSidebar";
import PatientList from "../components/doctor/PatientList";
import AppointmentList from "../components/doctor/AppointmentList";
import Availability from "../components/doctor/Availability";
import DoctorProfile from "../components/doctor/DoctorProfile";
import DoctorDbCard from "../components/doctor/DoctorDbCard";
import { ChevronDown } from "lucide-react";

function DoctorDashboard() {
  const location = useLocation();
  const initialTab = location.state?.tab || "dashboard";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      if (parsedUser.role !== "doctor") {
        navigate("/login");
      }
    }
  }, []);

  if (!currentUser) {
    return (
      <>
        <Header />
        <Hero page="user" />
        <div className="min-h-[calc(100vh-400px)] flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-gray-900 mb-4">Please Log In</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view this page.</p>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700">
              Go to Login
            </Link>
          </div>
        </div>
        <BottomBar />
      </>
    );
  }

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
                <AppointmentList />
              )}

              {activeTab === "patients" && (
                <PatientList currentDoctorId={3}/>
              )}

              {activeTab === "availability" && <Availability />}
              {activeTab === "profile" && <DoctorProfile />}
            </section>
          </div>
        </main>
      </div>

      <BottomBar />
    </>
  );
};

export default DoctorDashboard;
