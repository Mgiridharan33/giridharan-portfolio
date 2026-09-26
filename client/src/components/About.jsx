import { motion } from "framer-motion";
import { Code2, Server, Sparkles as SparklesIcon } from "lucide-react";
import SectionWrapper from "./SectionWrapper.jsx";
import { aboutContent } from "../data/portfolioData.js";
import "./About.css";

function About() {
  return (
    <SectionWrapper id="about" className="section about">
      <div className="container">
        <div className="section-heading">
          <span className="prompt">~/</span>
          <h2>About Me</h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}

            <div className="about-stats">
              {aboutContent.stats.map((stat) => (
                <div className="about-stat" key={stat.label}>
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, rotateY: -8, y: 16 }}
            whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-card-glow" />
            <div className="about-card-row">
              <Code2 size={20} />
              <span>Builds interfaces with React</span>
            </div>
            <div className="about-card-row">
              <Server size={20} />
              <span>Ships APIs with Node &amp; Express</span>
            </div>
            <div className="about-card-row">
              <SparklesIcon size={20} />
              <span>Connects it all end-to-end</span>
            </div>
            <div className="about-card-footer">
              <span className="about-card-tag">MERN Stack</span>
              <span className="about-card-tag">Fresher</span>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default About;
