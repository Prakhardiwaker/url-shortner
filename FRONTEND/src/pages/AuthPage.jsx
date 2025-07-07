import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-indigo-300 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                LinkShort
              </h1>
              <p className="text-sm text-gray-400 -mt-1">URL Shortener</p>
            </div>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-800/50 p-1 rounded-2xl mb-8 backdrop-blur-sm border border-gray-700/50">
          <button
            onClick={() => setLogin(true)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
              login
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setLogin(false)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
              !login
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div
            className={`transition-all duration-500 transform ${
              login
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 absolute inset-0"
            }`}
          >
            {login && <LoginForm state={setLogin} />}
          </div>

          <div
            className={`transition-all duration-500 transform ${
              !login
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 absolute inset-0"
            }`}
          >
            {!login && <RegisterForm state={setLogin} />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
