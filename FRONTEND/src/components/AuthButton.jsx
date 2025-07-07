import React, { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { getCurrentUser, logOutUser } from "../api/user.api";

const AuthButton = () => {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((user) => {
        setIsLoggedIn(!!(user && user.email));
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [routerState.location.pathname]);

  const handleClick = async () => {
    if (isLoggedIn) {
      try {
        await logOutUser();
        setIsLoggedIn(false);
        navigate({ to: "/" });
      } catch (err) {
        console.error("Logout failed:", err);
      }
    } else {
      navigate({ to: "/auth" });
    }
  };

  if (isLoading) {
    return (
      <button className="px-6 py-2.5 rounded-xl bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600 animate-pulse-slow">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 btn-hover ${
        isLoggedIn
          ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25"
          : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25"
      }`}
    >
      {isLoggedIn ? (
        <div className="flex items-center space-x-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span>Login</span>
        </div>
      )}
    </button>
  );
};

export default AuthButton;
