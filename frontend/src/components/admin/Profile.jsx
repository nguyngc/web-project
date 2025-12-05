import { useState, useEffect } from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import ChangePasswordSection from "../common/ChangePasswordSection";
import InfoMessage from "../common/InfoMessage";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);


  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const id = currentUser?._id || currentUser?.id;

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          showMessage(data.error || "Failed to load profile", "error");
        }
      } catch (err) {
        showMessage("Network error", "error");
      }
    };
    if (id && token) fetchUser();
  }, [id, token]);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const updateProfile = async (updated) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setEditing(false);
        localStorage.setItem("currentUser", JSON.stringify(data));
        window.dispatchEvent(new Event("userUpdated"));
        showMessage("Profile updated successfully");
      } else {
        showMessage(data.error || "Failed to update profile", "error");
      }
    } catch (err) {
      showMessage("Network error", "error");
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const res = await fetch(`/api/users/${id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage("Password updated successfully");
      } else {
        showMessage(data.message || data.error || "Failed to update password", "error");
      }
    } catch (err) {
      showMessage("Network error", "error");
    }
  };

  if (!user) return <p>Loading profile...</p>;

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
