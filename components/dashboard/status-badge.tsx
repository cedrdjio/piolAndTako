import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  // bookings
  confirmed: "bg-success/12 text-success",
  pending: "bg-warning/15 text-[#8a5a00]",
  completed: "bg-brand-50 text-brand-700",
  cancelled: "bg-danger/10 text-danger",
  // moderation
  approved: "bg-success/12 text-success",
  rejected: "bg-danger/10 text-danger",
  // payouts
  paid: "bg-success/12 text-success",
  processing: "bg-brand-50 text-brand-700",
  scheduled: "bg-surface-2 text-foreground",
  // users
  active: "bg-success/12 text-success",
  suspended: "bg-danger/10 text-danger",
};

const LABELS: Record<string, string> = {
  confirmed: "Confirmée",
  pending: "En attente",
  completed: "Terminée",
  cancelled: "Annulée",
  approved: "Approuvée",
  rejected: "Rejetée",
  paid: "Payé",
  processing: "En cours",
  scheduled: "Programmé",
  active: "Actif",
  suspended: "Suspendu",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        STYLES[status] ?? "bg-surface-2 text-foreground",
      )}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
