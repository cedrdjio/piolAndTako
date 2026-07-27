export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[var(--radius-lg)] border border-border bg-background shadow-[var(--shadow-xs)] ${className ?? ""}`}
    >
      {title && (
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
