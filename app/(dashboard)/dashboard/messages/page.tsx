import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/dashboard/page-header";
import { HOST_MESSAGES } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

const CONVERSATION = [
  { from: "them", text: "Bonjour, est-il possible d'arriver plus tôt le 12 ?", time: "09:20" },
  { from: "me", text: "Bonjour Marie ! Oui, un check-in à 12h est tout à fait possible.", time: "09:22" },
  { from: "them", text: "Parfait, merci beaucoup ! Le parking est-il inclus ?", time: "09:24" },
];

export default function HostMessages() {
  return (
    <div className="space-y-6">
      <PageHeader title="Messagerie" description="Échangez avec vos voyageurs en temps réel." />

      <div className="grid gap-4 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background lg:grid-cols-[320px_1fr] lg:gap-0">
        {/* Threads */}
        <div className="lg:border-r lg:border-border">
          <div className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
            Conversations
          </div>
          <ul>
            {HOST_MESSAGES.map((m, i) => (
              <li key={m.id}>
                <button
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-border px-4 py-3.5 text-left transition-colors hover:bg-surface",
                    i === 0 && "bg-surface",
                  )}
                >
                  <Avatar name={m.name} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-foreground">{m.name}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{m.listing}</p>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">{m.preview}</p>
                  </div>
                  {m.unread > 0 && (
                    <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {m.unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Conversation */}
        <div className="flex min-h-[420px] flex-col">
          <div className="flex items-center gap-3 border-b border-border px-5 py-3">
            <Avatar name="Marie Tchouang" size={38} />
            <div>
              <p className="font-medium text-foreground">Marie Tchouang</p>
              <p className="text-xs text-muted-foreground">Villa Bonanjo · en ligne</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface/40 p-5">
            {CONVERSATION.map((msg, i) => (
              <div key={i} className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.from === "me"
                      ? "rounded-br-md bg-brand text-white"
                      : "rounded-bl-md bg-background text-foreground shadow-[var(--shadow-xs)]",
                  )}
                >
                  {msg.text}
                  <span className={cn("mt-1 block text-[0.65rem]", msg.from === "me" ? "text-white/70" : "text-muted-foreground")}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              placeholder="Écrire un message…"
              className="h-11 flex-1 rounded-full border border-border bg-surface px-4 text-sm focus:border-brand focus:outline-none"
            />
            <button className="inline-flex size-11 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-600" aria-label="Envoyer">
              <Send className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
