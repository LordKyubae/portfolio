"use client";

import { ReactNode, useEffect, useState } from "react";
import { FaEnvelope, FaFolder, FaUser } from "react-icons/fa6";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Doc } from "../convex/_generated/dataModel";
import MenuBar from "@/components/MenuBar.tsx";
import MacWindow from "@/components/MacWindow.tsx";
import AboutWindow from "@/windows/AboutWindow.tsx";
import ProjectsWindow from "@/windows/ProjectsWindow.tsx";
import ContactWindow from "@/windows/ContactWindow.tsx";
import Dock from "@/components/Dock.tsx";

export interface DockItem {
  id: "about" | "projects" | "contact";
  label: string;
  icon: ReactNode;
}

const dockItems: DockItem[] = [
  { id: "about", label: "About", icon: <FaUser /> },
  { id: "projects", label: "Projects", icon: <FaFolder /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope /> }
];

interface WindowState {
  isOpen: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

type WindowsLayout = Record<DockItem["id"], WindowState>;

const defaultLayout: WindowsLayout = {
  about: { isOpen: true, x: 100, y: 80, width: 800, height: 600, zIndex: 1 },
  projects: { isOpen: false, x: 150, y: 100, width: 800, height: 600, zIndex: 1 },
  contact: { isOpen: false, x: 200, y: 120, width: 800, height: 600, zIndex: 1 }
};

export default function App() {
  const projects = useQuery(api.myFunctions.listProjects) ?? [];
  const projectsByClient = projects.reduce<Record<string, Doc<"projects">[]>>((acc, project) => {
    const clientKey = project.client ?? "Personal";
    (acc[clientKey] ??= []).push(project);
    return acc;
  }, {});

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  const [windowsLayout, setWindowsLayout] = useState<WindowsLayout>(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("windowsLayout") ?? "") || defaultLayout;
      } catch {
        return defaultLayout;
      }
    }
    return defaultLayout;
  });

  const [highestZIndex, setHighestZIndex] = useState(() =>
    Math.max(...Object.values(windowsLayout).map((w) => w?.zIndex ?? 1))
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("windowsLayout", JSON.stringify(windowsLayout));
  }, [windowsLayout]);

  const bringToFront = (id: DockItem["id"]) => {
    setWindowsLayout((prev) => {
      const newZ = highestZIndex + 1;
      setHighestZIndex(newZ);
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: newZ }
      };
    });
  };

  const toggleWindow = (id: DockItem["id"]) => {
    setWindowsLayout((prev) => {
      const prevState = prev[id] ?? defaultLayout[id];
      const newZ = highestZIndex + 1;
      setHighestZIndex(newZ);
      return {
        ...prev,
        [id]: {
          ...prevState,
          isOpen: !prevState.isOpen,
          zIndex: newZ
        }
      };
    });
  };

  const closeWindow = (id: DockItem["id"]) => {
    setWindowsLayout((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  };

  const updateWindowPositionSize = (id: DockItem["id"], x: number, y: number, width: number, height: number) => {
    setWindowsLayout((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y, width, height }
    }));
  };

  const activeWindowTitle =
    Object.entries(windowsLayout)
      .filter(([, w]) => w?.isOpen)
      .sort((a, b) => (b[1]?.zIndex ?? 0) - (a[1]?.zIndex ?? 0))[0]?.[0] ?? "Portfolio";

  return (
    <div
      className={`min-h-screen py-10 font-sans select-none relative transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-300 text-gray-900"
      }`}
    >
      <MenuBar activeWindowTitle={activeWindowTitle} darkMode={darkMode} toggleDarkMode={() => setDarkMode((d) => !d)} />

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
            zIndex={layout.zIndex}
            onClick={() => bringToFront(id as DockItem["id"])}
            onDragStop={(_, data) => updateWindowPositionSize(id as DockItem["id"], data.x, data.y, layout.width, layout.height)}
            onResizeStop={(_, __, ref, ___, position) => updateWindowPositionSize(id as DockItem["id"], position.x, position.y, ref.offsetWidth, ref.offsetHeight)
            }
          >
            {id === "about" && <AboutWindow />}
            {id === "projects" && <ProjectsWindow projectsByClient={projectsByClient} darkMode={darkMode} />}
            {id === "contact" && <ContactWindow />}
          </MacWindow>
        ) : null
      )}

      <Dock
        items={dockItems}
        openWindows={Object.fromEntries(
          Object.entries(windowsLayout).map(([id, w]) => [id, w.isOpen])
        )}
        darkMode={darkMode}
        onClick={toggleWindow}
      />
    </div>
  );
}