import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-card hover:shadow-card-hover hover:-translate-y-0.5",
        gold:
          "bg-gold text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5",
        shimmer:
          "bg-gold text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:rounded-xl",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-muted hover:-translate-y-0.5",
        ghost:
          "text-foreground hover:bg-secondary hover:-translate-y-0.5",
        link:
          "text-gold underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "md",
  href,
  external,
  children,
  type,
  onClick,
  ...props
}: ButtonProps) {
  const isGoldOrDefault = variant === "gold" || variant === "default";
  const classes = cn(
    buttonVariants({ variant, size }),
    isGoldOrDefault && "after:absolute after:inset-0 after:rounded-xl after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 after:bg-gradient-to-b after:from-white/10 after:to-transparent",
    className,
  );

  if (href) {
    const anchorOnClick = onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={anchorOnClick}
        >
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={anchorOnClick}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} type={type ?? "button"} onClick={onClick} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
