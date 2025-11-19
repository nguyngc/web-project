import { useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import ChangePasswordSection from "./ChangePasswordSection";
import InfoMessage from "../common/InfoMessage";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "Admin",
    lastName: "Manager",
    email: "admin@clinic.com",
    role: "Administrator",
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

      <ProfileInfoForm
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

export default Profile;
