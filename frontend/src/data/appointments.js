const appointments = [
  // --------------------------------------------------
  // Patient 1 (ID: 1) — 1 scheduled, 2 completed
  // --------------------------------------------------
  {
    id: "apt-001",
    patientId: 1,
    patient: "Lulita Lewry",
    doctorId: 3,
    doctor: "Dr. Dudley Drover",
    date: "2025-11-10",
    time: "10:00",
    service: "Eye Exam",
    status: "scheduled",

    diagnosis: null,
    rightEye: null,
    leftEye: null,
    prescriptionNotes: null,
    userNotes: null,
    doctorNotes: null,
    nextAppointment: null
  },

  {
    id: "apt-002",
    patientId: 1,
    patient: "Lulita Lewry",
    doctorId: 3,
    doctor: "Dr. Dudley Drover",
    date: "2025-07-05",
    time: "09:30",
    service: "Glasses Prescription",
    status: "completed",

    diagnosis: "Presbyopia",
    rightEye: { sphere: +1.00, cylinder: -0.50, axis: 90 },
    leftEye: { sphere: +0.75, cylinder: -0.25, axis: 80 },
    prescriptionNotes: "Reading glasses recommended.",
    userNotes: "Difficulty reading small text.",
    doctorNotes: "Monitor eye pressure yearly.",
    nextAppointment: "2026-07-05"
  },

  {
    id: "apt-003",
    patientId: 1,
    patient: "Lulita Lewry",
    doctorId: 3,
    doctor: "Dr. Dudley Drover",
    date: "2025-03-22",
    time: "14:00",
    service: "Eye Exam",
    status: "completed",

    diagnosis: "Dry eye syndrome",
    rightEye: { sphere: -0.25, cylinder: 0, axis: 0 },
    leftEye: { sphere: -0.25, cylinder: 0, axis: 0 },
    prescriptionNotes: "Artificial tears recommended.",
    userNotes: "Eyes feel dry in winter.",
    doctorNotes: "Follow-up if symptoms worsen.",
    nextAppointment: "2025-12-01"
  },

  // --------------------------------------------------
  // Patient 2 (ID: 2)
  // --------------------------------------------------
  {
    id: "apt-010",
    patientId: 2,
    patient: "Janenna Olner",
    doctorId: 20,
    doctor: "Dr. Kally Ede",
    date: "2025-12-01",
    time: "11:15",
    service: "Contact Lens Fitting",
    status: "scheduled",

    diagnosis: null,
    rightEye: null,
    leftEye: null,
    prescriptionNotes: null,
    userNotes: null,
    doctorNotes: null,
    nextAppointment: null
  },

  {
    id: "apt-011",
    patientId: 2,
    patient: "Janenna Olner",
    doctorId: 20,
    doctor: "Dr. Kally Ede",
    date: "2025-04-15",
    time: "13:20",
    service: "Eye Exam",
    status: "completed",

    diagnosis: "Mild myopia",
    rightEye: { sphere: -1.25, cylinder: -0.75, axis: 100 },
    leftEye: { sphere: -1.00, cylinder: -0.50, axis: 90 },
    prescriptionNotes: "Anti-blue-light recommended.",
    userNotes: null,
    doctorNotes: "Annual check needed.",
    nextAppointment: "2026-04-15"
  },

  {
    id: "apt-012",
    patientId: 2,
    patient: "Janenna Olner",
    doctorId: 20,
    doctor: "Dr. Kally Ede",
    date: "2025-08-01",
    time: "15:00",
    service: "Eye Pressure Test",
    status: "cancelled",

    diagnosis: null,
    rightEye: null,
    leftEye: null,
    prescriptionNotes: null,
    userNotes: "Could not attend.",
    doctorNotes: null,
    nextAppointment: null
  }
];

export default appointments;
