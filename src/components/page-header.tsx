import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  tone = "brand",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "brand" | "danger";
}) {
  return (
    <section
      className={`relative overflow-hidden border-b border-border ${
        tone === "danger" ? "bg-gradient-to-br from-brand-deep to-[oklch(0.28_0.09_20)]" : "bg-gradient-to-br from-brand-deep to-brand"
      } text-primary-foreground`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-page relative py-16 md:py-20">
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-8 bg-gold" />
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-4 font-display text-4xl md:text-5xl text-white max-w-3xl leading-[1.1]">{title}</h1>
        {subtitle ? <p className="mt-4 text-base md:text-lg text-white/75 max-w-2xl leading-relaxed">{subtitle}</p> : null}
      </div>
    </section>
  );
}
