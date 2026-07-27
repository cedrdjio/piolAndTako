import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, Panel } from "@/components/dashboard/page-header";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
// August 2026 starts on a Saturday (offset 5 from Monday).
const OFFSET = 5;
const DAYS = 31;
const BOOKED = new Set([12, 13, 14, 15, 16, 18, 25, 26, 27, 28]);
const PENDING = new Set([1, 3, 21]);

export default function HostCalendar() {
  const cells: (number | null)[] = [
    ...Array.from({ length: OFFSET }, () => null),
    ...Array.from({ length: DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Calendrier" description="Disponibilités et réservations de vos annonces." />

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <Legend className="bg-navy" label="Réservé" />
        <Legend className="bg-warning" label="En attente" />
        <Legend className="border border-border bg-background" label="Disponible" />
      </div>

      <Panel>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">Août 2026</h2>
          <div className="flex gap-1">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-surface-2" aria-label="Mois précédent">
              <ChevronLeft className="size-4" />
            </button>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-surface-2" aria-label="Mois suivant">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-5">
          <div className="grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((d) => (
              <div key={d} className="pb-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {d}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={`e${i}`} />;
              const booked = BOOKED.has(day);
              const pending = PENDING.has(day);
              return (
                <div
                  key={day}
                  className={cn(
                    "flex aspect-square flex-col justify-start rounded-[var(--radius-sm)] border p-1.5 text-sm sm:aspect-[4/3]",
                    booked
                      ? "border-navy bg-navy text-white"
                      : pending
                        ? "border-warning/40 bg-warning/10 text-[#8a5a00]"
                        : "border-border bg-background text-foreground hover:bg-surface",
                  )}
                >
                  <span className="font-medium">{day}</span>
                  {booked && <span className="mt-auto hidden text-[0.6rem] opacity-80 sm:block">Villa Bonanjo</span>}
                </div>
              );
            })}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-muted-foreground">
      <span className={cn("size-4 rounded", className)} />
      {label}
    </span>
  );
}
