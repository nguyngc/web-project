import React from "react";
import service1 from "../assets/images/service1.png";
import service2 from "../assets/images/service2.jpg";
import service3 from "../assets/images/service3.jpg";
import service4 from "../assets/images/service4.jpg";
import service5 from "../assets/images/service5.jpg";
import service6 from "../assets/images/service6.jpg";

const dataServices = [
    {
        serviceID: 1,
        name: "Comprehensive Eye Exams",
        shortDescription: "Complete eye health evaluations using advanced diagnostic technology...",
        fullDescription: "About This Service\n\nOur comprehensive eye examinations go far beyond a simple vision screening. Using state-of-the-art diagnostic equipment and thorough evaluation techniques, our experienced optometrists assess every aspect of your eye health and visual function. We believe in preventive care and early detection, which is why our exams are designed to catch potential problems before they become serious.",
        image: service1,
        duration: "45-60 minutes",
        price: "Starting at $150",
        frequency: "Annually recommended",
        features: [
            "Visual Acuity Testing",
            "Refraction Assessment",
            "Eye Pressure Measurement",
            "Retinal Examination",
        ],
        benefits: [
            "Early detection of eye diseases",
            "Updated prescriptions",
            "Prevention of vision problems",
        ],
        CTA: "Learn More...",
        url: "/services/eye-exams",
        isActive: true,
    },

    {
        serviceID: 2,
        name: "Eyeglasses & Frames",
        shortDescription: "Designer frames and prescription lenses tailored to your vision needs and style.",
        fullDescription: "We offer a wide selection of designer frames and prescription lenses customized to your vision needs and personal style. Our opticians help you find the perfect frames that complement your face shape and lifestyle, with lenses tailored to your specific prescription. From fashion-forward designs to durable everyday wear, we ensure comfort, clarity, and confidence in your eyewear.",
        image: service2,
        duration: "Varies by selection",
        price: "Starting at $100",
        frequency: "As needed",
        features: [
            "Designer Frames",
            "Custom Prescription Lenses",
            "Antireflective & UV Coatings",
            "Blue Light Filtering",
        ],
        benefits: [
            "Personalized style and fit",
            "Improved vision clarity",
            "Protection against UV and blue light",
            "Durable and comfortable eyewear",
        ],
        CTA: "Learn More...",
        url: "/services/eyeglasses-frame",
        isActive: true,
    },

    {
        serviceID: 3,
        name: "Contact Lenses",
        shortDescription: "Expert fitting and wide selection of daily, monthly, and specialty contact lenses.",
        fullDescription: "Our specialists provide expert fitting and a comprehensive selection of contact lenses, including daily, monthly, and specialty options. Whether you're new to contacts or looking to switch, we ensure proper fit, comfort, and optimal vision correction. With personalized guidance, you’ll find lenses that suit your lifestyle and eye health needs.",
        image: service3,
        duration: "30-45 minutes (initial fitting)",
        price: "Starting at $80",
        frequency: "As prescribed or replaced monthly/daily",
        features: [
            "Daily Disposables",
            "Monthly Lenses",
            "Toric Lenses for Astigmatism",
            "Multifocal Lenses",
        ],
        benefits: [
            "Comfortable and precise fit",
            "Clear vision without glasses",
            "Options for astigmatism and presbyopia",
            "Convenient daily or monthly wear",
        ],
        CTA: "Learn More...",
        url: "/services/contact-lenses",
        isActive: true,
    },

    {
        serviceID: 4,
        name: "LASIK Surgery",
        shortDescription: "Advanced laser vision correction to reduce or eliminate dependence on glasses and contacts.",
        fullDescription: "Our advanced LASIK surgery offers precise laser vision correction procedures to reduce or eliminate dependence on glasses and contact lenses. Using the latest bladeless LASIK technology and custom wavefront-guided techniques, our experienced surgeons reshape the cornea to correct refractive errors safely and effectively. We provide thorough consultations, personalized treatment plans, and long-term support to ensure optimal vision outcomes.",
        image: service4,
        duration: "Procedure time: 15-30 minutes",
        price: "Starting at $1,500 per eye",
        frequency: "One-time procedure with follow-up visits",
        features: [
            "Bladeless LASIK",
            "Custom Wavefront Technology",
            "Free Consultation",
            "Lifetime Warranty",
        ],
        benefits: [
            "Reduced or eliminated need for glasses/contacts",
            "Quick recovery and long-lasting results",
            "Safe and precise correction",
            "Improved quality of life and convenience",
        ],
        CTA: "Learn More...",
        url: "/services/lasik-surgery",
        isActive: true,
    },

    {
        serviceID: 5,
        name: "Disease Management",
        shortDescription: "Comprehensive care for glaucoma, cataracts, macular degeneration, and diabetic eye disease.",
        fullDescription: "Our disease management services provide advanced treatment and ongoing monitoring for a wide range of eye conditions, including glaucoma, cataracts, macular degeneration, and diabetic eye disease. With personalized care plans and state-of-the-art technology, we aim to preserve your vision and maintain long-term eye health. Our specialists focus on early detection, preventive strategies, and effective treatment options tailored to each patient’s needs.",
        image: service5,
        duration: "Varies by condition and treatment plan",
        price: "Consultation starting at $200",
        frequency: "As recommended by your specialist",
        features: [
            "Glaucoma Treatment",
            "Cataract Surgery",
            "Diabetic Eye Care",
            "Macular Degeneration Management",
        ],
        benefits: [
            "Early detection and prevention of vision loss",
            "Personalized treatment plans",
            "Advanced surgical and non-surgical options",
            "Ongoing monitoring for long-term eye health",
        ],
        CTA: "Learn More...",
        url: "/services/disease-management",
        isActive: true,
    },

    {
        serviceID: 6,
        name: "Pediatric Eye Care",
        shortDescription: "Specialized eye care for children including screenings, exams, and treatment of childhood vision problems.",
        fullDescription: "Our pediatric eye care services are designed specifically for children, providing vision screenings, comprehensive eye exams, and treatment for common childhood vision problems. With a gentle and supportive approach, we help children feel comfortable during their visits while ensuring proper visual development. From lazy eye treatment to sports vision training, our specialists focus on early detection and effective solutions to support lifelong eye health.",
        image: service6,
        duration: "30-45 minutes (exam sessions)",
        price: "Starting at $120",
        frequency: "Annually or as recommended",
        features: [
            "Vision Screenings",
            "Lazy Eye (Amblyopia) Treatment",
            "Eye Coordination Assessment",
            "Sports Vision Training",
        ],
        benefits: [
            "Early detection of childhood vision issues",
            "Improved eye coordination and development",
            "Comfortable, child-friendly environment",
            "Support for academic and sports performance",
        ],
        CTA: "Learn More...",
        url: "/services/pediatric-eye-care",
        isActive: true,
    }
];

export default dataServices;