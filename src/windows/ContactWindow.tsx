"use client";

import ContactForm from "@/components/ContactForm.tsx";
import * as FaIcons from "react-icons/fa";

export default function ContactWindow() {
  return (
    <section>
      <h2 className="font-bold mb-3 text-xl">Contact</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-[3] min-w-[300px]">
          <ContactForm />
        </div>
        <div className="flex-[1] min-w-[200px] flex flex-col justify-start gap-4">
          <p className="flex items-center space-x-2">
            <a
              href="https://github.com/LordKyubae"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:underline gap-2"
            >
              <FaIcons.FaGithub />
              LordKyubae
            </a>
          </p>
          <p className="flex items-center space-x-2">
            <a
              href="https://x.com/LordKyubae"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:underline gap-2"
            >
              <FaIcons.FaTwitter />
              LordKyubae
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}