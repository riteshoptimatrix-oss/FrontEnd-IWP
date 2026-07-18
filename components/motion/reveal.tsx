"use client";

import * as React from "react";
import { m, useReducedMotion, type Transition } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  revealVariants,
  staggerContainerVariants,
  viewportOnce,
  type RevealType,
} from "@/lib/animations";

type MotionTag = React.ElementType;

export interface RevealProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Animation style. @default "fade-up" */
  type?: RevealType;
  /** Delay (seconds) before the animation starts. */
  delay?: number;
  /** Render element. @default "div" */
  as?: MotionTag;
  /**
   * When true, the element inherits the animation state from a parent
   * <RevealGroup> (used for staggered children) and does not self-trigger.
   */
  inGroup?: boolean;
}

/**
 * Reveal — declarative scroll-into-view animation wrapper.
 * Respects prefers-reduced-motion by rendering a plain element.
 */
export function Reveal({
  type = "fade-up",
  delay = 0,
  as = "div",
  inGroup = false,
  className,
  children,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = (m as unknown as Record<string, React.ElementType>)[
    as as string
  ];
  const variants = revealVariants[type];
  const mergedTransition: Transition = {
    ...(variants.visible as { transition?: Transition }).transition,
    delay,
  };

  if (reduce) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  if (inGroup) {
    return (
      <MotionTag className={cn(className)} variants={variants} transition={mergedTransition} {...props}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={mergedTransition}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export interface RevealGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Render element. @default "div" */
  as?: MotionTag;
  /** Stagger delay between children (seconds). @default 0.12 */
  stagger?: number;
  /** Delay before the group starts. @default 0.05 */
  delayChildren?: number;
}

/**
 * RevealGroup — staggers its <Reveal inGroup> children when scrolled into view.
 */
export function RevealGroup({
  as = "div",
  stagger = 0.12,
  delayChildren = 0.05,
  className,
  children,
  ...props
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const MotionTag = (m as unknown as Record<string, React.ElementType>)[
    as as string
  ];

  if (reduce) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        ...staggerContainerVariants,
        visible: {
          ...staggerContainerVariants.visible,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
