import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Braces,
  Cable,
  Code2,
  Database,
  GitBranch,
  LayoutDashboard,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper.jsx";
import { skillGroups } from "../data/portfolioData.js";
import dockerIcon from "../assets/icon/docker.png";
import expressIcon from "../assets/icon/express.png";
import gitIcon from "../assets/icon/git.png";
import githubIcon from "../assets/icon/github.png";
import htmlIcon from "../assets/icon/html.png";
import javascriptIcon from "../assets/icon/js.png";
import mongoIcon from "../assets/icon/Mongo.png";
import nodeIcon from "../assets/icon/node.png";
import reactIcon from "../assets/icon/react.png";
import redisIcon from "../assets/icon/redis.png";
import socketIcon from "../assets/icon/socket.png";
import cssIcon from "../assets/icon/css.png";
import "./Skills.css";

const skillVisuals = {
  "React.js": { image: reactIcon, color: "#38bdf8" },
  JavaScript: { image: javascriptIcon, color: "#fbbf24" },
  HTML5: { image: htmlIcon, color: "#f97316" },
  "CSS3": { image: cssIcon, color: "#38bdf8" },
  "Tailwind CSS": { Icon: Code2, color: "#22d3ee" },
  "React Router": { Icon: Workflow, color: "#f87171" },
  Axios: { Icon: Cable, color: "#a78bfa" },
  "Node.js": { image: nodeIcon, color: "#4ade80" },
  "Express.js": { image: expressIcon, color: "#e2e8f0" },
  "REST APIs": { Icon: Server, color: "#38bdf8" },
  "JWT Authentication": { Icon: ShieldCheck, color: "#fbbf24" },
  "Role-Based Access Control": { Icon: ShieldCheck, color: "#a78bfa" },
  MongoDB: { image: mongoIcon, color: "#4ade80" },
  MySQL: { Icon: Database, color: "#38bdf8" },
  Redis: { image: redisIcon, color: "#f87171" },
  "Socket.IO": { image: socketIcon, color: "#e2e8f0" },
  WebSockets: { Icon: Radio, color: "#34d399" },
  Microservices: { Icon: Network, color: "#a78bfa" },
  "API Gateway": { Icon: Workflow, color: "#38bdf8" },
  RabbitMQ: { Icon: Cable, color: "#fb923c" },
  Git: { image: gitIcon, color: "#f97316" },
  GitHub: { image: githubIcon, color: "#e2e8f0" },
  Docker: { image: dockerIcon, color: "#38bdf8" },
  Postman: { Icon: Braces, color: "#fb923c" },
  "VS Code": { Icon: LayoutDashboard, color: "#38bdf8" },
};

function SkillCard({ skill }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 220, damping: 18 });

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    x.set(0.5);
    y.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="skill-card"
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={resetTilt}
    >
      <div className={`skill-card-glow ${hovered ? "is-active" : ""}`} />
      <div className="skill-card-topline">
        <span className="skill-icon-wrap" style={{ "--skill-color": skillVisuals[skill.name]?.color ?? "#5eead4" }}>
          {skillVisuals[skill.name]?.image ? (
            <img src={skillVisuals[skill.name].image} alt="" className="skill-icon-image" />
          ) : (
            (() => {
              const Icon = skillVisuals[skill.name]?.Icon ?? Code2;
              return <Icon size={24} strokeWidth={1.8} aria-hidden="true" />;
            })()
          )}
        </span>
        <span className="skill-card-name">{skill.name}</span>
      </div>
      <span className="skill-card-desc">{skill.description}</span>
    </motion.div>
  );
}

function Skills() {
  return (
    <SectionWrapper id="skills" className="section skills">
      <div className="container">
        <div className="section-heading">
          <span className="prompt">~/</span>
          <h2>Skills</h2>
        </div>
        <p className="section-sub">Technologies I use to design, build and ship full-stack applications.</p>

        <div className="skills-groups">
          {skillGroups.map((group) => (
            <div className="skills-group" key={group.category}>
              <h3 className="skills-group-title">{group.category}</h3>
              <div className="skills-grid">
                {group.skills.map((skill) => (
                  <SkillCard skill={skill} key={skill.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Skills;
