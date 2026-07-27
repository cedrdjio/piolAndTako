import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        navy: "bg-secondary text-secondary-foreground",
        subtle: "bg-brand-50 text-brand-700",
        neutral: "bg-surface-2 text-foreground",
        outline: "border border-border-strong text-foreground",
        glass: "glass-dark text-white",
        success: "bg-success/12 text-success",
        warning: "bg-warning/15 text-[#8a5a00]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
