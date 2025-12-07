import { User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../data/data";

const DashboardSidebar = ({ onSelect, activeTab }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser") || "{}"));

  useEffect(() => {
    // Listen for storage changes
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("currentUser") || "{}");
      setCurrentUser(updated);
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event when user logs in
    window.addEventListener("userLogin", handleStorageChange);
    window.addEventListener("userUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", handleStorageChange);
      window.removeEventListener("userUpdated", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    removeItem();
    setCurrentUser(null);
    navigate("/");
  };

  let userRole = "user";

  if (currentUser?.role === "doctor") userRole = "doctor";
  if (currentUser?.role === "admin") userRole = "admin";

  console.log("Current user:", currentUser);
  console.log("User role:", userRole);

  // Now safe to get menu items
  const items = menuItems[userRole];
  console.log("Items:", items);

  const doctorProfilePic = currentUser?.role === "doctor"
    ? currentUser?.profilePicture || currentUser?.doctorInfo?.profilePicture
    : null;

  return (
    <div className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col gap-8 w-full lg:sticky lg:top-6">
      {userRole !== 'admin' ? (
        <>
          {/* User info */}
          <div className="flex flex-col items-center gap-2.5">
            {/* <div className="w-20 h-20 rounded-full bg-[#159EEC] flex items-center justify-center">
              <User className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div> */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#159EEC] flex items-center justify-center">
              {doctorProfilePic ? (
                <img
                  src={doctorProfilePic}
                  alt="Doctor Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-white" strokeWidth={2.5} />
              )}
            </div>

            <h3 className="text-[#101828] text-base text-center">{currentUser?.firstName} {currentUser?.lastName}</h3>
            <p className="text-[#4A5565] text-sm text-center">{currentUser?.email}</p>
          </div>
          <div className="w-full h-px bg-black/10" />
        </>
      ) :
        (<></>)}

      {/* Menu */}
      <div className="flex flex-col gap-2.5">
        {items.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[10px] transition 
              ${activeTab === key
                ? "bg-gradient-to-b from-vision-secondary/50 to-vision-secondary text-white"
                : "text-vision-text hover:bg-gray-50"
              }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-base font-normal">{label}</span>
          </button>
        ))}
      </div>

      <div className="w-full h-px bg-black/10" />

      <button onClick={handleLogout}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] border border-[#155DFC] bg-white text-[#155DFC] hover:bg-[#155DFC]/5 transition font-medium">
        <LogOut className="w-4 h-4" />
        <span className="text-base">Logout</span>
      </button>
    </div>
  );
}

export default DashboardSidebar;