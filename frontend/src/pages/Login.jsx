import { useState } from "react"
import Hero from "../components/Hero"
import LoginForm from "../components/LoginForm"
import RegistrationForm from "../components/RegistrationForm"

const Login = () => {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <>
      <Hero page="login" />

      <div className="flex flex-col items-center px-4 lg:px-[200px] py-[50px] w-full">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left side - Eye chart */}
          <div className="flex-1">
            <img
              src="../src/assets/images/eye-glasses.jpg"
              alt="Eye glasses"
              className="object-cover rounded-[10px] shadow"
            />
          </div>

          {/* Right side - Form */}
          <div className="flex-1 w-full">
            <div className="w-full">
              <div className="w-full bg-white rounded-2xl shadow-lg p-8">
                {/* Tabs */}
                <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`flex-1 py-2 text-center rounded-md font-medium transition-colors ${activeTab === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`flex-1 py-2 text-center rounded-md font-medium transition-colors ${activeTab === "register" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    Register
                  </button>
                </div>

                {activeTab === "login" ? (
                  <LoginForm />
                ) : (
                  <RegistrationForm />
                )}

                {/* Support link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Having trouble accessing your account?{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Contact support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;