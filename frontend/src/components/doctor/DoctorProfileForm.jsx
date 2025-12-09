
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import GradientButton from "../GradientButton";

const DoctorProfileForm = ({ user, onSave, onCancel, editing }) => {
  const initialForm = {
    ...user,
    dob: user.dob || "",
    gender: user.gender || "",
    phone: user.phone || "",
    address: user.address || "",
    doctorInfo: {
      specialization: user.doctorInfo?.specialization || "",
      licenseNumber: user.doctorInfo?.licenseNumber || "",
      yoe: user.doctorInfo?.yoe || "",
      education: user.doctorInfo?.education || "",
      bio: user.doctorInfo?.bio || "",
      profilePicture: user.doctorInfo?.profilePicture || "",
    }
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm({
      ...user,
      dob: user.dob || "",
      gender: user.gender || "",
      phone: user.phone || "",
      address: user.address || "",
      doctorInfo: {
        specialization: user.doctorInfo?.specialization || "",
        licenseNumber: user.doctorInfo?.licenseNumber || "",
        yoe: user.doctorInfo?.yoe || "",
        education: user.doctorInfo?.education || "",
        bio: user.doctorInfo?.bio || "",
        profilePicture: user.doctorInfo?.profilePicture || "",
      }
    });
  }, [user]);

  // FIXED: nested update support
  const updateNested = (path, value) => {
    const [parent, key] = path.split(".");
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  };

  const handleChange = (field, value) => {
    if (field.includes(".")) return updateNested(field, value);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full h-10 bg-[#F3F3F5] rounded-lg border border-transparent px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";

  const labelClass = "text-sm text-gray-700 mb-1";

  // READONLY FIELD with consistent UI
  const Readonly = ({ label, value, multiline = false }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      {multiline ? (
        <p className="bg-gray-100 p-3 rounded-lg whitespace-pre-line leading-relaxed text-gray-800">
          {value}
        </p>
      ) : (
        <p className="bg-gray-100 p-3 rounded-lg text-gray-800">
          {value}
        </p>
      )}
    </div>
  );
};

  // File upload handler for doctor profile picture
  const handleProfilePicture = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        doctorInfo: {
          ...prev.doctorInfo,
          profilePicture: reader.result, // base64 string
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">My Profile</h2>
          <p className="text-gray-500 text-sm">Manage your profile</p>
        </div>

        {!editing && (
          <button
            onClick={() => onSave("edit-mode")}
            className="px-4 py-2 bg-gradient-to-b from-[#1C398E] to-[#6E85C3] text-white rounded-lg text-sm"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* READONLY MODE */}
      {!editing && (
        <div className="grid md:grid-cols-2 gap-4">

          {/* First / Last Name */}
          <Readonly label="First Name" value={user.firstName} />
          <Readonly label="Last Name" value={user.lastName} />

          {/* Email / DOB */}
          <Readonly label="Email" value={user.email} />
          <Readonly label="Date of Birth" value={user.dob?.split("T")[0]} />

          {/* Gender / Phone */}
          <Readonly label="Gender" value={user.gender} />
          <Readonly label="Phone" value={user.phone} />

          {/* Address (full width) */}
          <div className="md:col-span-2">
            <Readonly label="Address" value={user.address} />
          </div>

          {/* Specialization / License / YOE (one line, 3 columns) */}
          <div className="md:col-span-2 grid md:grid-cols-3 gap-4">
            <Readonly
              label="Specialization"
              value={user.doctorInfo?.specialization}
            />
            <Readonly
              label="License Number"
              value={user.doctorInfo?.licenseNumber}
            />
            <Readonly
              label="Years of Experience"
              value={user.doctorInfo?.yoe}
            />
          </div>

          {/* Education (full width) */}
          <div className="md:col-span-2">
            <Readonly
              label="Education"
              value={user.doctorInfo?.education}
              multiline
            />
          </div>

          {/* Bio (full width) */}
          <div className="md:col-span-2">
            <Readonly label="Bio" value={user.doctorInfo?.bio} multiline/>
          </div>
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
          {/* PROFILE PICTURE – EDIT MODE ONLY */}
          <div className="md:col-span-2 flex flex-col mb-4">
            <label className="text-sm text-gray-700 mb-1">Profile Picture</label>

            {/* Preview */}
            <img
              src={
                form.doctorInfo.profilePicture ||
                "/default-doctor.png"
              }
              alt="Doctor"
              className="w-28 h-28 rounded-full object-cover border mb-3"
            />

            {/* Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) handleProfilePicture(e.target.files[0]);
              }}
            />

            <p className="text-xs text-gray-500 mt-1">
              Upload JPG or PNG, max 2MB.
            </p>
          </div>

          {/* BASIC INFO */}
          <Form.Group>
            <Form.Label className={labelClass}>First Name *</Form.Label>
            <Form.Control
              required
              className={inputClass}
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className={labelClass}>Last Name *</Form.Label>
            <Form.Control
              required
              className={inputClass}
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className={labelClass}>Email *</Form.Label>
            <Form.Control
              disabled
              className={inputClass}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Form.Group>

          {/* DOB */}
          <Form.Group>
            <Form.Label className={labelClass}>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              className={inputClass}
              value={form.dob ? form.dob.split("T")[0] : ""}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </Form.Group>

          {/* GENDER as RADIO */}
          <Form.Group>
            <Form.Label className={labelClass}>Gender</Form.Label>
            <div className="flex gap-4 mt-1">
              {["male", "female", "other"].map((g) => (
                <label key={g} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </Form.Group>

          {/* PHONE */}
          <Form.Group>
            <Form.Label className={labelClass}>Phone</Form.Label>
            <Form.Control
              className={inputClass}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Form.Group>

          {/* ADDRESS */}
          <Form.Group className="md:col-span-2">
            <Form.Label className={labelClass}>Address</Form.Label>
            <Form.Control
              className={inputClass}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Form.Group>

          {/* DOCTOR INFO — 3 FIELDS IN ONE LINE */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Group>
              <Form.Label className={labelClass}>Specialization *</Form.Label>
              <Form.Control
                required
                className={inputClass}
                value={form.doctorInfo.specialization}
                onChange={(e) => handleChange("doctorInfo.specialization", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className={labelClass}>License Number *</Form.Label>
              <Form.Control
                required
                className={inputClass}
                value={form.doctorInfo.licenseNumber}
                onChange={(e) => handleChange("doctorInfo.licenseNumber", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className={labelClass}>Years of Experience *</Form.Label>
              <Form.Control
                required
                type="number"
                className={inputClass}
                value={form.doctorInfo.yoe}
                onChange={(e) => handleChange("doctorInfo.yoe", e.target.value)}
              />
            </Form.Group>
          </div>

          {/* Education */}
          <Form.Group className="md:col-span-2">
            <Form.Label className={labelClass}>Education</Form.Label>
            <Form.Control
              className={inputClass}
              value={form.doctorInfo.education}
              onChange={(e) => handleChange("doctorInfo.education", e.target.value)}
            />
          </Form.Group>

          {/* Bio */}
          <Form.Group className="md:col-span-2">
            <Form.Label className={labelClass}>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="w-full bg-[#F3F3F5] rounded-lg px-3 py-2 text-sm"
              value={form.doctorInfo.bio}
              onChange={(e) => handleChange("doctorInfo.bio", e.target.value)}
            />
          </Form.Group>

          {/* BUTTONS */}
          <div className="md:col-span-2 flex gap-3 mt-4">
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

export default DoctorProfileForm;
