import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileCheck,
  Radiation,
  Truck,
  Trash2,
  Building2,
  Atom,
  ArrowRight,
  Download,
  CheckCircle2,
  Award,
  Search,
  FolderOpen,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";

export const Route = createFileRoute("/autorizari")({
  head: () => ({
    meta: [
      { title: "Autorizări, Dosare și Tarife — CNCAN" },
      {
        name: "description",
        content:
          "Centralizator documente de autorizare CNCAN: Managementul Calității (MC), Surse de radiații ionizante, instalații nucleare, transport și deșeuri.",
      },
      { property: "og:title", content: "Centralizator Autorizări CNCAN" },
      {
        property: "og:description",
        content: "Formulare, cereri și dosare complete de autorizare pentru activități nucleare.",
      },
    ],
  }),
  component: AuthPage,
});

const categories = [
  {
    id: "mc",
    icon: Award,
    ro: "Managementul Calității (MC)",
    en: "Quality Management (QM)",
    desc_ro: "Documente specifice, cereri de autorizare și evaluare pentru Sistemul de Management al Calității (SMC).",
    desc_en: "Specific documents, licensing forms and evaluation for Quality Management Systems.",
    count: 3,
    customLink: "/managementul-calitatii",
  },
  {
    id: "surse",
    icon: Radiation,
    ro: "Surse de Radiații Ionizante",
    en: "Ionizing Radiation Sources",
    desc_ro: "Permise de exercitare, cereri și dosare complete pentru deținere, utilizare, producție, import/export și RNDSR.",
    desc_en: "Practice permits, full application dossiers for possession, use, production, import/export and RNDSR.",
    count: 4,
    customLink: "/surse-de-radiatii-ionizante",
  },
  {
    id: "instalatii",
    icon: Atom,
    ro: "Instalații Nucleare",
    en: "Nuclear Installations",
    desc_ro: "Autorizarea amplasării, construcției, punerii în funcțiune, exploatării și dezafectării.",
    desc_en: "Licensing of siting, construction, commissioning, operation and decommissioning.",
    count: 2,
  },
  {
    id: "constructii",
    icon: Building2,
    ro: "Construcții cu Specific Nuclear",
    en: "Nuclear-Specific Constructions",
    desc_ro: "Autorizări pentru proiectare și construcție cu specific nuclear.",
    desc_en: "Authorizations for nuclear-specific design and construction.",
    count: 1,
  },
  {
    id: "transport",
    icon: Truck,
    ro: "Transport Materiale Radioactive",
    en: "Radioactive Material Transport",
    desc_ro: "Aprobări pachet-colet, expediere, tranzit internațional.",
    desc_en: "Package approvals, shipping, international transit.",
    count: 1,
  },
  {
    id: "deseuri",
    icon: Trash2,
    ro: "Deșeuri Radioactive",
    en: "Radioactive Waste",
    desc_ro: "Colectare, tratare, condiționare, depozitare intermediară și definitivă.",
    desc_en: "Collection, treatment, conditioning, interim and final disposal.",
    count: 1,
  },
  {
    id: "personal",
    icon: FileCheck,
    ro: "Personal Expus Profesional",
    en: "Occupationally Exposed Staff",
    desc_ro: "Permise de exercitare, atestări responsabil cu securitatea radiologică.",
    desc_en: "Practice permits, radiation safety officer accreditations.",
    count: 1,
  },
];

const documents = [
  // Managementul Calitatii
  {
    catId: "mc",
    code: "MC-01",
    title_ro: "Model Cerere Autorizare Sistem Managementul Calității (SMC)",
    title_en: "Model Licensing Application Form for Quality Management System",
    type: "Cerere",
    fileUrl: "/documents/Model%20Cerere%20Autorizare%20SMC.pdf",
  },
  {
    catId: "mc",
    code: "MC-02",
    title_ro: "Model Chestionar de Evaluare Inițială SMC (Anexa 2)",
    title_en: "Model Initial QMS Evaluation Questionnaire (Annex 2)",
    type: "Chestionar",
    fileUrl: "/documents/Model%20Chestionar%20pentru%20SMC.pdf",
  },
  {
    catId: "mc",
    code: "MC-03",
    title_ro: "Centralizator cerințe de calitate conform normelor CNCAN",
    title_en: "Quality requirements checklist according to CNCAN norms",
    type: "Centralizator",
    fileUrl: "/managementul-calitatii",
  },

  // Surse de radiatii ionizante
  {
    catId: "surse",
    code: "SR-01",
    title_ro: "Permise de Exercitare — Procedură și Cerințe Autorizare Personal",
    title_en: "Practice Permits — Personnel Licensing Procedure and Requirements",
    type: "Ghid & Cerințe",
    fileUrl: "/surse-de-radiatii-ionizante",
  },
  {
    catId: "surse",
    code: "SR-02",
    title_ro: "Formular notificare import / export surse de radiații ionizante",
    title_en: "Notification form for import/export of ionizing radiation sources",
    type: "Formular",
    fileUrl: "/surse-de-radiatii-ionizante",
  },
  {
    catId: "surse",
    code: "SR-03",
    title_ro: "Chestionar de radioprotecție și securitate radiologică",
    title_en: "Radiological protection and safety questionnaire",
    type: "Chestionar",
    fileUrl: "/surse-de-radiatii-ionizante",
  },
  {
    catId: "surse",
    code: "SR-04",
    title_ro: "Cerere autorizare producție și furnizare aparatură dozimetrică",
    title_en: "Production & supply licensing for dosimetric equipment",
    type: "Cerere",
    fileUrl: "/surse-de-radiatii-ionizante",
  },

  // Instalatii nucleare
  {
    catId: "instalatii",
    code: "IN-01",
    title_ro: "Cerere autorizare amplasare și construcție instalații nucleare",
    title_en: "Licensing application for nuclear installation siting & construction",
    type: "Cerere",
    fileUrl: "#",
  },
  {
    catId: "instalatii",
    code: "IN-02",
    title_ro: "Ghid de întocmire a Raportului de Securitate Nucleară (RSN)",
    title_en: "Guide for preparing Nuclear Safety Report (NSR)",
    type: "Ghid",
    fileUrl: "#",
  },

  // Transport
  {
    catId: "transport",
    code: "TR-01",
    title_ro: "Cerere aprobare pachet-colet tip B(U) / B(M) pentru transport",
    title_en: "Package approval application for type B(U)/B(M) transport",
    type: "Cerere",
    fileUrl: "#",
  },

  // Deseuri
  {
    catId: "deseuri",
    code: "DS-01",
    title_ro: "Formular autorizare depozitare intermediară / definitivă deșeuri",
    title_en: "Application form for interim/final waste storage licensing",
    type: "Formular",
    fileUrl: "#",
  },

  // Personal
  {
    catId: "personal",
    code: "PE-01",
    title_ro: "Cerere eliberare / prelungire permis de exercitare (Personal Expus)",
    title_en: "Application for practice permit issuance/renewal (Exposed Staff)",
    type: "Cerere",
    fileUrl: "#",
  },
];

function AuthPage() {
  const { t, lang } = useI18n();
  const [activeCat, setActiveCat] = useState("all");
  const [searchDocQuery, setSearchDocQuery] = useState("");

  const filteredDocs = documents.filter((doc) => {
    const matchCat = activeCat === "all" || doc.catId === activeCat;
    const q = searchDocQuery.toLowerCase().trim();
    const matchQ =
      !q ||
      doc.code.toLowerCase().includes(q) ||
      (lang === "ro" ? doc.title_ro : doc.title_en).toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <>
      <PageHeader eyebrow="01" title={t("auth.title")} subtitle={t("auth.sub")} />
      <section className="container-page py-12 md:py-16">
        {/* HERO CENTRALIZATOR NOTICE */}
        <div className="mb-12 rounded-sm border border-brand/30 bg-gradient-to-r from-brand-deep/5 via-card to-brand/5 p-6 md:p-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
              <FolderOpen className="h-4 w-4" />
              {lang === "ro" ? "Centralizator Documente Autorizare" : "Centralized Licensing Portal"}
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
              {lang === "ro"
                ? "Acces direct la cereri, dosare și documente specifice"
                : "Direct access to applications, dossiers and specific documents"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              {lang === "ro"
                ? "Selectați categoria dorită mai jos (Managementul Calității, Surse de Radiații, Instalații etc.) pentru a deschide sau descărca rapid dosarele complete de autorizare."
                : "Select your desired category below (Quality Management, Radiation Sources, Installations etc.) to quickly access and download licensing files."}
            </p>
          </div>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const Icon = c.icon;
            const isSelected = activeCat === c.id;
            return c.customLink ? (
              <Link
                key={i}
                to={c.customLink}
                className="group border border-brand/60 bg-card p-7 hover:border-brand transition-all shadow-sm rounded-sm"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-7 w-7 text-brand" strokeWidth={1.4} />
                  <span className="text-xs font-mono text-muted-foreground">{String(c.count).padStart(2, "0")} doc.</span>
                </div>
                <h3 className="mt-6 font-display text-xl text-brand-deep">{lang === "ro" ? c.ro : c.en}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lang === "ro" ? c.desc_ro : c.desc_en}</p>
                <div className="mt-6 flex items-center justify-between text-xs pt-4 border-t border-border/60">
                  <span className="font-semibold text-brand group-hover:text-brand-deep inline-flex items-center gap-1">
                    {lang === "ro" ? "Vezi Cerințe & Permise SR" : "View Permits & Requirements"} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ) : (
              <article
                key={i}
                onClick={() => setActiveCat(c.id)}
                className={`group cursor-pointer border p-7 transition-all ${
                  isSelected
                    ? "border-brand bg-brand/5 shadow-sm"
                    : "border-border bg-card hover:border-brand/60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <Icon className={`h-7 w-7 ${isSelected ? "text-brand-deep" : "text-brand"}`} strokeWidth={1.4} />
                  <span className="text-xs font-mono text-muted-foreground">{String(c.count).padStart(2, "0")} doc.</span>
                </div>
                <h3 className="mt-6 font-display text-xl text-brand-deep">{lang === "ro" ? c.ro : c.en}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lang === "ro" ? c.desc_ro : c.desc_en}</p>
                <div className="mt-6 flex items-center justify-between text-xs pt-4 border-t border-border/60">
                  <span className="font-medium text-brand group-hover:text-brand-deep inline-flex items-center gap-1">
                    {lang === "ro" ? "Vezi dosarele" : "View dossiers"} <ArrowRight className="h-3 w-3" />
                  </span>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-brand" />}
                </div>
              </article>
            );
          })}
        </div>

        {/* CENTRALIZED DOCUMENTS LIST SECTION */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-brand">02 · Centralizator</div>
              <h2 className="mt-1 font-display text-2xl md:text-3xl text-brand-deep">
                {lang === "ro" ? "Dosare și Formulare Descărcabile" : "Downloadable Dossiers and Forms"}
              </h2>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={searchDocQuery}
                  onChange={(e) => setSearchDocQuery(e.target.value)}
                  placeholder={lang === "ro" ? "Căutare document..." : "Search document..."}
                  className="w-full pl-9 pr-3 h-9 bg-secondary/50 border border-border rounded-sm text-xs outline-none focus:border-brand"
                />
              </div>

              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveCat("all")}
                  className={`px-3 py-1.5 rounded-sm border ${
                    activeCat === "all"
                      ? "border-brand bg-brand text-primary-foreground font-medium"
                      : "border-border hover:border-brand"
                  }`}
                >
                  {lang === "ro" ? "Toate" : "All"}
                </button>
                <button
                  onClick={() => setActiveCat("mc")}
                  className={`px-3 py-1.5 rounded-sm border ${
                    activeCat === "mc"
                      ? "border-brand bg-brand text-primary-foreground font-medium"
                      : "border-border hover:border-brand"
                  }`}
                >
                  MC
                </button>
                <button
                  onClick={() => setActiveCat("surse")}
                  className={`px-3 py-1.5 rounded-sm border ${
                    activeCat === "surse"
                      ? "border-brand bg-brand text-primary-foreground font-medium"
                      : "border-border hover:border-brand"
                  }`}
                >
                  Surse
                </button>
              </div>
            </div>
          </div>

          {/* TABLE OF DOCUMENTS */}
          <div className="border border-border bg-card">
            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                {lang === "ro"
                  ? "Nu a fost găsit niciun document pentru filtrul selectat."
                  : "No documents found for the selected filter."}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredDocs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 grid h-10 w-10 place-items-center rounded-sm bg-secondary text-brand font-mono text-xs font-bold">
                        {doc.code}
                      </div>
                      <div>
                        <div className="font-display text-base text-foreground font-medium">
                          {lang === "ro" ? doc.title_ro : doc.title_en}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="bg-accent px-2 py-0.5 rounded-sm text-accent-foreground font-medium">
                            {doc.type}
                          </span>
                          <span>
                            {categories.find((c) => c.id === doc.catId)?.[lang === "ro" ? "ro" : "en"]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      {doc.fileUrl.startsWith("/documents/") ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-primary-foreground rounded-sm text-xs font-medium hover:bg-brand-deep transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {lang === "ro" ? "Deschide PDF Original" : "Open Original PDF"}
                        </a>
                      ) : (
                        <Link
                          to={doc.fileUrl}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-primary-foreground rounded-sm text-xs font-medium hover:bg-brand-deep transition-colors"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                          {lang === "ro" ? "Vezi Cerințe & Permise" : "View Requirements"}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FEES AND CHARGES SECTION */}
        <div id="tarife" className="mt-20 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand">03 · Legislație Tarife</div>
            <h2 className="mt-2 font-display text-3xl text-brand-deep">
              {lang === "ro" ? "Tarife și taxe de autorizare" : "Fees and charges"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {lang === "ro"
                ? "Nivelul taxelor este stabilit prin Ordinul CNCAN 155/2005, cu modificările și completările ulterioare."
                : "Fee levels are set by CNCAN Order 155/2005, as subsequently amended."}
            </p>
          </div>
          <div className="border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">{lang === "ro" ? "Categoria" : "Category"}</th>
                  <th className="text-left px-5 py-3 font-semibold">{lang === "ro" ? "Procedura / Document" : "Procedure / Document"}</th>
                  <th className="text-right px-5 py-3 font-semibold">{lang === "ro" ? "Tarif (RON)" : "Fee (RON)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Management Calitate", "Autorizare Sistem Managementul Calității (SMC)", "12,400"],
                  ["Surse radiație", "Deținere / utilizare sursă categoria 1-3", "3,200"],
                  ["Instalații", "Emitere autorizație exploatare instalație nucleară", "48,500"],
                  ["Transport", "Aprobare pachet tip B(U) / B(M)", "12,800"],
                  ["Deșeuri", "Autorizație depozitare intermediară / definitivă", "24,600"],
                  ["Personal", "Permis exercitare personal expus (5 ani)", "480"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/50">
                    <td className="px-5 py-3 text-muted-foreground font-medium">{row[0]}</td>
                    <td className="px-5 py-3">{row[1]}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums font-semibold">{row[2]}</td>
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
