import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../data/portfolioData.js";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">&copy; 2026 {personalInfo.name}. All rights reserved.</p>

        <div className="footer-socials">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer noopener"
            className="icon-btn"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="icon-btn"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="icon-btn" aria-label="Email">
            <Mail size={16} />
          </a>
        </div>

        <p className="footer-built">Built with React.js &amp; Node.js</p>
      </div>
    </footer>
  );
}

export default Footer;
