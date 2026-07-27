import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  hint?: string;
}

export function StatCard({ label, value, delta, icon: Icon, hint }: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-background p-5 shadow-[var(--shadow-xs)]">
      <div className="flex items-center justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
          <Icon className="size-5" />
        </span>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              positive ? "bg-success/12 text-success" : "bg-danger/10 text-danger",
            )}
          >
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}
