import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import GradientButton from "../GradientButton";
import ReadonlyField from "../common/ReadonlyField";
import { format } from "date-fns";

const ProfileInfoForm = ({ user, onSave, onCancel, editing }) => {
  const [form, setForm] = useState(user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const inputClass =
    "w-full h-10 bg-[#F3F3F5] rounded-lg border border-transparent px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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

      {/* READONLY MODE */}
      {!editing && (
        <div className="grid md:grid-cols-2 gap-4">
          <ReadonlyField label="First Name" value={user.firstName} />
          <ReadonlyField label="Last Name" value={user.lastName} />
          <ReadonlyField label="Day of Birth" value={user.dob ? format(new Date(user.dob), "dd/MM/yyyy") : ""} />
          <ReadonlyField label="Gender" value={user.gender} />
          <ReadonlyField label="Email" value={user.email} />
          <ReadonlyField label="Phone" value={user.phone} />
          <ReadonlyField label="Address" value={user.address} />

        </div>
      )}

      {/* EDIT MODE */}
      {editing && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">
              First Name *
            </Form.Label>
            <Form.Control
              required
              className={inputClass}
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs">{errors.firstName}</p>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="text-sm text-gray-700 mb-1">
              Last Name *
            </Form.Label>
            <Form.Control
              required
              className={inputClass}
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs">{errors.lastName}</p>
            )}
          </Form.Group>

          <Form.Group className="md:col-span-2">
            <Form.Label className="text-sm text-gray-700 mb-1">Email *</Form.Label>
            <Form.Control
              required
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email}</p>
            )}
          </Form.Group>

          <div className="md:col-span-2 flex gap-3 mt-3">
            <Button
              onClick={onCancel}
              className="px-4 py-2 bg-white border border-[#155DFC] text-[#155DFC] rounded-lg"
            >
              Cancel
            </Button>
            <GradientButton type="submit" isFull={false}>Update Profile</GradientButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ProfileInfoForm;
