import { Eye, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "./BottomBar";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-[#1C398E] pt-8 pb-0">
      <div className="px-4 lg:px-[200px] pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1040px] mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-2.5">
                <Eye className="w-5 h-5 text-vision-primary" strokeWidth={2} />
              </div>
              <h3 className="text-vision-bg-light font-kaushan text-3xl tracking-[3.2px]">
                Vision
              </h3>
            </div>
            <p className="text-[#DBEAFE] text-sm leading-[25px]">
              Providing exceptional eye care services to the community for over 25 years.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white text-base">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/news" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                News
              </Link>
              <Link to="/contact" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white text-base">Services</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/services" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Eye Examinations
              </Link>
              <Link to="/services" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Eyeglasses & Frames
              </Link>
              <Link to="/services" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Contact Lenses
              </Link>
              <Link to="/services" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                LASIK Surgery
              </Link>
              <Link to="/services" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Disease Management
              </Link>
              <Link to="/services" className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
                Pediatric Eye Care
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white text-base">Contact Info</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={1.6} />
                <span className="text-white text-sm">Myllypurontie 1, Helsinki</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-white flex-shrink-0" strokeWidth={1.6} />
                <span className="text-[#DBEAFE] text-sm">(000) 123-4567</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-[#DBEAFE] text-sm">info@ivisionclinic.com</span>
              </div>
            </div>
            <SocialLinks />
          </div>
        </div>
      </div>

      <BottomBar />
    </footer>
  );
}

export default Footer;