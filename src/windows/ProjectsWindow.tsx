"use client";

import { getIconComponent } from "@/lib/utils.ts";
import * as FaIcons from "react-icons/fa";
import { Doc } from "../../convex/_generated/dataModel";

interface ProjectsWindowProps {
  projectsByClient: Record<string, Doc<"projects">[]>;
  darkMode: boolean;
}

export default function ProjectsWindow({ projectsByClient, darkMode }: ProjectsWindowProps) {
  return (
    <section>
      <h2 className="font-bold mb-3 text-xl">Projects</h2>
      {Object.entries(projectsByClient).map(([client, clientProjects]) => (
        <div key={client} className="mb-8">
          <h3 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-300">{client}</h3>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 list-none p-0">
            {clientProjects.map(({ title, description, links }) => (
              <li
                key={title}
                role="link"
                tabIndex={0}
                className={`p-4 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer focus:outline-none ${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
                }`}
              >
                <h4 className="m-0 font-semibold text-lg text-blue-500">{title}</h4>
                <p className="mt-1 text-sm">{description}</p>
                <div className="flex gap-3 mt-2">
                  {Object.entries(links).map(([iconName, url]) => {
                    const Icon = getIconComponent(iconName as keyof typeof FaIcons);
                    if (!Icon) return null;
                    return (
                      <a
                        key={iconName}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={iconName}
                        className="inline-block"
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}