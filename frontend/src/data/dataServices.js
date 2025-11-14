import React from "react";
import service1 from "../assets/images/service1.jpg";
import service2 from "../assets/images/service2.jpg";
import service3 from "../assets/images/service3.jpg";
import service4 from "../assets/images/service4.jpg";
import service5 from "../assets/images/service5.jpg";
import service6 from "../assets/images/service6.jpg";

const dataServices = [
    {
        image: service1,
        title: "Comprehensive Eye Exams",
        description: "Complete eye health evaluations using advanced diagnostic technology to detect vision problems and eye diseases early. Our thorough examinations include visual acuity tests, refraction assessment, eye pressure measurement, and detailed retinal examination.",
        extra: "What's Included:",
        features: [
            "Visual Acuity Testing",
            "Refraction Assessment",
            "Eye Pressure Measurement",
            "Retinal Examination",
        ],
        CTA: "Learn More...",
        url: "/services/eye-exams",
    },  
    {
        image: service2,
        title: "Eyeglasses & Frames",
        description: "Wide selection of designer frames and prescription lenses customized to your vision needs and personal style. Our opticians help you find the perfect frames that complement your face shape and lifestyle, with lenses tailored to your specific prescription.",
        extra: "What's Included:",
        features: [
            "Designer Frames",
            "Custom Prescription Lenses",
            "Antireflective & UV Coatings",
            "Blue Light Filtering",
        ],
        CTA: "Learn More...",
        url: "/services/eyeglasses-frame",
    },  
    {
        image: service3,   
        title: "Contact Lenses",
        description: "Expert fitting and comprehensive selection of contact lenses including daily, monthly, and specialty lenses. Whether you're new to contacts or looking to switch, our specialists ensure proper fit and comfort for optimal vision correction.",
        extra: "What's Included:",
        features: [
            "Daily Disposables",
            "Monthly Lenses",
            "Toric for Astigmatism",
            "Multifocal Lenses",
        ],
        CTA: "Learn More...",
        url: "/services/contact-lenses",
    },
    {
        image: service4,
        title: "LASIK Surgery",
        description: "Advanced laser vision correction procedures to reduce or eliminate dependence on glasses and contacts. Our experienced surgeons use the latest LASIK technology to reshape your cornea and correct refractive errors with precision and safety.",
        extra: "What's Included:",
        features: [
            "Bladeless LASIK",
            "Custom Wavefront",
            "Free Consultation",
            "Lifetime Warranty",
        ],
        CTA: "Learn More...",
        url: "/services/lasik-surgery",
    },  
    {
        image: service5,
        title: "Disease Management",
        description: "Treatment and management of eye conditions including glaucoma, cataracts, macular degeneration, and diabetic eye disease. We provide ongoing monitoring and advanced treatment options to preserve your vision and eye health.",
        extra: "What's Included:",
        features: [
            "Glaucoma Treatment",
            "Cataract Surgery",
            "Diabetic Eye Care",
            "Macular Degeneration",
        ],
        CTA: "Learn More...",
        url: "/services/disease-management",
    },  
    {
        image: service6,
        title: "Pediatric Eye Care",
        description: "Specialized eye care for children including vision screenings, eye exams, and treatment of childhood vision problems. Our gentle approach helps children feel comfortable while ensuring proper visual development.",
        extra: "What's Included:",
        features: [
            "Vision Screenings",
            "Lazy Eye Treatment",
            "Eye Coordination",
            "Sports Vision",
        ],
        CTA: "Learn More...",
        url: "/services/pediatric-eye-care",
    },  
    
];

export default dataServices;