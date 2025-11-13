import eyeExamImage from "../assets/images/eye-exam.png";
import articleImage1 from "../assets/images/article-1.jpeg";
import articleImage2 from "../assets/images/article-2.jpeg";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const websiteInfo = {
  name: "iVision Eye Clinic",
  description:
    "Providing comprehensive eye care services with state-of-the-art technology and a patient-centered approach.",
  address: "Myllypurontie 1, Helsinki",
  phone: "(000) 123-4567",
  email: "info@ivisionclinic.com",
  workingHours: "Mon-Fri: 9AM-5PM, Sat: 9AM-12PM"
};

const pageLinks = [
  { id: 1, href: "/", text: "home" },
  { id: 2, href: "/about", text: "about" },
  { id: 3, href: "/services", text: "services" },
  { id: 4, href: "/news", text: "news" },
  { id: 5, href: "/contact", text: "contact" },
];

const heroSlides = {
  home: [
    {
      id: "1",
      badge: "Latest News",
      image: eyeExamImage,
      title: "Comprehensive Eye Care Services",
      subtitle: "Expert vision care for your entire family. State-of-the-art technology and compassionate service for all your eye health needs.",
      buttonText: "Book An Appointment",
      buttonLink: "#appointment",
      order: 1
    },
    {
      id: "2",
      badge: "Latest News",
      image: articleImage1,
      title: "The Importance of Regular Eye Exams",
      subtitle: "Many people underestimate the importance of regular eye examinations. Learn how comprehensive eye exams can detect serious health conditions early.",
      buttonText: "Read Article",
      buttonLink: "#article?id=regular-eye-exams",
      order: 2
    },
    {
      id: "3",
      badge: "Latest News",
      image: articleImage2,
      title: "New Technology in LASIK Surgery",
      subtitle: "Discover the latest advances in laser vision correction that make the procedure safer and more effective than ever before.",
      buttonText: "Learn More",
      buttonLink: "#article?id=lasik-technology",
      order: 3
    }
  ],
  about: [
    {
      image: eyeExamImage,
      title: "Our Story",
      subtitle: "Dedicated to excellence in eye care for over 25 years",
    },
  ],
  services: [
    {
      image: eyeExamImage,
      title: "Our services",
      subtitle: "Comprehensive eye care solutions for your entire family",
      badge: "Summer promotion: 20% off all services",
    },
  ],
  news: [
    {
      image: eyeExamImage,
      title: "Latest Updates",
      subtitle: "Stay informed with our clinic's news and announcements.",
    },
  ],
  newsDetail: [
    {
      image: eyeExamImage
    },
  ],
  contact: [
    {
      image: eyeExamImage,
      title: "Get in Touch",
      subtitle: "Contact us for appointments, inquiries, or support.",
    },
  ],
  404: [
    {
      image: eyeExamImage
    },
  ],
};

const services = [
  { id: 1, name: "Eye Examinations", link: "/services#eye-examinations" },
  { id: 2, name: "Eyeglasses & Frames", link: "/services#eyeglasses-frames" },
  { id: 3, name: "Contact Lenses", link: "/services#contact-lenses" },
  { id: 4, name: "LASIK Surgery", link: "/services#lasik-surgery" },
  { id: 5, name: "Disease Management", link: "/services#disease-management" },
  { id: 6, name: "Pediatric Eye Care", link: "/services#pediatric-eye-care" },
];

const socialLinks = [
  { id: 1, label: "Facebook", link: "https://www.facebook.com/ivisionclinic", Icon: Facebook},
  { id: 2, label: "Twitter", link: "https://www.twitter.com/ivisionclinic", Icon: Twitter},
  { id: 3, label: "Instagram", link: "https://www.instagram.com/ivisionclinic", Icon: Instagram},
  { id: 4, label: "LinkedIn", link: "https://www.linkedin.com/company/ivisionclinic", Icon: Linkedin},
];

export { websiteInfo, pageLinks, heroSlides, services, socialLinks };