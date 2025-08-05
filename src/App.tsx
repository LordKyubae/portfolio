"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import MacWindow from "@/components/MacWindow.tsx";

interface Project {
  title: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    title: 'React Portfolio',
    description: 'A portfolio built with React and Vite, styled like macOS.',
    link: 'https://github.com/yourusername/react-macos-portfolio'
  },
  {
    title: 'Todo App',
    description: 'A sleek todo app with local storage and React hooks.',
    link: 'https://github.com/yourusername/react-todo-app'
  }
];

interface DockItem {
  id: 'about' | 'projects' | 'contact';
  label: string;
}

const dockItems: DockItem[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export default function App() {
  const [openWindows, setOpenWindows] = useState<{ [key in DockItem['id']]?: boolean }>({
    about: true,
  });

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleWindow = (id: DockItem['id']) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const closeWindow = (id: DockItem['id']) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleProjectClick = (link: string) => {
    window.open(link, '_blank', 'noopener');
  };

  const handleProjectKeyDown = (e: KeyboardEvent, link: string) => {
    if (e.key === 'Enter') handleProjectClick(link);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-300 text-gray-900'} min-h-screen py-10 font-sans select-none relative transition-colors duration-300`}>

      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700 hover:text-white focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="flex gap-8 px-10 pb-10 flex-wrap select-none">
        {dockItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => toggleWindow(id)}
            className={`${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-400/40'} flex flex-col items-center w-20 p-2 rounded-lg transition cursor-pointer focus:outline-none`}
            aria-pressed={openWindows[id] ? 'true' : 'false'}
            aria-label={`${label} window icon`}
          >
            <span className="text-5xl select-none">{id === 'about' ? '👤' : id === 'projects' ? '📁' : '📬'}</span>
            <span className="mt-2 text-center font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {openWindows.about && (
        <MacWindow title="About Me" onClose={() => closeWindow('about')} darkMode={darkMode}>
          <section className="leading-relaxed">
            <h2 className="font-bold mb-2 text-xl">About Me</h2>
            <p>// TODO: Write This...</p>
          </section>
        </MacWindow>
      )}

      {openWindows.projects && (
        <MacWindow title="Projects" onClose={() => closeWindow('projects')} darkMode={darkMode}>
          <section>
            <h2 className="font-bold mb-3 text-xl">Projects</h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 list-none p-0">
              {projects.map(({ title, description, link }) => (
                <li
                  key={title}
                  role="link"
                  tabIndex={0}
                  onClick={() => handleProjectClick(link)}
                  onKeyDown={(e) => handleProjectKeyDown(e, link)}
                  className={`${darkMode ? 'bg-gray-800 text-gray-200 hover:shadow-lg' : 'bg-white text-gray-900 hover:shadow-lg'} p-4 rounded-xl shadow hover:scale-105 transition-all cursor-pointer focus:outline-none`}
                >
                  <h3 className="m-0 font-semibold text-lg text-blue-500">{title}</h3>
                  <p className="mt-1 text-sm">{description}</p>
                </li>
              ))}
            </ul>
          </section>
        </MacWindow>
      )}

      {openWindows.contact && (
        <MacWindow title="Contact" onClose={() => closeWindow('contact')} darkMode={darkMode}>
          <section>
            <h2 className="font-bold mb-3 text-xl">Contact</h2>
            <p>
              Email:{' '}
              <a href="mailto:contact@kyubae.com" className="text-blue-400 hover:underline">
                contact@kyubae.com
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a href="https://github.com/LordKyubae" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                github.com/LordKyubae
              </a>
            </p>
            <p>
              X (Twitter):{' '}
              <a href="https://x.com/LordKyubae" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                x.com/LordKyubae
              </a>
            </p>
          </section>
        </MacWindow>
      )}
    </div>
  );
}