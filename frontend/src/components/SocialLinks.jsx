import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      <a
        href="#"
        className="bg-[#193CB8] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1F4ED8] transition-colors"
        aria-label="Facebook"
      >
        <Facebook className="w-4 h-4 text-white" strokeWidth={1.33} />
      </a>
      <a
        href="#"
        className="bg-[#193CB8] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1F4ED8] transition-colors"
        aria-label="Instagram"
      >
        <Instagram className="w-4 h-4 text-white" strokeWidth={1.33} />
      </a>
      <a
        href="#"
        className="bg-[#193CB8] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1F4ED8] transition-colors"
        aria-label="Twitter"
      >
        <Twitter className="w-4 h-4 text-white" strokeWidth={1.33} />
      </a>
      <a
        href="#"
        className="bg-[#193CB8] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1F4ED8] transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-white" strokeWidth={1.33} />
      </a>
    </div>
  );
}

export default SocialLinks;