import { Eye, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Topbar from "./Topbar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [profileLink, setProfileLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged in user
    const user = localStorage.getItem("currentUser");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setProfileLink(userData.role === "doctor" || userData.role === "admin" ? "/" + userData.role : "/profile");
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const user = localStorage.getItem("currentUser");
      setCurrentUser(user ? JSON.parse(user) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLogin", handleStorageChange);
    window.addEventListener("userUpdated", handleStorageChange);


    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", handleStorageChange);
      window.removeEventListener("userUpdated", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header>
      <Topbar currentUser={currentUser} profileLink={profileLink} handleLogout={handleLogout} />
      <div className="relative px-4 lg:px-[200px] py-6 flex justify-between items-center bg-white">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#505B96] rounded-full p-2.5">
            <Eye className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-vision-primary font-kaushan text-3xl md:text-5xl tracking-normal">
            Vision
          </h1>
        </Link>

        <button
          className="lg:hidden text-vision-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Navigation mobileMenuOpen={mobileMenuOpen} currentUser={currentUser} />
      </div>
    </header>
  );
}
