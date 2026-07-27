import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { TRUST_FEATURES } from "@/lib/constants";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <div className="bg-mesh relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-16 top-10 size-80 rounded-full bg-brand/25 blur-3xl" />
        <Image
          src="/brand/mark-white.png"
          alt=""
          width={728}
          height={513}
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 w-2/3 opacity-[0.07]"
        />
        <Logo tone="white" />

        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-tight">
            Réservez l&apos;exception.
            <br />
            Vivez Piol &amp; Tako.
          </h2>
          <ul className="mt-8 space-y-4">
            {TRUST_FEATURES.slice(0, 3).map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-white/12">
                  <f.icon className="size-4" />
                </span>
                <span>
                  <span className="block font-medium">{f.title}</span>
                  <span className="block text-sm text-white/70">{f.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/60">Built in Cameroon. Designed for Africa.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <Logo tone="navy" />
          </div>
          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground lg:mt-0">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </div>
    </div>
  );
}

export function AuthField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
}

export { Link };
