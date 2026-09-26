import SectionWrapper from "./SectionWrapper.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/portfolioData.js";
import "./Projects.css";

function Projects() {
  return (
    <SectionWrapper id="projects" className="section projects">
      <div className="container">
        <div className="section-heading">
          <span className="prompt">~/</span>
          <h2>Featured Projects</h2>
        </div>
        <p className="section-sub">A few full-stack builds that put the MERN stack to work end-to-end.</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.name} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Projects;
