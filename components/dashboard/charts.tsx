import type { KpiPoint } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

/** CSS bar chart — responsive, no runtime deps. */
export function BarChart({ data, className }: { data: KpiPoint[]; className?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cn("flex h-48 gap-2", className)}>
      {data.map((d) => (
        <div key={d.label} className="group flex flex-1 flex-col items-center">
          <div className="flex w-full flex-1 items-end pb-2">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-navy to-brand transition-opacity group-hover:opacity-80"
              style={{ height: `${Math.max((d.value / max) * 100, 3)}%` }}
              title={String(d.value)}
            />
          </div>
          <span className="text-[0.65rem] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** SVG area line chart. */
export function LineChart({ data, className }: { data: KpiPoint[]; className?: string }) {
  const w = 100;
  const h = 40;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.value - min) / range) * (h - 4) - 2;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("h-40 w-full", className)}
      role="img"
      aria-label="Évolution"
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e5bff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1e5bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="#1e5bff" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** SVG donut for category split. */
export function Donut({ data }: { data: KpiPoint[] }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const colors = ["#1e5bff", "#0a1633", "#8ab0ff"];
  const r = 15.915;
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 36 36" className="size-32 -rotate-90">
        {data.map((d, i) => {
          const pct = (d.value / total) * 100;
          const seg = (
            <circle
              key={d.label}
              cx="18"
              cy="18"
              r={r}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="4"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeDashoffset={-offset}
            />
          );
          offset += pct;
          return seg;
        })}
      </svg>
      <ul className="space-y-2">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="font-semibold text-foreground">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
