import { Phone, Clock, MapPin, LogIn, User, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';
import { websiteInfo } from "../data/data";

export default function Topbar({ currentUser, profileLink, handleLogout }) {
  return (
    <div className="bg-linear-to-b from-[#1C398E] to-[#6E85C3] px-4 lg:px-[200px] py-3 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 lg:gap-[69px]">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-white" strokeWidth={1.6} />
          <span className="text-white text-xs">{websiteInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white" strokeWidth={1.6} />
          <span className="text-white text-xs">{websiteInfo.workingHours}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white" strokeWidth={1.6} />
          <span className="text-white text-xs">{websiteInfo.address}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <div
              className="flex items-center gap-2 text-white text-xs transition-opacity"
            >
              <User className="h-4 w-4" />
              <span>Welcome, <Link to={profileLink}>{currentUser.firstName}</Link></span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white text-xs hover:opacity-80 transition-opacity"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <Link to="/login" className="flex items-center gap-2 text-white text-xs hover:opacity-80 transition-opacity">
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </Link>)}
      </div>
    </div>
  );
}
