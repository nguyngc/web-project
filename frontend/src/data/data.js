// src/data/data.js

import { ArrowDown01Icon } from "lucide-react";
import eyeExamImage from "../assets/eye-exam.png";

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
      title: "The Importance of Regular Eye Exams",
      description:
        "Many people underestimate the importance of regular eye examinations. Learn how comprehensive eye exams can detect serious health conditions early.",
      badge: "Latest News",
    },
  ],
  about: [
    {
      title: "Our Story",
      description: "Dedicated to excellence in eye care for over 25 years",

    },
  ],
  services: [
    {
      title: "Our services",
      description: "Comprehensive eye care solutions for your entire family",
      badge: "Summer promotion: 20% off all services",

    },
  ],
  news: [
    {
      title: "Latest Updates",
      description: "Stay informed with our clinic’s news and announcements.",

    },
  ],
  contact: [
    {
      title: "Get in Touch",
      description: "Contact us for appointments, inquiries, or support.",

    },
  ],
};
// Sample data for services cards
const servicesCard = [
  {
    Image: "https://api.builder.io/api/v1/image/assets/TEMP/2bd094ea241132f388e2724df967b69d8941060f?width=716",
    title: "Comprehensive Eye Exams",
    description:
      "Comprehensive vision testing and eye health evaluations to ensure optimal eye health.",
    CTA: "Learn More",
    url: "/services",
  },
  {
    Image: "https://api.builder.io/api/v1/image/assets/TEMP/41716772802cdcc1e9e1f5cffa255c322612f197?width=625",
    title: "Eyeglasses & Contact Lenses",
    description: "Wide selection of frames and lens options to suit your style and vision needs.",
    CTA: "Learn More",
    url: "/services/eyeglasses-contact-lenses",
  },
  {
    Image: "https://api.builder.io/api/v1/image/assets/TEMP/9d0840834b612bbdce6bb7d4f95c237b6134aa35?width=625",
    title: "Advanced Eye Care",
    description: "Treatment for eye diseases and surgical procedures using the latest technology.",
    CTA: "Learn More",
    url: "/services/advanced-eye-care",
  },
  {
    Image: "https://api.builder.io/api/v1/image/assets/TEMP/9d0840834b612bbdce6bb7d4f95c237b6134aa35?width=625",
    title: "LASIK Surgery",
    description: "State-of-the-art LASIK procedures to correct vision and reduce dependence on glasses or contacts.",
    CTA: "Learn More",
    url: "/services/lasik-surgery",
  },
  {
    Image: "https://api.builder.io/api/v1/image/assets/TEMP/2bd094ea241132f388e2724df967b69d8941060f?width=716",
    title: "Eye Disease Management",
    description: "Comprehensive care and treatment plans for various eye diseases to preserve vision and eye health.",
    CTA: "Learn More",
    url: "/services/eye-disease-management",
  },
  {
    Image: "https://api.builder.io/api/v1/image/assets/TEMP/41716772802cdcc1e9e1f5cffa255c322612f197?width=625",
    title: "Pediatric Eye Care",
    description: "Specialized eye care services for children to ensure healthy vision development.",
    CTA: "Learn More",
    url: "/services/pediatric-eye-care",
  },
];

// Sample data for doctors cards
const doctorsCard = [
    {
      Image: eyeExamImage,
      name: "Dr. Jane Smith1",
      specialty: "Lead Optometrist",
      bio: "Dr. Smith has over 15 years of experience in comprehensive eye care and is dedicated to providing personalized treatment plans for her patients.",
      rate: "4.9/5",

    },
    {
      Image: eyeExamImage,
      name: "Dr. Jane Smith2",
      specialty: "Ophthalmologist",
      bio: "DSpecializes in LASIK surgery and advanced treatment of eye diseases.",
      rate: "4.9/5",

    },
    {
      Image: eyeExamImage,
      name: "Dr. Jane Smith3",
      specialty: "Pediatric Eye Specialist",
      bio: "Dedicated to providing gentle, expert care for children's vision needs.",
      rate: "4.9/5",

    },
    {
      Image: eyeExamImage,
      name: "Dr. Jane Smith4",
      specialty: "Optometrist",
      bio: "Dr. Smith has over 15 years of experience in comprehensive eye care and is dedicated to providing personalized treatment plans for her patients.",
      rate: "4.9/5",

    },
  ];
// Sample data for news cards

export {aboutSectionCard, heroSlides, servicesCard, doctorsCard};
