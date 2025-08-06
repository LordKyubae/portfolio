"use client";

import { DockItem } from "@/App.tsx";

interface DockProps {
  items: { id: DockItem['id']; label: string; icon: React.ReactNode }[];
  openWindows: Record<string, boolean>;
  darkMode: boolean;
  onClick: (id: DockItem['id']) => void;
}

export default function Dock({ items, openWindows, darkMode, onClick }: DockProps) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 ${
        darkMode ? "bg-black/40" : "bg-white/80"
      } rounded-2xl shadow-2xl flex gap-6 backdrop-blur-md z-[1000]`}
    >
      {items.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={() => onClick(id)}
          aria-label={`${label} dock item`}
          className="relative flex items-center justify-center w-12 h-12 focus:outline-none cursor-pointer"
        >
          <span className="text-3xl select-none">{icon}</span>

          {openWindows[id] && (
            <span
              className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 rounded-full w-2 h-2 ${
                darkMode ? "bg-green-400" : "bg-green-600"
              }`}
            />
          )}
        </button>
      ))}
    </div>
  );
}