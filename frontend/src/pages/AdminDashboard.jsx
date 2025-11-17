import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BottomBar from "../components/BottomBar";
import DashboardSidebar from "../components/DashboardSidebar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
      <Header />
      <Hero page="admin" />

      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 bg-vision-bg-light px-4 md:px-8 lg:px-[200px] py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-auto lg:min-w-[228px]">
              <DashboardSidebar onSelect={setActiveTab} activeTab={activeTab} />
            </aside>

            <section className="flex-1 bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-10">
              {activeTab === "users" && (
                <>
                  <p>User List</p>
                </>
              )}

              {activeTab === "appointments" && (
                <>
                  <p>Appointment List</p>
                </>
              )}

              {activeTab === "services" && (
                <>
                  <p>Service List</p>
                </>
              )}

              {activeTab === "contents" && (
                <>
                  <p>Contents List</p>
                </>
              )}

              {activeTab === "banners" && (
                <>
                  <p>Banner List</p>
                </>
              )}

              {activeTab === "activities" && (
                <>
                  <p>Activities List</p>
                </>
              )}

              {activeTab === "profile" && (
                <>
                  <p>My profile</p>
                </>
              )}
            </section>
          </div>
        </main>
      </div>

      <BottomBar />
    </>
  );
};

export default AdminDashboard;
