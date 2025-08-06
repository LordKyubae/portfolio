"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import MacWindow from "@/components/MacWindow.tsx";
import { getIconComponent } from "@/lib/utils.ts";
import * as FaIcons from "react-icons/fa";

interface DockItem {
  id: 'about' | 'projects' | 'contact';
  label: string;
}

const dockItems: DockItem[] = [
  {
    id: 'about',
    label: 'About'
  },
  {
    id: 'projects',
    label: 'Projects'
  },
  {
    id: 'contact',
    label: 'Contact'
  }
];

interface WindowState {
  isOpen: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

type WindowsLayout = {
  [key in DockItem['id']]?: WindowState;
};

const defaultLayout: WindowsLayout = {
  about: {
    isOpen: true,
    x: 100,
    y: 80,
    width: 800,
    height: 600
  },
  projects: {
    isOpen: false,
    x: 150,
    y: 100,
    width: 800,
    height: 600
  },
  contact: {
    isOpen: false,
    x: 200,
    y: 120,
    width: 800,
    height: 600
  }
};

export default function App() {
  const projects = useQuery(api.myFunctions.listProjects) || [];

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [windowsLayout, setWindowsLayout] = useState<WindowsLayout>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('windowsLayout');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultLayout;
        }
      }
    }
    return defaultLayout;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('windowsLayout', JSON.stringify(windowsLayout));
  }, [windowsLayout]);

  const toggleWindow = (id: DockItem['id']) => {
    setWindowsLayout((prev) => {
      const prevState = prev[id] || defaultLayout[id];
      return {
        ...prev,
        [id]: {
          ...prevState,
          isOpen: !prevState?.isOpen
        }
      };
    });
  };

  const closeWindow = (id: DockItem['id']) => {
    setWindowsLayout((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false
      }
    }));
  };

  const updateWindowPositionSize = (id: DockItem['id'], x: number, y: number, width: number, height: number) => {
    setWindowsLayout(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        x,
        y,
        width,
        height
      }
    }));
  };

  return (
    <div
      className={`${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-300 text-gray-900"} min-h-screen py-10 font-sans select-none relative transition-colors duration-300`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700 hover:text-white focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="flex gap-8 px-10 pb-10 flex-wrap select-none">
        {dockItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => toggleWindow(id)}
            className={`${darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-400/40"} flex flex-col items-center w-20 p-2 rounded-lg transition cursor-pointer focus:outline-none`}
            aria-pressed={windowsLayout[id]?.isOpen ? "true" : "false"}
            aria-label={`${label} window icon`}
          >
            <span className="text-5xl select-none">
              {id === "about" ? "👤" : id === "projects" ? "📁" : "📬"}
            </span>
            <span className="mt-2 text-center font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {Object.entries(windowsLayout).map(([id, layout]) =>
        layout?.isOpen ? (
          <MacWindow
            key={id}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            darkMode={darkMode}
            onClose={() => closeWindow(id as DockItem["id"])}
            x={layout.x}
            y={layout.y}
            width={layout.width}
            height={layout.height}
            onDragStop={(_e, d) => updateWindowPositionSize(id as DockItem["id"], d.x, d.y, layout.width, layout.height)}
            onResizeStop={(_e, _direction, ref, _delta, position) => {updateWindowPositionSize(id as DockItem["id"], position.x, position.y, ref.offsetWidth, ref.offsetHeight);}}
          >
            {id === "about" && (
              <section className="leading-relaxed">
                <h2 className="font-bold mb-2 text-xl">
                  About Me
                </h2>
                <p>
                  // TODO: Write This...
                </p>
              </section>
            )}

            {id === "projects" && (
              <section>
                <h2 className="font-bold mb-3 text-xl">
                  Projects
                </h2>
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 list-none p-0">
                  {projects.map(({ title, description, links }) => (
                    <li
                      key={title}
                      role="link"
                      tabIndex={0}
                      className={`${darkMode ? "bg-gray-800 text-gray-200 hover:shadow-lg" : "bg-white text-gray-900 hover:shadow-lg"} p-4 rounded-xl shadow hover:scale-105 transition-all cursor-pointer focus:outline-none`}
                    >
                      <h3 className="m-0 font-semibold text-lg text-blue-500">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm">
                        {description}
                      </p>
                      <div className="flex gap-3 mt-2">
                        {Object.entries(links).map(([iconName, url]) => {
                          const Icon = getIconComponent(iconName as keyof typeof FaIcons);
                          if (!Icon) return null;
                          return (
                            <a key={iconName} href={url} target="_blank" rel="noopener noreferrer" aria-label={iconName} className="inline-block mr-2">
                              <Icon size={20} />
                            </a>
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {id === "contact" && (
              <section>
                <h2 className="font-bold mb-3 text-xl">
                  Contact
                </h2>
                // TODO: Add a Contact Form
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/LordKyubae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    github.com/LordKyubae
                  </a>
                </p>
                <p>
                  X (Twitter):{" "}
                  <a
                    href="https://x.com/LordKyubae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    x.com/LordKyubae
                  </a>
                </p>
              </section>
            )}
          </MacWindow>
        ) : null
      )}
    </div>
  );
}