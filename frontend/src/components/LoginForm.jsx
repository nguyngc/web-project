import { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation (min 6 characters)
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let role = "user";
    let firstName = "John";
    let lastName = "Doe";

    if (email.toLowerCase().includes("doctor")) {
      role = "doctor";
      firstName = "Dr. Sarah";
      lastName = "Johnson";
    } else if (email.toLowerCase().includes("admin")) {
      role = "admin";
      firstName = "Admin";
      lastName = "Manager";
    }

    const user = { email, firstName, lastName, phone: "(000) 123-4567", role };
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.dispatchEvent(new Event("userLogin"));

    if (role === "doctor") window.location.hash = "#doctor-dashboard";
    else if (role === "admin") window.location.hash = "#admin-dashboard";
    else window.location.hash = "#account";
  };

  return (
    <Form
      onSubmit={handleLogin}
      className="max-w-md mx-auto bg-white"
    >
      {/* Email */}
      <Form.Group className="mb-4 relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Form.Control
            type="email"
            placeholder="email@example.com"
            className={`w-full pl-10 h-12 bg-gray-50 rounded-lg border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-4 relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
        <div className="relative">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`h-12 w-full bg-gray-50 pl-3 rounded-lg border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 pr-10 ${
              errors.password ? "border-red-500" : "border-gray-200"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </Form.Group>

      {/* Remember + Forgot */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <label className="flex items-center gap-2">
          <Form.Check type="checkbox" />
          Remember me
        </label>
        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="px-6 md:px-[30px] py-3 rounded-[10px] text-sm font-poppins font-semibold uppercase hover:opacity-90 transition-opacity text-white bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] w-full"
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
