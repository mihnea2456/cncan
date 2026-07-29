import { createFileRoute } from "@tanstack/react-router";
import { Search, FileText, Filter, HelpCircle, Star, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";

export const Route = createFileRoute("/legislatie")({
  head: () => ({
    meta: [
      { title: "Legislație nucleară — CNCAN" },
      { name: "description", content: "Registrul legislativ CNCAN: Legea 111/1996, ordonanțe, hotărâri și norme aplicabile domeniului nuclear din România." },
      { property: "og:title", content: "Registrul legislativ CNCAN" },
      { property: "og:description", content: "Toate actele normative aplicabile domeniului nuclear." },
    ],
  }),
  component: LegPage,
});

const items = [
  {
    no: "111/1996",
    type: "Lege",
    title_ro: "Legea nr. 111/1996 privind desfășurarea în siguranță, reglementarea, autorizarea și controlul activităților nucleare",
    title_en: "Law no. 111/1996 on the safe conduct, regulation, licensing and control of nuclear activities",
    year: 1996,
    cat: "Cadru general",
    featured: true,
    pdfUrl: "/documents/Legea_111_1996.pdf",
  },
  {
    no: "115/2020",
    type: "OUG",
    title_ro: "Ordonanță de urgență privind securitatea și sănătatea persoanelor expuse la radiații ionizante",
    title_en: "Emergency ordinance on health & safety of persons exposed to ionizing radiation",
    year: 2020,
    cat: "Radioprotecție",
  },
  {
    no: "155/2005",
    type: "Ordin",
    title_ro: "Norme privind stabilirea taxelor și tarifelor pentru autorizarea și controlul activităților nucleare",
    title_en: "Rules on establishing fees for licensing and control of nuclear activities",
    year: 2005,
    cat: "Tarife",
  },
  {
    no: "356/2005",
    type: "Ordin",
    title_ro: "Norme fundamentale de securitate radiologică",
    title_en: "Fundamental radiological safety norms",
    year: 2005,
    cat: "Radioprotecție",
  },
  {
    no: "202/2002",
    type: "HG",
    title_ro: "Hotărârea privind gospodărirea în siguranță a deșeurilor radioactive",
    title_en: "Decision on safe management of radioactive waste",
    year: 2002,
    cat: "Deșeuri",
  },
  {
    no: "63/2018",
    type: "Ordin",
    title_ro: "Norme privind cerințele pentru autorizarea personalului cu responsabilități în domeniul nuclear",
    title_en: "Rules on requirements for licensing personnel with nuclear responsibilities",
    year: 2018,
    cat: "Personal",
  },
  {
    no: "48/2018",
    type: "Ordin",
    title_ro: "Norme privind planul național de acțiune pentru radon",
    title_en: "Rules on the national radon action plan",
    year: 2018,
    cat: "Radon",
  },
  {
    no: "5/2015",
    type: "Lege",
    title_ro: "Legea privind unele măsuri pentru facilitarea schimbului transfrontalier de informații",
    title_en: "Law on measures for cross-border information exchange",
    year: 2015,
    cat: "Cadru general",
  },
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

  const featuredItem = items.find((i) => i.featured);

  return (
    <>
      <PageHeader eyebrow="02" title={t("leg.title")} subtitle={t("leg.sub")} />
      <section className="container-page py-12">
        {/* LEGEA 111/1996 FEATURED CARD */}
        {featuredItem && (!filter || filter === featuredItem.type) && (!query || "111/1996".includes(query.toLowerCase()) || "legea".includes(query.toLowerCase()) || "nucleare".includes(query.toLowerCase())) && (
          <div className="mb-8 rounded-sm border-2 border-brand/40 bg-gradient-to-br from-brand-deep/5 via-card to-brand/10 p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                {lang === "ro" ? "LEGEA CADRU A DOMENIULUI NUCLEAR" : "FRAMEWORK LAW OF NUCLEAR SECTOR"}
              </div>
              <span className="font-mono text-xs text-muted-foreground">Republicată & Consolidată 2013</span>
            </div>

            <h2 className="mt-4 font-display text-2xl md:text-3xl text-brand-deep leading-snug">
              {lang === "ro" ? featuredItem.title_ro : featuredItem.title_en}
            </h2>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-3xl">
              {lang === "ro"
                ? "Actul normativ fundamental care reglementează regimul de autorizare, securitatea nucleară, radioprotecția, controlul de stat și sancțiunile aplicabile tuturor activităților nucleare din România."
                : "The main legislative act regulating licensing, nuclear safety, radiation protection, state control, and sanctions for all nuclear activities in Romania."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={featuredItem.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep shadow-sm"
              >
                <Download className="h-4 w-4" />
                {lang === "ro" ? "Descarcă Legea 111/1996 (PDF)" : "Download Law 111/1996 (PDF)"}
              </a>
              <a
                href={featuredItem.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <FileText className="h-4 w-4 text-brand" />
                {lang === "ro" ? "Deschide în browser" : "Open in browser"}
              </a>
            </div>
          </div>
        )}

        {/* SEARCH AND FILTERS */}
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
                <a
                  href={it.pdfUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-deep font-medium"
                >
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
