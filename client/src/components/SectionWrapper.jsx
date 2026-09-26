import { motion, useReducedMotion } from "framer-motion";

// Shared scroll-reveal wrapper: fades and rises a section into place once
// when it first enters the viewport. Respects prefers-reduced-motion.
function SectionWrapper({ children, className = "", delay = 0, id }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export default SectionWrapper;
