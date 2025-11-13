import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import SocialLink from "./SocialLink";
import { socialLinks } from "../data/data";

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((item) => {
        return (
          <SocialLink key={item.id} item={item} />
        );
      })}
    </div>
  );
}

export default SocialLinks;