import { Eye, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "./Navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative px-4 lg:px-[200px] py-6 flex justify-between items-center bg-white">
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
      <Navigation mobileMenuOpen={mobileMenuOpen} />
    </header>
  );
}
