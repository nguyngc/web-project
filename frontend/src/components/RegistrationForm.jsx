import { useState } from "react";
import { User, Phone, Mail, Eye, EyeOff } from "lucide-react";
import Form from "react-bootstrap/Form";
import GradientButton from "./GradientButton";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    promotional: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = type === "checkbox" ? checked : value;

    // Auto-format phone number
    if (name === "phone" && type !== "checkbox") {
      newValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;

    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format based on number of digits
    if (digits.length <= 3) {
      return `(${digits}`;
    }
    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };


  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})$/;

    // First Name
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (!nameRegex.test(formData.firstName)) newErrors.firstName = "Only letters allowed";

    // Last Name
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (!nameRegex.test(formData.lastName)) newErrors.lastName = "Only letters allowed";

    // Email
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";

    // Phone (optional)
    if (formData.phone && !phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    // Password
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    // Confirm Password
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    // Terms
    if (!formData.terms) newErrors.terms = "You must agree to the Terms and Privacy Policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Registration data:", formData);
    alert("Registration successful!");
    // Reset form or redirect user here
  };

  return (
    <Form
      onSubmit={handleRegister}
      className="max-w-lg mx-auto bg-white"
    >
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Form.Group>
          <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
            First Name
          </Form.Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Form.Control
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="John"
              className={`pl-10 h-12 bg-gray-50 border ${errors.firstName ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
            Last Name
          </Form.Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Form.Control
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Doe"
              className={`pl-10 h-12 bg-gray-50 border ${errors.lastName ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
            />
          </div>
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </Form.Group>
      </div>

      {/* Email */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Email Address
        </Form.Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Form.Control
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="john.doe@example.com"
            className={`w-full pl-10 h-12 bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-200"
              } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </Form.Group>

      {/* Phone */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Phone Number
        </Form.Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Form.Control
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            placeholder="(123) 123-4567"
            className={`w-full pl-10 h-12 bg-gray-50 border ${errors.phone ? "border-red-500" : "border-gray-200"
              } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Password
        </Form.Label>
        <div className="relative">
          <Form.Control
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className={`w-full pl-3 pr-10 h-12 bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-200"
              } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Confirm Password
        </Form.Label>
        <div className="relative">
          <Form.Control
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            className={`w-full pl-3 pr-10 h-12 bg-gray-50 border ${errors.confirmPassword ? "border-red-500" : "border-gray-200"
              } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </Form.Group>

      {/* Terms & Promotional */}
      <Form.Group className="mb-4 flex items-start space-x-2">
        <Form.Check
          id="terms"
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          className="mt-1 cursor-pointer"
        />

        <label
          htmlFor="terms"
          className="text-sm cursor-pointer leading-relaxed"
        >
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Privacy Policy
          </a>
        </label>
      </Form.Group>

      {errors.terms && (
        <p className="text-red-500 text-sm mb-4">{errors.terms}</p>
      )}


      <Form.Group className="mb-6 flex items-start space-x-2">
        <Form.Check
          id="promotional"
          type="checkbox"
          name="promotional"
          checked={formData.promotional}
          onChange={handleChange}
          className="mt-1 cursor-pointer"
        />

        <label
          htmlFor="promotional"
          className="text-sm cursor-pointer leading-relaxed"
        >
          I want to receive promotional emails and health tips from Vision Clinic
        </label>
      </Form.Group>


      {/* Register Button */}
      <GradientButton type="submit">
        Create Account
      </GradientButton>
    </Form>
  );
};

export default RegistrationForm;
