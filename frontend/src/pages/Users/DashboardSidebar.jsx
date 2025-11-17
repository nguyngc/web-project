import { User, Calendar, FileText, LogOut } from "lucide-react";

function DashboardSidebar({ onSelect, activeTab }) {
  const menuItems = [
    { key: "profile", label: "My Profile", icon: User },
    { key: "appointments", label: "Appointments", icon: Calendar },
    { key: "prescriptions", label: "Prescriptions", icon: FileText },
  ];

  return (
    <div className="bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-8 w-full lg:w-auto">
      {/* User info */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-vision-secondary flex items-center justify-center">
          <User className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
        <h3 className="text-base font-normal text-[#101828] text-center">John Doe</h3>
        <p className="text-sm text-[#4A5565] text-center">customer@clinic.com</p>
      </div>

      <div className="w-full h-px bg-black/10"></div>

      {/* Menu */}
      <div className="flex flex-col gap-2.5">
        {menuItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[10px] transition ${
              activeTab === key
                ? "bg-gradient-to-b from-vision-secondary/50 to-vision-secondary text-white"
                : "text-vision-text hover:bg-gray-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-base font-normal">{label}</span>
          </button>
        ))}
      </div>

      <div className="w-full h-px bg-black/10"></div>

      {/* Logout */}
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] border border-[#155DFC] bg-white text-[#155DFC] hover:bg-[#155DFC]/5 transition font-medium">
        <LogOut className="w-4 h-4" />
        <span className="text-base">Logout</span>
      </button>
    </div>
  );
}

export default DashboardSidebar;
