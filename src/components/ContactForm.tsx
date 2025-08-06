import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const addContactMessage = useMutation(api.myFunctions.addContactMessage);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await addContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4 max-w-md mb-6">
      <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="p-2 border rounded" />
      <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="p-2 border rounded" />
      <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={5} className="p-2 border rounded resize-none" />
      <button type="submit" disabled={status === "sending"} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "success" && <p className="text-green-600 mt-2">Message sent successfully!</p>}
      {status === "error" && <p className="text-red-600 mt-2">Failed to send message. Try again.</p>}
    </form>
  );
}

export default ContactForm;