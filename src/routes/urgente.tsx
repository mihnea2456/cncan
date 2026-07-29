import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Radio, Home, Pill, PhoneCall } from "lucide-react";
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
      </section>
    </>
  );
}
