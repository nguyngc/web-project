import eyeExamImage from "../assets/images/eye-exam.png";
import articleImage1 from "../assets/images/article-1.jpeg";
import articleImage2 from "../assets/images/article-2.jpeg";
import doctorDashboard from "../assets/images/doctor-dashboard.jpg";
import adminDashboard from "../assets/images/doctor-dashboard.jpg";
import { Facebook, Twitter, Linkedin, Instagram, User, Users, FileText, Calendar, LayoutDashboard, Activity, Table2, Settings, FileQuestionIcon } from "lucide-react";

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

// Features list for AboutSection component
const aboutSectionCard = {
  image: eyeExamImage,
  title: "Why Choose Us?",
  description:
    "At Vision Clinic, we understand that your eyes are precious. That's why we're committed to providing the highest standard of eye care with a personal touch.",
  features: [
    "Board-certified optometrists and ophthalmologists",
    "State-of-the-art diagnostic equipment",
    "Comprehensive range of services for all ages",
    "Flexible scheduling and convenient location",
  ],
  CTA: "Learn more about us",
  url: "/about",
};

// Sample data for hero slides
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
    { image: eyeExamImage, title: "Our Story", subtitle: "Dedicated to excellence in eye care for over 25 years", },
  ],
  services: [
    {
      image: eyeExamImage, title: "Our services", subtitle: "Comprehensive eye care solutions for your entire family",
      badge: "Black Friday promotion: 20% off all services",
    },
  ],
  news: [
    { image: eyeExamImage, title: "Latest Updates", subtitle: "Stay informed with our clinic's news and announcements.", },
  ],
  newsDetail: [
    {
      image: eyeExamImage
    },
  ],
  contact: [
    { image: eyeExamImage, title: "Contact us", subtitle: "We're here to answer your questions and schedule your appointment", },
  ],
  serviceDetail: [
    {
      image: eyeExamImage, title: "", subtitle: "",
      badge: "",
    },
  ],
  login: [
    {
      image: eyeExamImage,
      title: "Welcome to iVision",
      subtitle: "Access your saved information and appointment history easily",
    },
  ],
  user: [
    {
      image: eyeExamImage,
      title: "My Account",
      subtitle: "Manage my profile, appointments, and prescriptions",
    },
  ],


  doctor: [
    {
      image: doctorDashboard,
      title: "Dashboard",
      subtitle: "Manage appointments and patients",
    },
  ],
  admin: [
    {
      image: adminDashboard,
      title: "Administrator Dashboard",
      subtitle: "Manage users, appointments, content, and site settings",
    },
  ],
  bookApp: [
    {
      image: eyeExamImage, title: "", subtitle: "",
      badge: "",
    },
  ],
  confirm: [
    {
      image: eyeExamImage, title: "", subtitle: "",
      badge: "",
    },
  ],
  404: [
    {
      image: eyeExamImage
    },
  ],
};

const socialLinks = [
  { id: 1, label: "Facebook", link: "https://www.facebook.com/ivisionclinic", Icon: Facebook },
  { id: 2, label: "Twitter", link: "https://www.twitter.com/ivisionclinic", Icon: Twitter },
  { id: 3, label: "Instagram", link: "https://www.instagram.com/ivisionclinic", Icon: Instagram },
  { id: 4, label: "LinkedIn", link: "https://www.linkedin.com/company/ivisionclinic", Icon: Linkedin },
];

const menuItems = {
  user: [
    { key: "profile", Icon: User, label: "My Profile" },
    { key: "appointments", Icon: Calendar, label: "Appointments" },
    { key: "prescriptions", Icon: FileText, label: "Prescriptions" },
  ],
  doctor: [
    { key: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
    { key: "appointments", Icon: Calendar, label: "Appointments" },
    { key: "patients", Icon: Users, label: "Patients" },
    { key: "availability", Icon: Activity, label: "Availability" },
    { key: "profile", Icon: User, label: "My Profile" },
  ],
  admin: [
    { key: "users", Icon: Users, label: "Users" },
    { key: "appointments", Icon: Calendar, label: "Appointments" },
    { key: "services", Icon: Settings, label: "Services" },
    { key: "contents", Icon: FileText, label: "Contents" },
    { key: "banners", Icon: Table2, label: "Banners" },
    { key: "faqs", Icon: FileQuestionIcon, label: "FAQs" },
    { key: "profile", Icon: User, label: "My Profile" },
  ]
};

export { websiteInfo, pageLinks, heroSlides, socialLinks, aboutSectionCard, menuItems };

