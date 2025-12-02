import { useState } from "react";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Eye, EyeOff } from "lucide-react";
import Form from "react-bootstrap/Form";
import GradientButton from "./GradientButton";

const RegistrationForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const firstName = useField("text");
  const lastName = useField("text");
  const email = useField("email");
  const phone = useField("text");
  const password = useField("password");
  const confirmPassword = useField("password");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const dob = useField("date");
  const gender = useField("select");
  const address = useField("text");
  const term = useField("checkbox");
  const promotional = useField("checkbox");

  const { signup, error, isLoading } = useSignup("/api/users/signup");

  // validate input
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.value.trim()) newErrors.firstName = "First name is required";
    if (!lastName.value.trim()) newErrors.lastName = "Last name is required";

    if (!email.value.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email.value)) newErrors.email = "Invalid email";

    if (!password.value) newErrors.password = "Password is required";
    else if (password.value.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (confirmPassword.value !== password.value)
      newErrors.confirmPassword = "Passwords do not match";

    if (!term.value) newErrors.term = "You must agree to the Terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await signup({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      dob: formatDate(dob.value),
      gender: gender.value,
      phone: phone.value,
      address: address.value,

      term: term.value,
      promotional: promotional.value
    });

    if (result) {
      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      const newUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        role: "user",
      };

      localStorage.setItem("currentUser", JSON.stringify(newUser));
      window.dispatchEvent(new Event("userLogin"));

      if (onSuccess) {
        onSuccess(newUser);
      } else {
        navigate("/profile");
      }
    } else {
      console.error("Signup failed:");
    };
  }

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
              {...firstName}
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
              {...lastName}
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
            {...email}
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
            {...phone}
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
            {...password}
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
            {...confirmPassword}
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
      {/* Birthday */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Form.Group>
          <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
            Day of Birth
          </Form.Label>
          <div className="relative">
            {/* <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
            <Form.Control
              {...dob}
              placeholder="DD/MM/YYYY"
              className={`pl-10 h-12 bg-gray-50 border ${errors.dob ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
            />
          </div>
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
            Gender
          </Form.Label>
          <div className="relative">
            {/* <Gender className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
            <select
              {...gender}
              className={`pl-10 h-12 bg-gray-50 border ${errors.gender ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg w-full`}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </Form.Group>

      </div>
      {/* Address */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Address
        </Form.Label>
        <div className="relative">
          {/* <address className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
          <Form.Control
            {...address}
            placeholder="Vuoritie 4D 02103 Espoo"
            className={`w-full pl-10 h-12 bg-gray-50 border ${errors.address ? "border-red-500" : "border-gray-200"
              } focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg`}
          />
        </div>
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </Form.Group>

      {/* Terms & Promotional */}
      <Form.Group className="mb-4 flex items-start space-x-2">
        <Form.Check
          {...term}
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

      {errors.term && (
        <p className="text-red-500 text-sm mb-4">{errors.term}</p>
      )}

      <Form.Group className="mb-6 flex items-start space-x-2">
        <Form.Check
          // id="promotional"
          {...promotional}
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

    </Form>
  );
};

export default RegistrationForm;
