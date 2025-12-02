import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import GradientButton from "../GradientButton";

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
    dob: "",
    gender: "male",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    status: true, // "active"
    // doctor fields
    doctorInfo: {
      profilePicture: "",
      specialization: "",
      licenseNumber: "",
      yoe: "",
      education: "",
      bio: ""
    }
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
                required
                className={`${inputClass}`}
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Last Name <span className={errorClass}>*</span></label>
              <Form.Control
                required
                className={`${inputClass}`}
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Form.Group>
          </div>


          {/* DOB / GENDER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group>
              <label className={labelClass}>Date of Birth</label>
              <Form.Control
                type="date"
                className={`${inputClass}`}
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Gender</label>
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
                required
                type="email"
                className={`${inputClass}`}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Phone</label>
              <Form.Control
                className={`${inputClass}`}
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Form.Group>
          </div>


          {/* ADDRESS */}
          <Form.Group className="mb-4">
            <label className={labelClass}>Address</label>
            <Form.Control
              className={`${inputClass}`}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Form.Group>

          {/* PASSWORD / CONFIRM */}
          {mode === "add" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Password */}
              <Form.Group className="relative">
                <label className={labelClass}>Password <span className={errorClass}>*</span></label>
                <div className="relative">
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"}
                    className={`${inputClass} pr-10`}
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
                    required
                    type={showConfirm ? "text" : "password"}
                    className={`${inputClass} pr-10`}
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
              <label className={labelClass}>Status</label>
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
              <label className={labelClass}>Profile Picture</label>
              <Form.Control
                type="file"
                accept="image/*"
                className={inputClass}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleChange("doctorInfo", {
                      ...form.doctorInfo,
                      profilePicture: reader.result,
                    });
                  };
                  reader.readAsDataURL(file);
                }}
              />

              {form.doctorInfo?.profilePicture && (
                <img
                  src={form.doctorInfo.profilePicture}
                  className="h-28 mt-2 rounded-lg border object-cover"
                />
              )}
            </Form.Group>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Form.Group>
                <label className={labelClass}>Specialization <span className={errorClass}>*</span></label>
                <Form.Control
                  required
                  className={`${inputClass}`}
                  value={form.doctorInfo.specialization}
                  onChange={(e) => handleChange("doctorInfo",
                    {
                      ...form.doctorInfo, specialization: e.target.value
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <label className={labelClass}>License Number <span className={errorClass}>*</span></label>
                <Form.Control
                  required
                  className={`${inputClass}`}
                  value={form.doctorInfo.licenseNumber}
                  onChange={(e) => handleChange("doctorInfo",
                    {
                      ...form.doctorInfo, licenseNumber: e.target.value
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <label className={labelClass}>Years of Experience <span className={errorClass}>*</span></label>
                <Form.Control
                  required
                  className={`${inputClass}`}
                  value={form.doctorInfo.yoe}
                  onChange={(e) => handleChange("doctorInfo",
                    {
                      ...form.doctorInfo, yoe: e.target.value
                    })
                  }
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-4">
              <label className={labelClass}>Education <span className={errorClass}>*</span></label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                className={`${textareaClass}`}
                value={form.doctorInfo.education}
                onChange={(e) => handleChange("doctorInfo",
                  {
                    ...form.doctorInfo, education: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Bio <span className={errorClass}>*</span></label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                className={`${textareaClass}`}
                value={form.doctorInfo.bio}
                onChange={(e) => handleChange("doctorInfo",
                  {
                    ...form.doctorInfo, bio: e.target.value
                  })
                }
              />
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