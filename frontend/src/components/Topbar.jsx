import { Phone, Clock, MapPin, LogIn } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-linear-to-b from-[#1C398E] to-[#6E85C3] px-4 lg:px-[200px] py-3 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 lg:gap-[69px]">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-white" strokeWidth={1.6} />
          <span className="text-white text-xs">(000) 123-4567</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white" strokeWidth={1.6} />
          <span className="text-white text-xs">Mon-Fri: 9AM-5PM, Sat: 9AM-12PM</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white" strokeWidth={1.6} />
          <span className="text-white text-xs">Myllypurontie 1, Helsinki</span>
        </div>
      </div>
      <button className="flex items-center gap-2 text-white text-xs hover:opacity-80 transition-opacity">
        <LogIn className="w-5 h-5" />
        <span>Login</span>
      </button>
    </div>
  );
}
