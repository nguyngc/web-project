import { Eye, Award, Heart, Wallet, HeartPulse, ShieldCheck, PhoneCall, Mail, Clock, MapPin,} from "lucide-react";

import { NumberCircleOne, NumberCircleTwo, NumberCircleThree, NumberCircleFour,NumberCircleFive } from "phosphor-react";

const introSection = {
    home: {
        title: "Welcome to Vision Clinic",
        description: "Your trusted partner for comprehensive eye care services. We combine advanced technology with compassionate care to protect and enhance your vision.",
        card: [
            {icon: Eye,title: "Comprehensive Eye Exams",description: "Complete vision assessments using state-of-the-art technology",},
            {icon: Award,title: "25+ Years of Excellence",description: "Trusted by thousands of satisfied patients in our community",},
            {icon: Heart,title: "Patient-Centered Care",description: "Personalized treatment plans tailored to your unique needs",},
        ]
    },
    about: {
        title: "About us",
        description: "Founded in 2000, Vision Clinic was established with a simple yet powerful mission: to provide exceptional eye care services that improve the quality of life for our patients.Over the past two decades, we've grown from a small practice to a comprehensive eye care center, but our commitment to personalized, compassionate care has remained unchanged.Today, we're proud to serve thousands of patients annually, combining cutting-edge technology with the trusted, personal approach that has been our hallmark from the beginning.",
        card: [
            {icon: Award,title: "+10,000",description: "Happy Patients",},
            {icon: Award,title: "25+ ",description: "Years of Services",},
            {icon: Heart,title: "15+",description: "Expert Staff",},
            {icon: Heart,title: "98%",description: "Satisfaction Rate",},
        ]
    },
     services: {
        title: "Insurance & Financing",
        description: "We accept most major insurance plans and offer flexible financing options to make quality eye care accessible to everyone.",
        card: [
            {icon: ShieldCheck,title: "Insurance Accepted",description: "Most major vision and medical insurance plans",},
            {icon: Wallet,title: "Flexible Payment ",description: "Payment plans available for all services",},
            {icon: HeartPulse,title: "Affordable Care",description: "Competitive pricing and special packages.",},
        ]
    },
    contact: {
        title: "",
        description: "",
        card: [
            {icon: PhoneCall,title: "",description: "(000)123 4567\n(000) 123 4568",},
            {icon: Mail,title: "",description: "info@visionclinic.com",},
            {icon: MapPin,title: "",description: "Myllypurotie 1, Helsinki",},
            {icon: Clock,title: "",description: "Mon-Fri: 9AM-5PM\nSat: 10AM-2PM",},
        ]
    },
    serviceDetail: {
        title: "How It Works",
        description: "Getting start with your choice is easy. Hear's what to expect:",
        card: [
            {icon: NumberCircleOne,title: "Schedule",description: "Book your appointment online or by phone",},
            {icon: NumberCircleTwo,title: "Consultation",description: "Meet with our specialists for evaluation",},
            {icon: NumberCircleThree,title: "Treatment",description: "Receive personalized care and treatment",},
            {icon: NumberCircleFour,title: "Follow-up",description: "Ongoing support and monitoring",},
            {icon: NumberCircleFive,title: "Insurance",description: "All types of signals are accepted.",},

        ]
    },
    
};
export { introSection }