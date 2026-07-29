import { createFileRoute } from "@tanstack/react-router";
import { Search, FileText, Filter, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";

export const Route = createFileRoute("/legislatie")({
  head: () => ({
    meta: [
      { title: "Legislație nucleară — CNCAN" },
      { name: "description", content: "Registrul legislativ CNCAN: legi, ordonanțe, hotărâri și norme aplicabile domeniului nuclear din România." },
      { property: "og:title", content: "Registrul legislativ CNCAN" },
      { property: "og:description", content: "Toate actele normative aplicabile domeniului nuclear." },
    ],
  }),
  component: LegPage,
});

const items = [
  { no: "111/1996", type: "Lege", title_ro: "Legea privind desfășurarea în siguranță, reglementarea, autorizarea și controlul activităților nucleare", title_en: "Law on the safe conduct, regulation, licensing and control of nuclear activities", year: 1996, cat: "Cadru general" },
  { no: "115/2020", type: "OUG", title_ro: "Ordonanță de urgență privind securitatea și sănătatea persoanelor expuse la radiații ionizante", title_en: "Emergency ordinance on health & safety of persons exposed to ionizing radiation", year: 2020, cat: "Radioprotecție" },
  { no: "155/2005", type: "Ordin", title_ro: "Norme privind stabilirea taxelor și tarifelor pentru autorizarea și controlul activităților nucleare", title_en: "Rules on establishing fees for licensing and control of nuclear activities", year: 2005, cat: "Tarife" },
  { no: "356/2005", type: "Ordin", title_ro: "Norme fundamentale de securitate radiologică", title_en: "Fundamental radiological safety norms", year: 2005, cat: "Radioprotecție" },
  { no: "202/2002", type: "HG", title_ro: "Hotărârea privind gospodărirea în siguranță a deșeurilor radioactive", title_en: "Decision on safe management of radioactive waste", year: 2002, cat: "Deșeuri" },
  { no: "63/2018", type: "Ordin", title_ro: "Norme privind cerințele pentru autorizarea personalului cu responsabilități în domeniul nuclear", title_en: "Rules on requirements for licensing personnel with nuclear responsibilities", year: 2018, cat: "Personal" },
  { no: "48/2018", type: "Ordin", title_ro: "Norme privind planul național de acțiune pentru radon", title_en: "Rules on the national radon action plan", year: 2018, cat: "Radon" },
  { no: "5/2015", type: "Lege", title_ro: "Legea privind unele măsuri pentru facilitarea schimbului transfrontalier de informații", title_en: "Law on measures for cross-border information exchange", year: 2015, cat: "Cadru general" },
];

function LegPage() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const types = Array.from(new Set(items.map((i) => i.type)));
  const filtered = items.filter((i) => {
    const q = query.toLowerCase().trim();
    const matchQ =
      !q ||
      i.no.toLowerCase().includes(q) ||
      i.cat.toLowerCase().includes(q) ||
      (lang === "ro" ? i.title_ro : i.title_en).toLowerCase().includes(q);
    const matchF = !filter || i.type === filter;
    return matchQ && matchF;
  });

  return (
    <>
      <PageHeader eyebrow="02" title={t("leg.title")} subtitle={t("leg.sub")} />
      <section className="container-page py-12">
        <div className="border border-border bg-card p-5 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("leg.search")}
              className="w-full pl-10 pr-4 h-11 bg-secondary/50 border border-border rounded-sm text-sm outline-none focus:border-brand"
            />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <button
              onClick={() => setFilter(null)}
              className={`px-3 py-1.5 rounded-sm border ${filter === null ? "border-brand bg-brand text-primary-foreground" : "border-border hover:border-brand"}`}
            >
              {lang === "ro" ? "Toate" : "All"}
            </button>
            {types.map((ty) => (
              <button
                key={ty}
                onClick={() => setFilter(ty)}
                className={`px-3 py-1.5 rounded-sm border ${filter === ty ? "border-brand bg-brand text-primary-foreground" : "border-border hover:border-brand"}`}
              >
                {ty}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          {filtered.length} {lang === "ro" ? "rezultate" : "results"}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 border border-border bg-card p-12 text-center flex flex-col items-center justify-center">
            <HelpCircle className="h-10 w-10 text-muted-foreground/60 mb-3 stroke-[1.5]" />
            <h3 className="font-display text-xl text-foreground">
              {lang === "ro" ? "Nu s-a găsit niciun rezultat" : "No results found"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {lang === "ro"
                ? `Nu există niciun act normativ care să conțină termenul "${query}". Încercați alt termen de căutare.`
                : `We couldn't find any legislative document containing "${query}". Try searching another term.`}
            </p>
          </div>
        ) : (
          <div className="mt-4 border border-border bg-card divide-y divide-border">
            {filtered.map((it, i) => (
              <article key={i} className="p-5 md:p-6 grid gap-4 md:grid-cols-[160px_1fr_auto] items-start group hover:bg-secondary/40 cursor-pointer">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-brand font-semibold">{it.type}</div>
                  <div className="font-mono text-sm text-foreground mt-1">nr. {it.no}</div>
                  <div className="text-xs text-muted-foreground">{it.year}</div>
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground leading-snug group-hover:text-brand transition-colors">
                    {lang === "ro" ? it.title_ro : it.title_en}
                  </h3>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {lang === "ro" ? "Categorie" : "Category"}: {it.cat}
                  </div>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-deep font-medium">
                  <FileText className="h-4 w-4" /> PDF
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
