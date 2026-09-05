"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ElementType, ReactNode } from "react";

/** Shared, low-cost motion defaults for marketing surfaces. */
export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const FADE: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Prefer short tweens over springs on long pages (better INP). */
export const tweenSoft: Transition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
};

/** once + modest margin — avoid re-running observers while scrolling. */
export const viewportOnce = {
  once: true as const,
  amount: 0.2 as const,
  margin: "0px 0px -40px 0px" as const,
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** opacity-only is cheapest; use "up" sparingly for hero/headers */
  variant?: "fade" | "up";
  as?: "div" | "section" | "article" | "figure" | "li" | "header";
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport" | "transition" | "variants">;

/**
 * Lightweight scroll reveal. Respects prefers-reduced-motion.
 * Prefer this over ad-hoc whileInView + spring configs on home sections.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  variant = "up",
  as = "div",
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as ElementType;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...(rest as object)}>
        {children}
      </Tag>
    );
  }

  return (
    <Comp
      className={className}
      variants={variant === "fade" ? FADE : FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...tweenSoft, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
