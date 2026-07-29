import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck, Radiation, Truck, Trash2, ShieldAlert, Scale, ClipboardList, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const tasks = [
  { icon: FileCheck, ro: "Depune cerere autorizație", en: "Submit license application", desc_ro: "Instalații, surse, transport, deșeuri", desc_en: "Installations, sources, transport, waste" },
  { icon: ClipboardList, ro: "Verifică stadiul cererii", en: "Check application status", desc_ro: "Cu numărul de înregistrare", desc_en: "Using your reference number" },
  { icon: Scale, ro: "Consultă tariful aplicabil", en: "Check applicable fees", desc_ro: "Ord. 155/2005 și modificări", desc_en: "Order 155/2005 and amendments" },
  { icon: Search, ro: "Caută în legislație", en: "Search legislation", desc_ro: "Legi, ordonanțe, norme CNCAN", desc_en: "Laws, ordinances, CNCAN norms" },
  { icon: Radiation, ro: "Notificare surse radiație", en: "Radiation source notification", desc_ro: "Registru național de evidență", desc_en: "National evidence registry" },
  { icon: Truck, ro: "Aprobare transport", en: "Transport approval", desc_ro: "Materiale radioactive și nucleare", desc_en: "Radioactive & nuclear materials" },
  { icon: Trash2, ro: "Gestiune deșeuri radioactive", en: "Radioactive waste management", desc_ro: "Depozitare, dezafectare, transfer", desc_en: "Storage, decommissioning, transfer" },
  { icon: ShieldAlert, ro: "Raportează un incident", en: "Report an incident", desc_ro: "Notificare 24/7 către CNCAN", desc_en: "24/7 notification to CNCAN" },
];

const news = [
  { date: "24.04.2026", tag_ro: "Program", tag_en: "Program", title_ro: "Deschiderea perioadei de depunere a candidaturilor pentru Programul Oficial de Internship 2026", title_en: "Application period opens for the Official Government Internship Program 2026" },
  { date: "22.08.2025", tag_ro: "Tarife", tag_en: "Fees", title_ro: "Formular actualizat pentru taxele și tarifele de autorizare și control", title_en: "Updated form for authorization and control fees" },
  { date: "02.05.2025", tag_ro: "Jurisprudență", tag_en: "Case law", title_ro: "Principii ce rezultă din jurisprudența CEDO privind neexecutarea hotărârilor judecătorești", title_en: "Principles from ECHR case law on non-enforcement of court decisions" },
];

function HomePage() {
  const { t, lang } = useI18n();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-deep text-primary-foreground">
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.72 0.13 78) 0, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.62 0.14 245) 0, transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="container-page relative py-20 md:py-32 grid gap-12 md:grid-cols-[1.35fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-8 bg-gold" />
              {t("home.hero.eyebrow")}
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-white max-w-2xl">
              {t("home.hero.title")}
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/75 max-w-xl leading-relaxed">
              {t("home.hero.sub")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-brand-deep hover:bg-gold/90 rounded-sm h-12 px-6 font-medium">
                <Link to="/autorizari">
                  {t("home.hero.cta.primary")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm h-12 px-6 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/legislatie">{t("home.hero.cta.secondary")}</Link>
              </Button>
            </div>
          </div>

          {/* Emergency card */}
          <div className="relative">
            <div className="rounded-sm border border-danger/40 bg-danger/10 backdrop-blur-sm p-6 shadow-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80">
                <ShieldAlert className="h-4 w-4 text-danger" />
                {t("home.emergency.badge")}
              </div>
              <h3 className="mt-4 font-display text-2xl text-white">{t("home.emergency.title")}</h3>
              <p className="mt-3 text-sm text-white/75">{t("home.emergency.body")}</p>
              <Link
                to="/urgente"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80"
              >
                {t("home.emergency.cta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-card">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { n: "2,840", k: "home.stats.licensees" as const },
            { n: "1,120", k: "home.stats.inspections" as const },
            { n: "184", k: "home.stats.laws" as const },
            { n: "96", k: "home.stats.staff" as const },
          ].map((s, i) => (
            <div key={i} className="px-6 py-8">
              <div className="font-display text-3xl md:text-4xl text-brand-deep tabular-nums">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{t(s.k)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tasks */}
      <section className="container-page py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-brand">01 · {t("home.tasks.title")}</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-brand-deep">
            {lang === "ro" ? "Ce doriți să faceți astăzi?" : "What do you want to do today?"}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("home.tasks.sub")}</p>
        </div>

        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 border border-border">
          {tasks.map((task, i) => {
            const Icon = task.icon;
            return (
              <button
                key={i}
                className="group text-left bg-card p-6 min-h-[180px] flex flex-col justify-between transition-colors hover:bg-accent/50"
              >
                <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-lg text-brand-deep leading-snug">
                    {lang === "ro" ? task.ro : task.en}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {lang === "ro" ? task.desc_ro : task.desc_en}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === "ro" ? "Continuă" : "Continue"} <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* News */}
      <section className="bg-card border-y border-border">
        <div className="container-page py-20 md:py-24 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand">02 · {t("home.news.title")}</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-brand-deep">
              {lang === "ro" ? "Comunicate oficiale" : "Official communications"}
            </h2>
            <Link
              to="/comunicate"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-deep"
            >
              {t("home.news.all")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-border border-t border-b border-border">
            {news.map((item, i) => (
              <article key={i} className="py-6 grid gap-4 md:grid-cols-[140px_1fr] items-start group cursor-pointer">
                <div className="text-xs">
                  <div className="font-mono text-muted-foreground">{item.date}</div>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-accent text-accent-foreground rounded-sm uppercase tracking-wider text-[10px] font-semibold">
                    {lang === "ro" ? item.tag_ro : item.tag_en}
                  </div>
                </div>
                <h3 className="font-display text-lg text-foreground leading-snug group-hover:text-brand transition-colors">
                  {lang === "ro" ? item.title_ro : item.title_en}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="container-page py-20">
        <div className="rounded-sm border border-border bg-gradient-to-br from-brand-deep to-brand p-10 md:p-14 text-primary-foreground">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr] items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white">
                {lang === "ro"
                  ? "Sunteți titular de autorizație?"
                  : "Are you a licensee?"}
              </h2>
              <p className="mt-3 text-white/75 max-w-xl">
                {lang === "ro"
                  ? "Accesați portalul dedicat pentru raportare periodică, reînnoiri de autorizație și corespondență securizată cu inspectorii CNCAN."
                  : "Access the dedicated portal for periodic reporting, license renewals and secure correspondence with CNCAN inspectors."}
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button size="lg" className="bg-gold text-brand-deep hover:bg-gold/90 rounded-sm h-12 px-6">
                {lang === "ro" ? "Autentificare portal" : "Portal sign in"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
