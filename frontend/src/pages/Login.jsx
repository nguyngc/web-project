import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import ForgotPassword from "../components/ForgotPassword";
import Image from "react-bootstrap/Image";
import eyeImage from "../assets/images/eye-glasses.jpg";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showForgot, setShowForgot] = useState(false);

  return (
    <>
      <Hero page="login" />

      <div className="flex flex-col items-center px-4 lg:px-[200px] py-[50px] w-full">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 w-full max-w-6xl">

          {/* Left Image */}
          <div className="flex-1">
            <Image
              src={eyeImage}
              alt="Eye glasses"
              className="object-cover rounded-xl shadow w-full h-full"
            />
          </div>

          {/* Right Side */}
          <div className="flex-1 w-full">

            {/* Forgot Password mode */}
            {showForgot ? (
              <ForgotPassword onBack={() => setShowForgot(false)} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 w-full">

                {/* Tabs */}
                <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`flex-1 py-2 rounded-md transition-all font-medium ${
                      activeTab === "login"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`flex-1 py-2 rounded-md transition-all font-medium ${
                      activeTab === "register"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Forms */}
                {activeTab === "login" ? (
                  <LoginForm onForgot={() => setShowForgot(true)} />
                ) : (
                  <RegistrationForm />
                )}

                {/* Support link */}
                {!showForgot && (
                  <p className="text-center text-sm text-gray-600 mt-6">
                    Need help?{" "}
                    <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                      Contact support
                    </Link>
                  </p>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
