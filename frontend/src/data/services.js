const services = [
  {
    id: "svc-001",
    name: "Comprehensive Eye Exams",
    shortDescription: "Complete eye health evaluations",
    fullDescription:
      "A thorough evaluation of overall eye health, including vision testing, pressure measurement, refraction assessment, and more.",
    imageUrl: "https://images.unsplash.com/photo-1580281657527-47d72c2eafd9",
    duration: "45–60 minutes",
    price: 150,
    frequency: "Annually",
    features: [
      "Visual acuity test",
      "Refraction assessment",
      "Eye pressure measurement",
      "Corneal assessment"
    ],
    benefits: [
      "Early disease detection",
      "Accurate prescription",
      "Comprehensive health assessment"
    ],
    status: true,
    order: 1
  },
  {
    id: "svc-002",
    name: "Contact Lens Fitting",
    shortDescription: "Lens fitting & evaluation",
    fullDescription:
      "We determine the best contact lenses for your eye shape and visual needs, including trial lenses and training.",
    imageUrl: "https://images.unsplash.com/photo-1580281336132-8e539a1efed8",
    duration: "30 minutes",
    price: 90,
    frequency: "As needed",
    features: [
      "Lens fitting",
      "Eye curvature assessment",
      "Trial lenses",
      "Care & hygiene training"
    ],
    benefits: [
      "Comfortable fit",
      "Improved vision",
      "Safe long-term lens use"
    ],
    status: true,
    order: 2
  },
  {
    id: "svc-003",
    name: "Glaucoma Screening",
    shortDescription: "Eye pressure and optic nerve test",
    fullDescription:
      "Identifies signs of glaucoma using advanced diagnostic tools to protect your long-term vision.",
    imageUrl: "https://images.unsplash.com/photo-1556975559-73d9b7b14a34",
    duration: "20 minutes",
    price: 70,
    frequency: "Annually",
    features: [
      "Eye pressure test",
      "Optic nerve scan",
      "Visual field assessment"
    ],
    benefits: [
      "Early detection",
      "Lower risk of vision loss",
      "Better treatment outcomes"
    ],
    status: false,
    order: 3
  }
];

export default services;
