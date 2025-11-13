import { Outlet, Link } from "react-router-dom";
import Topbar from "../components/topbar";
import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Topbar />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;