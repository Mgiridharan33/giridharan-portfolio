import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import "./ProjectCard.css";

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
    >
      <div className="project-visual">
        <img className="project-cover" src={project.cover} alt={`${project.name} project cover`} />
      </div>

      <div className="project-body">
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((tech) => (
            <span className="project-tech-badge" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="project-links">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-ghost btn-sm"
          >
            <Github size={16} /> Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary btn-sm"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
