import { Outlet } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import BottomBar from "../../components/BottomBar";

const Layout = () => {
  return (
    <>
      <Topbar />
      <Header />
      <Hero page="doctor" />
      <Outlet />
      <BottomBar />
    </>
  );
};

export default Layout;