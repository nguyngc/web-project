import { Outlet, Link } from "react-router-dom";
import Topbar from "../components/topbar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Topbar />
      <Header />
      <Hero />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;