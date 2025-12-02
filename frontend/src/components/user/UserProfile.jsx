import { useState, useEffect } from "react";
import UserProfileForm from "./UserProfileForm";
import ChangePasswordSection from "../admin/ChangePasswordSection";
import InfoMessage from "../common/InfoMessage";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const id = currentUser?.id;

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

  // Update profile via backend
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
        showMessage("Profile updated successfully");
      } else {
        showMessage(data.error || "Failed to update profile", "error");
      }
    } catch (err) {
      showMessage("Network error", "error");
    }
  };

  // Update password via backend
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
        showMessage(data.error || "Failed to update password", "error");
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

      <UserProfileForm
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

export default UserProfile;
