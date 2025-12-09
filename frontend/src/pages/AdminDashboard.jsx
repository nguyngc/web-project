import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BottomBar from "../components/BottomBar";
import DashboardSidebar from "../components/DashboardSidebar";
import UserList from "../components/admin/UserList";
import AppointmentList from "../components/admin/AppointmentList";
import ServiceList from "../components/admin/ServiceList";
import ArticleList from "../components/admin/ArticleList";
import BannerList from "../components/admin/BannerList";
import FAQList from "../components/admin/FAQList";
import Profile from "../components/admin/Profile";
import FaqAdmin from "../components/admin/FAQList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      if (parsedUser.role !== "admin") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, []);

  if (!currentUser) {
    return (
      <>
        <Header />
        <Hero page="admin" />
        <div className="min-h-[calc(100vh-400px)] flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-gray-900 mb-4">Please Log In</h2>
            <p className="text-gray-600 mb-6">You need to be logged in as an administrator to view this page.</p>
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
      <Hero page="admin" />

      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 bg-vision-bg-light px-4 md:px-8 lg:px-[200px] py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-auto lg:min-w-[228px]">
              <DashboardSidebar onSelect={setActiveTab} activeTab={activeTab} />
            </aside>

            {activeTab !== "profile" && (
              <section className="flex-1 bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-10">
                {activeTab === "users" && (
                  <UserList />
                )}

                {activeTab === "appointments" && (
                  <AppointmentList />
                )}

                {activeTab === "services" && (
                  <ServiceList />
                )}

                {activeTab === "contents" && (
                  <ArticleList />
                )}

                {activeTab === "banners" && (
                  <BannerList />
                )}

                {activeTab === "faqs" && (
                  <>
                    <FAQList />
                  </>
                )}
              </section>
            )}

            {activeTab === "profile" && (
              <section className="flex-1 flex flex-col gap-10">
                <Profile />
              </section>
            )}
          </div>
        </main>
      </div>

      <BottomBar />
    </>
  );
};

export default AdminDashboard;
