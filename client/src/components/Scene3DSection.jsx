import { lazy, Suspense, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import SectionWrapper from "./SectionWrapper.jsx";
import { personalInfo } from "../data/portfolioData.js";
import personalDetailsImage from "../assets/personal detail.png";
import projectShowcaseImage from "../assets/project cover.png";
import "./Scene3DSection.css";

const DevScene = lazy(() => import("./DevScene.jsx"));

function Scene3DSection() {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (currentScroll) => {
    const section = sectionRef.current;
    if (!section) return 0;

    const sectionTop = section.getBoundingClientRect().top + currentScroll;
    const viewportHeight = window.innerHeight;
    const progress = (currentScroll + viewportHeight - sectionTop) / (section.offsetHeight + viewportHeight);
    return Math.min(1, Math.max(0, progress));
  });

  return (
    <SectionWrapper className="section scene3d" id="building">
      <div className="scene3d-inner" ref={sectionRef}>
        <div className="container scene3d-text">
          <p className="scene3d-eyebrow">SELECTED WORK · FULL-STACK DEVELOPMENT</p>
          <div className="section-heading">
            <span className="prompt">~/</span>
            <h2>Building Ideas Into Reality</h2>
          </div>
          <p className="section-sub">
            I'm {personalInfo.name}, a {personalInfo.altTitle} focused on thoughtful, full-stack
            products. My work spans social media, HR systems, ride booking and commerce, built
            with React, Node.js, Express and MongoDB.
          </p>
        </div>

        <div className="scene3d-stage">
          <div className="scene3d-stage-header">
            <div className="scene3d-stage-heading">
              <span className="scene3d-stage-index">PORTFOLIO / 01</span>
              <span className="scene3d-stage-title">Projects & profile</span>
            </div>
            <span className="scene3d-stage-status"><span /> 5 PROJECTS</span>
          </div>

          <div className="scene3d-canvas-wrap">
            <div className="scene3d-desktop-visual">
              <Suspense fallback={<div className="scene3d-fallback" />}>
                <DevScene scrollRef={scrollYProgress} />
              </Suspense>
              <aside className="scene3d-desktop-rail" aria-label="Portfolio project overview">
                <p className="scene3d-rail-eyebrow">PROJECT INDEX / 2026</p>
                <h3>Built for real workflows.</h3>
                <div className="scene3d-rail-list">
                  <div><span>01</span><p>Social platforms</p></div>
                  <div><span>02</span><p>People systems</p></div>
                  <div><span>03</span><p>Ride booking</p></div>
                  <div><span>04</span><p>Multi-vendor commerce</p></div>
                </div>
                <div className="scene3d-rail-stack">
                  <span>CORE STACK</span>
                  <strong>React · Node.js</strong>
                  <strong>Express · MongoDB</strong>
                </div>
              </aside>
            </div>
            <div className="scene3d-mobile-visual" aria-label="Project showcase and personal profile">
              <div className="scene3d-mobile-monitor">
                <div className="scene3d-mobile-monitor-bar"><span /><span /><span /></div>
                <img src={projectShowcaseImage} alt="Giridharan's projects showcase" />
                <div className="scene3d-mobile-monitor-base" />
              </div>
              <div className="scene3d-mobile-phone">
                <span className="scene3d-mobile-phone-speaker" />
                <img src={personalDetailsImage} alt="Giridharan's skills and personal details" />
              </div>
            </div>
          </div>

          <div className="scene3d-stage-footer">
            <div className="scene3d-domains">
              <span>Social</span>
              <span>People</span>
              <span>Mobility</span>
              <span>Commerce</span>
            </div>
            <span className="scene3d-stage-stack">REACT · NODE.JS · MONGODB</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Scene3DSection;
