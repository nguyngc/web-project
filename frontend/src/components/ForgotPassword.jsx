import { useState } from "react";
import { Mail } from "lucide-react";
import Form from "react-bootstrap/Form";
import GradientButton from "./GradientButton";

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setSuccessMsg("If this email is registered, a password reset link has been sent.");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full">

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reset Your Password</h2>

      <p className="text-gray-600 text-sm mb-6">
        Enter your email address and we will send you a link to reset your password.
      </p>

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-4 position-relative">
          {/* <label className="block text-sm font-semibold mb-2">Email Address</label>
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /> */}
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Form.Control
              type="email"
              placeholder="email@example.com"
              className={`w-full pl-10 h-12 bg-gray-50 rounded-lg border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${error ? "border-red-500" : "border-gray-200"
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          {successMsg && <p className="text-green-600 text-sm mt-1">{successMsg}</p>}
        </Form.Group>

        <GradientButton type="submit">
          Send Reset Link
        </GradientButton>
      </Form>

      {/* Back to Login */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Remember your password?{" "}
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to Login
        </button>
      </p>

    </div>
  );
};

export default ForgotPassword;
