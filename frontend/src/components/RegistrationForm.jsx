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

    if (confirmPassword.value !== password.value)
      newErrors.confirmPassword = "Passwords do not match";

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

      console.log(result);
      const newUser = result.user;

      localStorage.setItem("currentUser", JSON.stringify(result.user));
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

  const inputClass =
    "w-full h-12 bg-gray-50 rounded-lg border border-gray-200 pl-3 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-200";

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
              required
              {...firstName}
              placeholder="John"
              className={`pl-10 ${inputClass}`}
            />
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
            Last Name
          </Form.Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Form.Control
              required
              {...lastName}
              placeholder="Doe"
              className={`pl-10 ${inputClass}`}
            />
          </div>
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
            required
            {...email}
            placeholder="john.doe@example.com"
            className={`w-full pl-10 ${inputClass}`}
          />
        </div>
      </Form.Group>

      {/* Phone */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Phone Number
        </Form.Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Form.Control
            required
            {...phone}
            placeholder="(123) 123-4567"
            className={`w-full pl-10 ${inputClass}`}
          />
        </div>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Password
        </Form.Label>
        <div className="relative">
          <Form.Control
            required
            {...password}
            placeholder="Create a password"
            className={`w-full pl-3 pr-10 ${inputClass}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Confirm Password
        </Form.Label>
        <div className="relative">
          <Form.Control
            required
            {...confirmPassword}
            placeholder="Re-enter your password"
            className={`w-full pl-3 pr-10 ${inputClass}`}
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
            <Form.Control
              {...dob}
              placeholder="DD/MM/YYYY"
              className={`${inputClass}`}
            />
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
            Gender
          </Form.Label>
          <div className="relative">
            {/* <Gender className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender.value === "Male"}
                  onChange={(e) => gender.onChange(e)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="text-sm text-gray-700">Male</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender.value === "Female"}
                  onChange={(e) => gender.onChange(e)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="text-sm text-gray-700">Female</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={gender.value === "Other"}
                  onChange={(e) => gender.onChange(e)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="text-sm text-gray-700">Other</span>
              </label>
            </div>

          </div>
        </Form.Group>

      </div>
      {/* Address */}
      <Form.Group className="mb-6 relative">
        <Form.Label className="text-sm font-semibold text-gray-900 mb-1 block">
          Address
        </Form.Label>
        <div className="relative">
          <Form.Control
            required
            {...address}
            placeholder="Vuoritie 4D 02103 Espoo"
            className={`w-full ${inputClass}`}
          />
        </div>
      </Form.Group>

      {/* Terms & Promotional */}
      <Form.Group className="mb-4 flex items-start space-x-2">
        <Form.Check
          required
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
