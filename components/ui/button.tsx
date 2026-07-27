import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold cursor-pointer select-none transition-[transform,background-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:bg-brand-600 hover:shadow-[var(--shadow-glow)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[var(--shadow-sm)] hover:bg-navy-700",
        outline:
          "border border-border-strong bg-background text-foreground hover:bg-surface hover:border-brand/40",
        ghost: "text-foreground hover:bg-surface-2",
        subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100",
        link: "text-brand underline-offset-4 hover:underline px-0",
        destructive: "bg-danger text-white hover:brightness-95 shadow-[var(--shadow-sm)]",
      },
      size: {
        sm: "h-9 rounded-[var(--radius-sm)] px-4 text-[0.8125rem]",
        default: "h-11 rounded-[var(--radius-md)] px-5 text-sm",
        lg: "h-12 rounded-[var(--radius-md)] px-7 text-[0.95rem]",
        xl: "h-14 rounded-[var(--radius-lg)] px-8 text-base",
        icon: "size-11 rounded-[var(--radius-md)]",
        "icon-sm": "size-9 rounded-[var(--radius-sm)]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
