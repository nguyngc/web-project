// data.js
const patients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(000) 123-4567",
    lastVisit: "10/15/2025",
    medicalHistory: "No significant eye conditions. Family history of glaucoma.",
    prescription: {
      rightEye: "SPH -2.00, CYL -0.50, AXIS 180",
      leftEye: "SPH -2.25, CYL -0.75, AXIS 175",
    },
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "(111) 987-6543",
    lastVisit: "09/20/2025",
    medicalHistory: "Mild astigmatism. No family history of eye disease.",
    prescription: {
      rightEye: "SPH -1.50, CYL -0.25, AXIS 90",
      leftEye: "SPH -1.75, CYL -0.50, AXIS 85",
    },
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(000) 123-4567",
    lastVisit: "10/15/2025",
    medicalHistory: "No significant eye conditions. Family history of glaucoma.",
    prescription: {
      rightEye: "SPH -2.00, CYL -0.50, AXIS 180",
      leftEye: "SPH -2.25, CYL -0.75, AXIS 175",
    },
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "(111) 987-6543",
    lastVisit: "09/20/2025",
    medicalHistory: "Mild astigmatism. No family history of eye disease.",
    prescription: {
      rightEye: "SPH -1.50, CYL -0.25, AXIS 90",
      leftEye: "SPH -1.75, CYL -0.50, AXIS 85",
    },
  },
];
const prescriptions = [
  {
    id: 1,
    service: "Regular Check-up",
    doctor: "Dr. Emily Rodriguez",
    code: "RX-2024-045",
    issuedDate: "March 10, 2025",
    nextVisit: "September 10, 2025",
  },
  {
    id: 2,
    service: "Eye Examination",
    doctor: "Dr. John Smith",
    code: "RX-2024-046",
    issuedDate: "April 5, 2025",
    nextVisit: "October 5, 2025",
  },
];


export { patients, prescriptions}


