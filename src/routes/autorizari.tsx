import { createFileRoute } from "@tanstack/react-router";
import { FileCheck, Radiation, Truck, Trash2, Building2, Atom, ArrowRight, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/autorizari")({
  head: () => ({
    meta: [
      { title: "Autorizări și tarife — CNCAN" },
      { name: "description", content: "Proceduri de autorizare CNCAN pentru instalații nucleare, surse de radiații, transport și deșeuri radioactive." },
      { property: "og:title", content: "Autorizări și tarife — CNCAN" },
      { property: "og:description", content: "Toate procedurile de autorizare pentru activități nucleare din România." },
    ],
  }),
  component: AuthPage,
});

const categories = [
  { icon: Atom, ro: "Instalații nucleare", en: "Nuclear installations", desc_ro: "Autorizarea amplasării, construcției, punerii în funcțiune, exploatării și dezafectării.", desc_en: "Licensing of siting, construction, commissioning, operation and decommissioning.", count: 14 },
  { icon: Radiation, ro: "Surse de radiații ionizante", en: "Ionizing radiation sources", desc_ro: "Deținere, utilizare, producție, import/export de surse radioactive.", desc_en: "Possession, use, production, import/export of radioactive sources.", count: 22 },
  { icon: Building2, ro: "Construcții cu specific nuclear", en: "Nuclear-specific constructions", desc_ro: "Autorizări pentru proiectare și construcție cu specific nuclear.", desc_en: "Authorizations for nuclear-specific design and construction.", count: 8 },
  { icon: Truck, ro: "Transport materiale radioactive", en: "Radioactive material transport", desc_ro: "Aprobări pachet-colet, expediere, tranzit internațional.", desc_en: "Package approvals, shipping, international transit.", count: 11 },
  { icon: Trash2, ro: "Deșeuri radioactive", en: "Radioactive waste", desc_ro: "Colectare, tratare, condiționare, depozitare intermediară și definitivă.", desc_en: "Collection, treatment, conditioning, interim and final disposal.", count: 9 },
  { icon: FileCheck, ro: "Personal expus profesional", en: "Occupationally exposed staff", desc_ro: "Permise de exercitare, atestări responsabil cu securitatea radiologică.", desc_en: "Practice permits, radiation safety officer accreditations.", count: 6 },
];

function AuthPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader eyebrow="01" title={t("auth.title")} subtitle={t("auth.sub")} />
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <article key={i} className="group border border-border bg-card p-7 hover:border-brand transition-colors">
                <div className="flex items-start justify-between">
                  <Icon className="h-7 w-7 text-brand" strokeWidth={1.4} />
                  <span className="text-xs font-mono text-muted-foreground">{String(c.count).padStart(2, "0")} proc.</span>
                </div>
                <h3 className="mt-6 font-display text-xl text-brand-deep">{lang === "ro" ? c.ro : c.en}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lang === "ro" ? c.desc_ro : c.desc_en}</p>
                <div className="mt-6 flex items-center gap-4 text-xs">
                  <a className="inline-flex items-center gap-1 font-medium text-brand hover:text-brand-deep" href="#">
                    {lang === "ro" ? "Vezi proceduri" : "View procedures"} <ArrowRight className="h-3 w-3" />
                  </a>
                  <a className="inline-flex items-center gap-1 text-muted-foreground hover:text-brand" href="#">
                    <Download className="h-3 w-3" /> {lang === "ro" ? "Formular" : "Form"}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Fees section */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand">02</div>
            <h2 className="mt-2 font-display text-3xl text-brand-deep">
              {lang === "ro" ? "Tarife și taxe" : "Fees and charges"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {lang === "ro"
                ? "Nivelul taxelor este stabilit prin Ordinul CNCAN 155/2005, cu modificările ulterioare."
                : "Fee levels are set by CNCAN Order 155/2005, as subsequently amended."}
            </p>
          </div>
          <div className="border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">{lang === "ro" ? "Categoria" : "Category"}</th>
                  <th className="text-left px-5 py-3 font-semibold">{lang === "ro" ? "Procedura" : "Procedure"}</th>
                  <th className="text-right px-5 py-3 font-semibold">{lang === "ro" ? "Tarif (RON)" : "Fee (RON)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Instalații", "Emitere autorizație exploatare", "48,500"],
                  ["Surse radiație", "Deținere sursă categoria 1-3", "3,200"],
                  ["Transport", "Aprobare pachet tip B(U)", "12,800"],
                  ["Deșeuri", "Autorizație depozitare intermediară", "24,600"],
                  ["Personal", "Permis exercitare (5 ani)", "480"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/50">
                    <td className="px-5 py-3 text-muted-foreground">{row[0]}</td>
                    <td className="px-5 py-3">{row[1]}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
