const banners = [
  {
    badge: "Welcome",
    image: "../src/assets/images/eye-exam.png",
    title: "Welcome to iVision Clinic",
    subtitle: "Your Partner in Clear Vision and Eye Health",
    buttonText: "Book An Appointment",
    buttonLink: "/bookApp",
    order: 1,
    isActive: true,
  },
  {
    badge: "New Technology",
    image: "../src/assets/images/article-1.jpeg",
    title: "Cutting-Edge Diagnostic Tools",
    subtitle: "Advanced imaging for better patient care",
    buttonText: "Learn More",
    buttonLink: "/news",
    order: 2,
    isActive: false,
  },
  {
    badge: "Care",
    image: "../src/assets/images/article-2.jpeg",
    title: "Comprehensive Eye Exams",
    subtitle: "Thorough testing for long-term eye health",
    buttonText: "View Services",
    buttonLink: "/services",
    order: 3,
    isActive: true,
  },
];

module.exports = banners;
