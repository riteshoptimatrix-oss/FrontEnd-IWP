import type { Variants, Transition } from "framer-motion";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];
export const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.42, 0, 0.2, 1];
export const EASE_SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
export const EASE_SPRING_BOUNCY = { type: "spring" as const, stiffness: 400, damping: 20 };

const baseTransition: Transition = { duration: 0.6, ease: EASE };
const fastTransition: Transition = { duration: 0.35, ease: EASE_OUT };
const slowTransition: Transition = { duration: 0.8, ease: EASE };

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: slowTransition },
};

export const blurInVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { ...slowTransition, duration: 1 } },
};

export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotateX: -15, y: 30 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: baseTransition },
};

export const zoomInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export const clipPathVariants: Variants = {
  hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
  visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", transition: { duration: 0.8, ease: EASE } },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, boxShadow: "var(--shadow-card)" },
  hover: {
    y: -4,
    boxShadow: "var(--shadow-card-hover)",
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2, ease: EASE_OUT } },
  tap: { scale: 0.98 },
};

export const magneticHover = {
  rest: { scale: 1, x: 0, y: 0 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: EASE_OUT } },
  tap: { scale: 0.97 },
};

export const cardLift = {
  rest: { y: 0, boxShadow: "0 1px 3px oklch(0 0 0 / 0.04), 0 4px 16px oklch(0 0 0 / 0.05)" },
  hover: {
    y: -8,
    boxShadow: "0 8px 32px oklch(0 0 0 / 0.08), 0 24px 60px oklch(0 0 0 / 0.06)",
    transition: { duration: 0.4, ease: EASE },
  },
};

export const viewportOnce = { once: true, amount: 0.15 } as const;
export const viewportOnceFull = { once: true, amount: 0.3 } as const;
export const viewportAlways = { once: false, amount: 0.1 } as const;

export type RevealType =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "scale-in"
  | "blur-in"
  | "rotate-in"
  | "zoom-in"
  | "clip-path";

export const revealVariants: Record<RevealType, Variants> = {
  fade: fadeVariants,
  "fade-up": fadeUpVariants,
  "fade-down": fadeDownVariants,
  "fade-left": fadeLeftVariants,
  "fade-right": fadeRightVariants,
  "slide-left": slideLeftVariants,
  "slide-right": slideRightVariants,
  scale: scaleVariants,
  "scale-in": scaleInVariants,
  "blur-in": blurInVariants,
  "rotate-in": rotateInVariants,
  "zoom-in": zoomInVariants,
  "clip-path": clipPathVariants,
};

export const sectionVariants: Variants[] = [
  fadeUpVariants,
  scaleInVariants,
  blurInVariants,
  rotateInVariants,
  zoomInVariants,
  fadeLeftVariants,
  fadeRightVariants,
  clipPathVariants,
];
