import { Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader, Panel } from "@/components/dashboard/page-header";

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={`relative h-6 w-11 shrink-0 rounded-full ${on ? "bg-brand" : "bg-surface-2"}`}>
      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

const NOTIFS = [
  { label: "Nouvelles réservations", desc: "Recevez une alerte à chaque demande.", on: true },
  { label: "Messages", desc: "Notifications des messages voyageurs.", on: true },
  { label: "Rappels de versement", desc: "Quand un versement est programmé.", on: false },
  { label: "Conseils & nouveautés", desc: "Astuces pour mieux louer.", on: false },
];

export default function HostSettings() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Paramètres" description="Gérez votre profil, vos versements et vos préférences." />

      <Panel title="Profil">
        <div className="space-y-5 p-5">
          <div className="flex items-center gap-4">
            <Avatar name="Awa Njoya" size={64} />
            <Button variant="outline" size="sm">Changer la photo</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prénom"><Input defaultValue="Awa" /></Field>
            <Field label="Nom"><Input defaultValue="Njoya" /></Field>
            <Field label="Email"><Input type="email" defaultValue="awa@piolandtako.com" /></Field>
            <Field label="Téléphone"><Input type="tel" defaultValue="+237 699 11 22 33" /></Field>
          </div>
          <Field label="Bio">
            <textarea
              rows={3}
              defaultValue="Hôte passionnée à Douala. J'accueille mes voyageurs comme des amis."
              className="w-full rounded-[var(--radius-md)] border border-input bg-background px-3.5 py-2.5 text-sm shadow-[var(--shadow-xs)] focus:border-brand focus:outline-none"
            />
          </Field>
          <div className="flex justify-end">
            <Button>Enregistrer</Button>
          </div>
        </div>
      </Panel>

      <Panel title="Versements">
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-border p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
                <Smartphone className="size-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">Orange Money</p>
                <p className="text-sm text-muted-foreground">+237 699 •• •• 33</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Modifier</Button>
          </div>
          <Button variant="subtle" size="sm">+ Ajouter un moyen de versement</Button>
        </div>
      </Panel>

      <Panel title="Notifications">
        <ul className="divide-y divide-border">
          {NOTIFS.map((n) => (
            <li key={n.label} className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-medium text-foreground">{n.label}</p>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
              </div>
              <Toggle on={n.on} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
