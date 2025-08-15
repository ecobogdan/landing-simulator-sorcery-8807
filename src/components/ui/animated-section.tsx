import { motion } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  distance?: number;
  once?: boolean;
}

const directionVariants = {
  up: (distance: number) => ({ y: distance, opacity: 0 }),
  down: (distance: number) => ({ y: -distance, opacity: 0 }),
  left: (distance: number) => ({ x: distance, opacity: 0 }),
  right: (distance: number) => ({ x: -distance, opacity: 0 }),
  fade: () => ({ opacity: 0 }),
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 16,
  once = true,
}: AnimatedSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction](distance)}
      whileInView={{ 
        x: 0, 
        y: 0, 
        opacity: 1,
        transition: {
          duration: 0.4,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}