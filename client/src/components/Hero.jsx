import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import heroImage from "../assets/hero.png";
import htmlIcon from "../assets/icon/html.png";
import cssIcon from "../assets/icon/css.png";
import expressIcon from "../assets/icon/express.png";
import githubIcon from "../assets/icon/github.png";
import gitIcon from "../assets/icon/git.png";
import dockerIcon from "../assets/icon/docker.png";
import mongoIcon from "../assets/icon/Mongo.png";
import jsIcon from "../assets/icon/js.png";
import nodeIcon from "../assets/icon/node.png";
import reactIcon from "../assets/icon/react.png";
import redisIcon from "../assets/icon/redis.png";
import socketIcon from "../assets/icon/socket.png";
import { personalInfo, heroContent } from "../data/portfolioData.js";
import "./Hero.css";

const techIcons = [
  { name: "HTML", image: htmlIcon },
  { name: "CSS", image: cssIcon },
  { name: "Express", image: expressIcon },
  { name: "GitHub", image: githubIcon },
  { name: "Git", image: gitIcon },
  { name: "Docker", image: dockerIcon },
  { name: "MongoDB", image: mongoIcon },
  { name: "JavaScript", image: jsIcon },
  { name: "Node.js", image: nodeIcon },
  { name: "React", image: reactIcon },
  { name: "Redis", image: redisIcon },
  { name: "Socket.IO", image: socketIcon },
];

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-glow" />
      <div className="container hero-inner">
        <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
          <motion.p className="hero-kicker" variants={item}>
            <span className="hero-dot" /> Available for new opportunities
          </motion.p>

          <motion.h1 className="hero-title" variants={item}>
            {heroContent.greeting.split(personalInfo.name)[0]}
            <span className="hero-name">{personalInfo.name}</span>
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={item}>
            {heroContent.headline}
            <span className="hero-alt-title"> / {personalInfo.altTitle}</span>
          </motion.h2>

          <motion.p className="hero-description" variants={item}>
            {heroContent.description}
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href={personalInfo.resumePath} download className="btn btn-ghost">
              Download Resume
            </a>
          </motion.div>

          <motion.div className="hero-socials" variants={item}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer noopener"
              className="icon-btn"
              aria-label="Giridharan's GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="icon-btn"
              aria-label="Giridharan's LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="icon-btn"
              aria-label="Email Giridharan"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={(event) => {
            if (shouldReduceMotion) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            event.currentTarget.style.setProperty("--pointer-x", `${x * 12}deg`);
            event.currentTarget.style.setProperty("--pointer-y", `${y * -10}deg`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--pointer-x", "0deg");
            event.currentTarget.style.setProperty("--pointer-y", "0deg");
          }}
        >
          <div className="hero-portrait-frame" aria-label="Giridharan portrait">
            <div className="hero-glow-ring hero-glow-ring-one" />
            <div className="hero-glow-ring hero-glow-ring-two" />
            <img src={heroImage} alt="Giridharan M" className="hero-portrait" />
            <div className="hero-mobile-profile">
              <span className="hero-mobile-profile-label">PORTFOLIO</span>
              <strong>{personalInfo.name}</strong>
              <span>{personalInfo.altTitle}</span>
              <span className="hero-mobile-location">{personalInfo.location} · Available</span>
            </div>

            <div className="hero-tech-icons" aria-label="Technologies I work with">
              {techIcons.map((tech, index) => (
                <div
                  className={`tech-chip chip-${index + 1}`}
                  key={tech.name}
                  title={tech.name}
                  style={{ "--delay": `${index * 0.17}s`, "--depth": `${12 + (index % 4) * 5}px` }}
                >
                  <img src={tech.image} alt={tech.name} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="hero-scroll-cue" aria-label="Scroll to About section">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}

export default Hero;
