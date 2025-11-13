import { Outlet, Link } from "react-router-dom";
import Topbar from "../components/topbar";
import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar />
        <Header />
      </div>

      <Outlet />
      
      <Footer />
    </>
  );
};

export default Layout;