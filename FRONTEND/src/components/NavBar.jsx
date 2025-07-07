import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import AuthButton from "./AuthButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-gray-900/80 border-b border-gray-800/50 shadow-xl shadow-black/20"
          : "bg-gray-950/30 border-b border-gray-800/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - App Name */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-indigo-500/25">
                <svg
                  className="w-6 h-6 text-white drop-shadow-sm"
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
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-sm">
                  LinkShort
                </h1>
                <p className="text-xs text-gray-400 -mt-1 opacity-80">
                  URL Shortener
                </p>
              </div>
            </Link>
          </div>

          {/* Center - Navigation (for larger screens) */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/5 hover:backdrop-blur-sm relative group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/5 hover:backdrop-blur-sm relative group"
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Right side - Auth button */}
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isScrolled
            ? "border-t border-gray-800/50 bg-gray-900/60 backdrop-blur-sm"
            : "border-t border-gray-800/20 bg-gray-950/20"
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          <Link
            to="/"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
