import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel } from "@/components/dashboard/page-header";

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={`relative h-6 w-11 shrink-0 rounded-full ${on ? "bg-brand" : "bg-surface-2"}`}>
      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </span>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

const FEATURES = [
  { label: "Réservation instantanée", desc: "Autoriser les réservations sans validation hôte.", on: true },
  { label: "Paiement par carte", desc: "Activer Visa / Mastercard en plus du Mobile Money.", on: true },
  { label: "Vérification KYC des hôtes", desc: "Exiger une pièce d'identité avant publication.", on: true },
  { label: "Mode maintenance", desc: "Rendre la plateforme inaccessible aux visiteurs.", on: false },
];

export default function AdminSettings() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Paramètres de la plateforme" description="Configuration globale de Piol & Tako." />

      <Panel title="Commercial">
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Commission plateforme (%)" hint="Prélevée sur chaque réservation.">
            <Input type="number" defaultValue="5" />
          </Field>
          <Field label="Devise par défaut">
            <select className="flex h-11 w-full rounded-[var(--radius-md)] border border-input bg-background px-3.5 text-sm shadow-[var(--shadow-xs)] focus:border-brand focus:outline-none">
              <option>FCFA (XAF)</option>
              <option>EUR (€)</option>
              <option>USD ($)</option>
            </select>
          </Field>
          <Field label="Délai d'annulation gratuite (h)">
            <Input type="number" defaultValue="48" />
          </Field>
          <Field label="Email support">
            <Input type="email" defaultValue="hello@piolandtako.com" />
          </Field>
        </div>
      </Panel>

      <Panel title="Fonctionnalités">
        <ul className="divide-y divide-border">
          {FEATURES.map((f) => (
            <li key={f.label} className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-medium text-foreground">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
              <Toggle on={f.on} />
            </li>
          ))}
        </ul>
      </Panel>

      <div className="flex justify-end">
        <Button>Enregistrer les modifications</Button>
      </div>
    </div>
  );
}
