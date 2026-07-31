import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Radio, Home, Pill, PhoneCall, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/urgente")({
  head: () => ({
    meta: [
      { title: "Urgențe nucleare — CNCAN" },
      { name: "description", content: "Ghid oficial CNCAN pentru pregătirea și răspunsul populației în situații de urgență radiologică sau nucleară." },
      { property: "og:title", content: "Urgențe nucleare — CNCAN" },
      { property: "og:description", content: "Ce trebuie să știți și cum să acționați." },
    ],
  }),
  component: EmergencyPage,
});

const steps = [
  { icon: Home, ro: "Adăpostiți-vă în interior", en: "Shelter indoors", desc_ro: "Închideți ferestrele, ușile și opriți ventilația. Rămâneți în camerele fără ferestre.", desc_en: "Close windows and doors, turn off ventilation. Stay in windowless rooms." },
  { icon: Radio, ro: "Ascultați sursele oficiale", en: "Follow official channels", desc_ro: "Radio public, TVR, comunicate CNCAN. Nu răspândiți informații neverificate.", desc_en: "Public radio, TVR, CNCAN releases. Do not share unverified information." },
  { icon: Pill, ro: "Iodura de potasiu", en: "Potassium iodide", desc_ro: "Administrată doar la instrucțiunea autorităților. Respectați dozele indicate pe vârste.", desc_en: "Only taken when instructed by authorities. Follow age-based dosages." },
  { icon: PhoneCall, ro: "Sunați 112 doar pentru urgențe medicale", en: "Call 112 only for medical emergencies", desc_ro: "Nu blocați liniile de urgență. Informațiile publice se difuzează prin canale oficiale.", desc_en: "Do not block emergency lines. Public information runs via official channels." },
];

function EmergencyPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader eyebrow="04" title={t("em.title")} subtitle={t("em.sub")} tone="danger" />
      <section className="container-page py-16">
        <div className="border-l-4 border-danger bg-danger/5 p-6 md:p-8 rounded-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-danger" />
            <div className="text-sm font-semibold text-danger uppercase tracking-widest">
              {lang === "ro" ? "În caz de accident nuclear" : "In case of a nuclear accident"}
            </div>
          </div>
          <p className="mt-4 text-lg leading-relaxed max-w-3xl">
            {lang === "ro"
              ? "România dispune de un sistem național de răspuns la urgențe nucleare, coordonat de CNCAN împreună cu IGSU. Măsurile de protecție a populației sunt anunțate exclusiv prin canale oficiale."
              : "Romania operates a national nuclear emergency response system, coordinated by CNCAN together with IGSU. Population protection measures are announced exclusively via official channels."}
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl text-brand-deep">
            {lang === "ro" ? "Cei 4 pași" : "The 4 steps"}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="border border-border bg-card p-7 flex gap-5">
                  <div className="shrink-0 grid h-12 w-12 place-items-center bg-brand-deep text-white rounded-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-brand">0{i + 1}</div>
                    <h3 className="mt-1 font-display text-xl text-brand-deep">{lang === "ro" ? s.ro : s.en}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lang === "ro" ? s.desc_ro : s.desc_en}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MINI-SECTIUNE: PLATFORMA NATIONALA DE PREGATIRE PENTRU SITUATII DE URGENTA */}
        <div className="mt-16 border border-brand/40 bg-gradient-to-br from-brand-deep/5 via-card to-card p-8 rounded-sm shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
                <ExternalLink className="h-3.5 w-3.5" />
                {lang === "ro" ? "Portal Oficial DSU / IGSU" : "Official DSU / IGSU Portal"}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                {lang === "ro"
                  ? "Platforma Națională de Pregătire pentru Situații de Urgență"
                  : "National Emergency Preparedness Platform"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === "ro"
                  ? "Consultați ghidul oficial complet pentru protecția populației în caz de accident nuclear sau radiologic, pus la dispoziție de Departamentul pentru Situații de Urgență (DSU) și Inspectoratul General pentru Situații de Urgență (IGSU) prin platforma națională „Fii Pregătit”."
                  : "Consult the comprehensive official guide for population protection in case of a nuclear or radiological accident, provided by the Department for Emergency Situations (DSU) and IGSU via the national 'Fii Pregătit' platform."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://fiipregatit.ro/ghiduri/-despre-8-5"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-brand text-primary-foreground text-xs font-semibold hover:bg-brand-deep transition-colors shadow-sm"
              >
                <ShieldAlert className="h-4 w-4" />
                {lang === "ro" ? "Ghid în caz de accident nuclear" : "Nuclear Accident Guide"}
                <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
              </a>

              <a
                href="https://fiipregatit.ro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm border border-border bg-card text-foreground text-xs font-semibold hover:border-brand hover:text-brand transition-colors"
              >
                {lang === "ro" ? "Toate ghidurile fiipregatit.ro" : "All fiipregatit.ro guides"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

