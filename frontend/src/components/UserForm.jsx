import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import GradientButton from "./GradientButton";

const UserForm = ({
  mode = "add",                   // "add" or "edit"
  initialData = null,            // user object (for editing)
  onCancel,                      // cancel handler
  onSubmit                       // submit handler → returns userData
}) => {
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    status: true, // "active"
    // doctor fields
    photo: "",
    specialization: "",
    licenseNumber: "",
    yearsOfExperience: 0,
    education: "",
    bio: "",
  });

  // Load initial data for edit mode
  useEffect(() => {
    if (initialData) {
      setForm({ ...form, ...initialData });
      setRole(initialData.role || "user");
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // -----------------------
  // VALIDATION
  // -----------------------
  const validateForm = () => {
    const temp = {};

    // Required base info
    if (!form.firstName) temp.firstName = "First name is required.";
    if (!form.lastName) temp.lastName = "Last name is required.";
    if (!form.dateOfBirth) temp.dateOfBirth = "Date of birth is required.";
    if (!form.email) temp.email = "Email is required.";
    if (!form.phone) temp.phone = "Phone number is required.";
    if (!form.address) temp.address = "Address is required.";

    // Email check
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      temp.email = "Invalid email format.";
    }

    // Password checks only in Add mode
    if (mode === "add") {
      if (!form.password) temp.password = "Password is required.";
      if (form.password && form.password.length < 6) {
        temp.password = "Password must be at least 6 characters.";
      }
      if (form.password !== form.confirmPassword) {
        temp.confirmPassword = "Passwords do not match.";
      }
    }

    // Doctor validation
    if (role === "doctor") {
      if (!form.specialization) temp.specialization = "Specialization required.";
      if (!form.licenseNumber) temp.licenseNumber = "License number required.";
      if (!form.education) temp.education = "Education is required.";
      if (!form.bio) temp.bio = "Short bio is required.";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const output = {
      ...form,
      role,
    };

    onSubmit(output);
  };

  const labelClass = "block text-[#364153] text-sm font-inter mb-2 mt-4";
  const errorClass = "text-red-500 text-sm mt-1 font-inter";
  const inputClass =
    "w-full h-9 px-3 py-1 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] " +
    "focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";
  const textareaClass =
    "w-full px-3 py-1 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] " +
    "focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="font-semibold text-gray-800 mb-2">
        {mode === "add" ? "Add New User" : "Edit User"}
      </h2>
      <p className="text-gray-500 mb-6">
        {mode === "add"
          ? "Fill out the details to create a new user."
          : "Update user information below."}
      </p>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">

        {/* BASIC INFO */}
        <div className="border-b border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>

          {/* FIRST & LAST NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group>
              <label className={labelClass}>First Name <span className={errorClass}>*</span></label>
              <Form.Control
                className={`${inputClass} ${errors.firstName && "border-red-500"}`}
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {errors.firstName && (
                <p className={errorClass}>{errors.firstName}</p>
              )}
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Last Name <span className={errorClass}>*</span></label>
              <Form.Control
                className={`${inputClass} ${errors.lastName && "border-red-500"}`}
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              {errors.lastName && (
                <p className={errorClass}>{errors.lastName}</p>
              )}
            </Form.Group>
          </div>


          {/* DOB / GENDER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group>
              <label className={labelClass}>Date of Birth <span className={errorClass}>*</span></label>
              <Form.Control
                type="date"
                className={`${inputClass} ${errors.dateOfBirth && "border-red-500"}`}
                value={form.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
              {errors.dateOfBirth && (
                <p className={errorClass}>{errors.dateOfBirth}</p>
              )}
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Gender <span className={errorClass}>*</span></label>
              <div className="flex gap-6 pt-2">
                {["male", "female", "other"].map((g) => (
                  <label key={g} className="flex items-center gap-2 text-gray-700 text-sm font-inter">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    />
                    <span className="capitalize">{g}</span>
                  </label>
                ))}
              </div>
            </Form.Group>
          </div>


          {/* EMAIL / PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group>
              <label className={labelClass}>Email <span className={errorClass}>*</span></label>
              <Form.Control
                type="email"
                className={`${inputClass} ${errors.email && "border-red-500"}`}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email}</p>
              )}
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Phone <span className={errorClass}>*</span></label>
              <Form.Control
                className={`${inputClass} ${errors.phone && "border-red-500"}`}
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone}</p>
              )}
            </Form.Group>
          </div>


          {/* ADDRESS */}
          <Form.Group className="mb-4">
            <label className={labelClass}>Address <span className={errorClass}>*</span></label>
            <Form.Control
              className={`${inputClass} ${errors.address && "border-red-500"}`}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {errors.address && (
              <p className={errorClass}>{errors.address}</p>
            )}
          </Form.Group>

          {/* PASSWORD / CONFIRM */}
          {mode === "add" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Password */}
              <Form.Group className="relative">
                <label className={labelClass}>Password <span className={errorClass}>*</span></label>
                <div className="relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    className={`${inputClass} pr-10 ${errors.password && "border-red-500"}`}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className={errorClass}>{errors.password}</p>}
              </Form.Group>

              {/* Confirm */}
              <Form.Group className="relative">
                <label className={labelClass}>Confirm Password <span className={errorClass}>*</span></label>
                <div className="relative">
                  <Form.Control
                    type={showConfirm ? "text" : "password"}
                    className={`${inputClass} pr-10 ${errors.confirmPassword && "border-red-500"}`}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
              </Form.Group>

            </div>
          )}

          {/* ROLE/STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group className="mb-8">
              <label className={labelClass}>Role <span className={errorClass}>*</span></label>
              <Form.Select
                className={inputClass}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <label className={labelClass}>Status <span className={errorClass}>*</span></label>
              <div className="flex gap-6 pt-2">
                {[true, false].map((item) => (
                  <label key={item.toString()} className="flex items-center gap-2 text-gray-700 text-sm font-inter">
                    <input
                      type="radio"
                      name="status"
                      value={item.toString()}
                      checked={form.status === item}
                      onChange={(e) => handleChange("status", e.target.value === "true")}
                    />
                    <span className="capitalize">{item ? "active" : "inactive"}</span>
                  </label>
                ))}
              </div>
            </Form.Group>
          </div>
        </div>

        {/* ===========================
            DOCTOR FIELDS
        ============================ */}
        {role === "doctor" && (
          <div className="pb-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-4">
              Doctor Information
            </h3>

            <Form.Group className="mb-4">
              <label className={labelClass}>Photo URL</label>
              <Form.Control
                className={inputClass}
                value={form.photo}
                onChange={(e) => handleChange("photo", e.target.value)}
              />
            </Form.Group>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Group>
                <label className={labelClass}>Specialization <span className={errorClass}>*</span></label>
                <Form.Control
                  className={`${inputClass} ${errors.specialization && "border-red-500"}`}
                  value={form.specialization}
                  onChange={(e) => handleChange("specialization", e.target.value)}
                />
                {errors.specialization && (<p className={errorClass}>{errors.specialization}</p>)}
              </Form.Group>

              <Form.Group>
                <label className={labelClass}>License Number <span className={errorClass}>*</span></label>
                <Form.Control
                  className={`${inputClass} ${errors.licenseNumber && "border-red-500"}`}
                  value={form.licenseNumber}
                  onChange={(e) => handleChange("licenseNumber", e.target.value)}
                />
                {errors.licenseNumber && (<p className={errorClass}>{errors.licenseNumber}</p>)}
              </Form.Group>
            </div>

            <Form.Group className="mb-4">
              <label className={labelClass}>Education <span className={errorClass}>*</span></label>
              <Form.Control
                as="textarea"
                rows={3}
                className={`${textareaClass} ${errors.education ? "border-red-500" : ""
                  }`}
                value={form.education}
                onChange={(e) => handleChange("education", e.target.value)}
              />
              {errors.education && (<p className={errorClass}>{errors.education}</p>)}
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Bio <span className={errorClass}>*</span></label>
              <Form.Control
                as="textarea"
                rows={4}
                className={`${textareaClass} ${errors.bio ? "border-red-500" : ""
                  }`}
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
              {errors.bio && (<p className={errorClass}>{errors.bio}</p>)}
            </Form.Group>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <Button
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] border border-[#155DFC] bg-white text-[#155DFC] hover:bg-[#155DFC]/5 transition font-medium"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <GradientButton type="submit" isFull={false}>
            {mode === "add" ? "Create User" : "Save Changes"}
          </GradientButton>
        </div>
      </Form>
    </div>
  );
}

export default UserForm;