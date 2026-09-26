import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import SectionWrapper from "./SectionWrapper.jsx";
import { personalInfo } from "../data/portfolioData.js";
import "./Contact.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your message. Please try again.");
      }

      setStatus("success");
      setFeedback(data.message || "Message sent successfully!");
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Unable to send your message. Please try again.");
    }
  };

  return (
    <SectionWrapper id="contact" className="section contact">
      <div className="container">
        <div className="section-heading">
          <span className="prompt">~/</span>
          <h2>Let&apos;s Work Together</h2>
        </div>
        <p className="section-sub">
          Have a project idea, job opportunity or just want to connect? Feel free to send me a
          message.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <a className="contact-info-row" href={`mailto:${personalInfo.email}`}>
              <Mail size={18} />
              <span>{personalInfo.email}</span>
            </a>
            <div className="contact-info-row">
              <MapPin size={18} />
              <span>{personalInfo.location}</span>
            </div>
            <a
              className="contact-info-row"
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              className="contact-info-row"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary contact-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>

            {feedback && (
              <motion.div
                className={`contact-feedback ${status === "error" ? "is-error" : "is-success"}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
              >
                {status === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                <span>{feedback}</span>
                {status === "error" && (
                  <a href={`mailto:${personalInfo.email}?subject=${encodeURIComponent("Portfolio contact")}`}>
                    Email me directly
                  </a>
                )}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Contact;
