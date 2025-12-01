import { useState } from "react";
import DoctorProfileForm from "./DoctorProfileForm";
import ChangePasswordSection from "../admin/ChangePasswordSection";
import InfoMessage from "../common/InfoMessage";

const DoctorProfile = () => {
  const [user, setUser] = useState({
    firstName: "Sarah",
    lastName: "Jonhson",
    email: "doctor@clinic.com",
    dob: "01/01/2000",
    gender:"Male",
    phone: "(555) 234-5678",
    address: "456 Medical Plaza, Suite 200, New York, NY 10002",
    specialization:"Ophthalmology",
    licenseNumber:"MD-987654",
    yoe:"12",
    education:"MD, Harvard Medical School; Residency in Ophthalmology, Johns Hopkins Hospital",
    bio: "Tell us about yourself and your expertise...",
  });

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const updateProfile = (updated) => {
    setUser(updated);
    setEditing(false);
    showMessage("Profile updated successfully");
  };

  const updatePassword = (current, newPass) => {
    // Mock: always accept "admin123" as the current password
    if (current !== "admin123") {
      showMessage("Incorrect current password", "error");
      return;
    }
    showMessage("Password updated successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      {message && (
        <InfoMessage message={message} onClose={() => setMessage(null)} />
      )}

      <DoctorProfileForm
        user={user}
        editing={editing}
        onSave={(form) => {
          if (!editing) return setEditing(true);
          updateProfile(form);
        }}
        onCancel={() => setEditing(false)}
      />

      <ChangePasswordSection onPasswordChange={updatePassword} />
    </div>
  );
};

export default DoctorProfile;
