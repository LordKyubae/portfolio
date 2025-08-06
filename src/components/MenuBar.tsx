"use client";

import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";

interface MenuBarProps {
  activeWindowTitle?: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function MenuBar({
                                  activeWindowTitle = "Portfolio",
                                  darkMode,
                                  toggleDarkMode,
                                }: MenuBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-8 px-4 flex items-center text-sm border-b z-[1000] transition-colors ${
        darkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center gap-2">
        <FaCode className="text-base" />
        <span className="font-medium">{activeWindowTitle.charAt(0).toUpperCase() + activeWindowTitle.slice(1)}</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>

        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className={`px-3 py-1 rounded-md transition-colors ${darkMode ? "hover:bg-gray-600 hover:text-white" : "hover:bg-gray-400 hover:text-white"}`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}