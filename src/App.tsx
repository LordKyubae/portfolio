"use client";

import { KeyboardEvent, useState } from "react";
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
    link: 'https://github.com/yourusername/react-macos-portfolio',
  },
  {
    title: 'Todo App',
    description: 'A sleek todo app with local storage and React hooks.',
    link: 'https://github.com/yourusername/react-todo-app',
  },
];

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

export default function App() {
  const [activeSection, setActiveSection] = useState<DockItem['id']>('about');

  const handleNavClick = (id: DockItem['id']) => setActiveSection(id);

  const handleProjectClick = (link: string) => {
    window.open(link, '_blank', 'noopener');
  };

  const handleProjectKeyDown = (e: KeyboardEvent, link: string) => {
    if (e.key === 'Enter') handleProjectClick(link);
  };

  return (
    <div className="bg-gray-300 min-h-screen py-10 font-sans select-none relative">
      <MacWindow title="Samuel Taylor - Software Developer">
        <nav className="flex gap-4 mb-6 justify-center select-none" aria-label="Section navigation">
          {dockItems.map(({ id, label }) => (
            <button key={id} onClick={() => handleNavClick(id)} className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${activeSection === id ? 'bg-blue-500 text-white shadow-lg shadow-blue-400/50' : 'bg-gray-100 text-gray-800'}`} aria-current={activeSection === id ? 'true' : 'false'}>
              {label}
            </button>
          ))}
        </nav>

        {activeSection === 'about' && (
          <section className="leading-relaxed">
            <h2 className="font-bold mb-2 text-xl">
              About Me
            </h2>
            <p>
              // TODO: Write This...
            </p>
          </section>
        )}

        {activeSection === 'projects' && (
          <section>
            <h2 className="font-bold mb-3 text-xl">
              Projects
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 list-none p-0">
              {projects.map(({ title, description, link }) => (
                <li key={title} role="link" tabIndex={0} onClick={() => handleProjectClick(link)} onKeyDown={(e) => handleProjectKeyDown(e, link)} className="p-4 bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer focus:outline-none">
                  <h3 className="m-0 font-semibold text-lg text-blue-500">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === 'contact' && (
          <section>
            <h2 className="font-bold mb-3 text-xl">
              Contact
            </h2>
            <p>
              Email:{' '}
              <a href="mailto:contact@kyubae.com" className="text-blue-500 hover:underline">
                contact@kyubae.com
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a href="https://github.com/LordKyubae" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                github.com/LordKyubae
              </a>
            </p>
            <p>
              X (Twitter):{' '}
              <a href="https://x.com//LordKyubae" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                x.com/LordKyubae
              </a>
            </p>
          </section>
        )}
      </MacWindow>

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-lg rounded-full px-6 py-2 flex gap-6 shadow-xl z-50">
        {dockItems.map(({ id, label }) => (
          <button key={id} onClick={() => handleNavClick(id)} className={`text-base transition-all font-medium px-3 py-1 rounded-md ${activeSection === id ? 'text-blue-500 font-bold shadow-md shadow-blue-400/50' : 'text-gray-700'}`} aria-current={activeSection === id ? 'true' : 'false'}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}