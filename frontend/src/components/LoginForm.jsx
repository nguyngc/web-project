import { useState } from "react";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff } from "lucide-react";
import Form from "react-bootstrap/Form";
import GradientButton from "./GradientButton";

const LoginForm = ({ onForgot, onSuccess }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const email = useField("email");
  const password = useField("password");

  const { login, error, isLoading } = useLogin("/api/users/login");

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (password.value.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const result = await login(
    {
      email: email.value,
      password: password.value,
    },
    rememberMe // truyền vào để useLogin biết lưu ở đâu
  );

  if (result) {
    console.log("User:", result.user);
    console.log("Token:", result.token);

    const role = result.user?.role || "user";

    localStorage.setItem("currentUser", JSON.stringify(result.user));
    localStorage.setItem("token", result.token);
    window.dispatchEvent(new Event("userLogin"));

    if (onSuccess) {
      onSuccess(user);
    } else {
      if (role === "user") navigate("/profile");
      else navigate("/" + role);
    }
  }
};

  return (
    <Form onSubmit={handleLogin} className="max-w-md mx-auto bg-white">
      {/* Email */}
      <Form.Group className="mb-4 relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Form.Control
            {...email}
            type="email"
            placeholder="email@example.com"
            className={`w-full pl-10 h-12 bg-gray-50 rounded-lg border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${errors.email ? "border-red-500" : "border-gray-200"
              }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-4 relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Form.Control
            {...password}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`h-12 w-full bg-gray-50 pl-3 rounded-lg border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 pr-10 ${errors.password ? "border-red-500" : "border-gray-200"
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </Form.Group>

      {/* Remember + Forgot */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <Form.Check
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={onForgot}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Forgot password?
        </button>
      </div>

      {/* Error từ useLogin */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Submit Button */}
      <GradientButton type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </GradientButton>
    </Form>
  );
};

export default LoginForm;
