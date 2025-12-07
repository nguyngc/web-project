import { useState } from "react";
import GradientButton from "../GradientButton";
import PasswordInput from "./PasswordInput";

const ChangePasswordSection = ({ onPasswordChange }) => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState(null);

  const validate = () => {
    if (!current) return "Please enter your current password";
    if (newPass.length < 6)
      return "New password must be at least 6 characters";
    if (newPass !== confirmPass)
      return "New password and confirmation do not match";
    return null;
  };

  const submit = () => {
    const err = validate();
    if (err) return setError(err);

    onPasswordChange(current, newPass);
    setCurrent("");
    setNewPass("");
    setConfirmPass("");
    setError(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        Change Password
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Update your password to keep your account secure
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-700 mb-1">
            Current Password
          </label>
          <PasswordInput
            value={current}
            onChange={setCurrent}
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1">New Password</label>
          <PasswordInput
            value={newPass}
            onChange={setNewPass}
            placeholder="Enter new password"
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters long
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1">
            Confirm New Password
          </label>
          <PasswordInput
            value={confirmPass}
            onChange={setConfirmPass}
            placeholder="Confirm new password"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-start">
          <GradientButton onClick={submit} isFull={false}>Change Password</GradientButton>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
