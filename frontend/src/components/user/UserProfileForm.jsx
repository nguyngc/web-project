import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import GradientButton from "../GradientButton";
import ReadonlyField from "../common/ReadonlyField";
import { format } from "date-fns";

const ProfileInfoForm = ({ user, onSave, onCancel, editing }) => {
  const [form, setForm] = useState(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full h-10 bg-[#F3F3F5] rounded-lg border border-gray-300 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">My Profile</h2>
          <p className="text-gray-500 text-sm">Manage your profile</p>
        </div>

        {!editing && (
          <button
            onClick={onSave}
            className="px-4 py-2 bg-gradient-to-b from-[#1C398E] to-[#6E85C3] text-white rounded-lg text-sm"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* ================= READONLY MODE ================= */}
      {!editing && (
        <div className="grid md:grid-cols-2 gap-4">
          <ReadonlyField label="First Name" value={user.firstName} />
          <ReadonlyField label="Last Name" value={user.lastName} />
          <ReadonlyField
            label="Date of Birth"
            value={user.dob ? format(new Date(user.dob), "dd/MM/yyyy") : ""}
          />
          <ReadonlyField label="Gender" value={user.gender} />
          <ReadonlyField label="Email" value={user.email} />
          <ReadonlyField label="Phone" value={user.phone} />

          {/* Address full width */}
          <div className="md:col-span-2">
            <ReadonlyField label="Address" value={user.address} />
          </div>
        </div>
      )}

      {/* ================= EDIT MODE ================= */}
      {editing && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* FIRST NAME */}
          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">First Name *</Form.Label>
            <Form.Control
              required
              className={inputClass}
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </Form.Group>

          {/* LAST NAME */}
          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">Last Name *</Form.Label>
            <Form.Control
              required
              className={inputClass}
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Form.Group>

          {/* DOB */}
          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">Date of Birth</Form.Label>
            <Form.Control
              type="date"
              className={inputClass}
              value={form.dob ? form.dob.split("T")[0] : ""}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </Form.Group>

          {/* GENDER (RADIO BUTTONS) */}
          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">Gender</Form.Label>
            <div className="flex gap-6 mt-2">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </Form.Group>

          {/* EMAIL + PHONE IN ONE ROW */}
          {/* EMAIL (READONLY) */}
          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">Email *</Form.Label>
            <Form.Control
              required
              disabled
              type="email"
              className={`${inputClass} bg-gray-200 cursor-not-allowed`}
              value={form.email}
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
          </Form.Group>

          {/* PHONE */}
          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">Phone</Form.Label>
            <Form.Control
              className={inputClass}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Form.Group>


          {/* ADDRESS - FULL WIDTH */}
          <Form.Group className="md:col-span-2">
            <Form.Label className="text-sm text-gray-700 mb-1">Address</Form.Label>
            <Form.Control
              className={inputClass}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Form.Group>

          {/* BUTTONS */}
          <div className="md:col-span-2 flex gap-3 mt-3">
            <Button
              onClick={onCancel}
              className="px-4 py-2 bg-white border border-[#155DFC] text-[#155DFC] rounded-lg"
            >
              Cancel
            </Button>
            <GradientButton type="submit" isFull={false}>
              Update Profile
            </GradientButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ProfileInfoForm;
