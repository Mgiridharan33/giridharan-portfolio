import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionWrapper from "./SectionWrapper.jsx";
import { experience } from "../data/portfolioData.js";
import "./Experience.css";

function Experience() {
  return (
    <SectionWrapper id="experience" className="section experience">
      <div className="container">
        <div className="section-heading">
          <span className="prompt">~/</span>
          <h2>Experience</h2>
        </div>

        <div className="timeline">
          {experience.map((entry, index) => (
            <motion.div
              className="timeline-item"
              key={entry.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline-marker">
                <Briefcase size={16} />
              </div>
              <div className="timeline-content">
                <div className="timeline-top">
                  <h3>{entry.role}</h3>
                  <span className="timeline-period">{entry.period}</span>
                </div>
                <p className="timeline-company">{entry.company}</p>
                <p className="timeline-description">{entry.description}</p>
                <p className="timeline-note">{entry.completed}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Experience;
