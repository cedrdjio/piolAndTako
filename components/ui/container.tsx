import * as React from "react";
import { cn } from "@/lib/utils";

/** Consistent horizontal gutters + max width across the whole site. */
function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8", className)} {...props} />
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical rhythm. Sections breathe — lots of whitespace by default. */
  spacing?: "sm" | "md" | "lg";
}

function Section({ className, spacing = "lg", ...props }: SectionProps) {
  const pad = {
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-24",
    lg: "py-20 sm:py-28 lg:py-32",
  }[spacing];
  return <section className={cn(pad, className)} {...props} />;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "center" ? "mx-auto max-w-2xl" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}

export { Container, Section, SectionHeading };
