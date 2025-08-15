import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ElevatedCardProps {
  children: ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2;
  hoverElevation?: 0 | 1 | 2;
  onClick?: () => void;
  disabled?: boolean;
}

export function ElevatedCard({
  children,
  className = "",
  elevation = 1,
  hoverElevation = 2,
  onClick,
  disabled = false,
}: ElevatedCardProps) {
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

  const elevationClasses = {
    0: "elevation-0",
    1: "elevation-1",
    2: "elevation-2",
  };

  const Component = prefersReducedMotion ? "div" : motion.div;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: disabled ? {} : {
          y: -2,
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" as const }
        },
        whileTap: disabled ? {} : {
          scale: 0.98,
          transition: { duration: 0.1 }
        },
      };

  return (
    <Component
      className={cn(
        "premium-card",
        elevationClasses[elevation],
        onClick && !disabled && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...motionProps}
    >
      {children}
    </Component>
  );
}