import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  FileText,
  Download,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Layers,
  Scale,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/constructii-nucleare")({
  head: () => ({
    meta: [
      { title: "Construcții cu Specific Nuclear & Reglementări — CNCAN" },
      {
        name: "description",
        content:
          "Reglementări emise de CNCAN, norme tehnice și autorizații construcții/desființare pentru obiectivele și construcțiile cu specific nuclear din România.",
      },
      { property: "og:title", content: "Construcții cu Specific Nuclear CNCAN" },
      {
        property: "og:description",
        content: "Norme tehnice, autorizații de construire și desființare nucleare.",
      },
    ],
  }),
  component: NuclearConstructionsPage,
});

const regulationsDocuments = [
  {
    id: "NS-CN-01",
    subSection_ro: "Norme",
    subSection_en: "Norms",
    title_ro: "Norme privind construcțiile cu specific nuclear",
    title_en: "Norms on nuclear-specific constructions",
    desc_ro:
      "Cerințe tehnice, criterii de clasificare seismică și cerințe obligatorii de calitate pentru proiectarea, execuția, verificarea și încercările pe amplasament ale construcțiilor nucleare.",
    desc_en:
      "Technical requirements, seismic classification criteria, and mandatory quality rules for design, construction, verification, and site testing of nuclear structures.",
    pdfUrl: "/documents/constructii/Norme_Constructii_Nucleare.pdf",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    id: "AC-CN-02",
    subSection_ro: "Autorizații construcții/desființare",
    subSection_en: "Construction/decommissioning authorizations",
    title_ro: "Autorizații pentru construire, modificare sau desființare",
    title_en: "Authorizations for construction, modification or decommissioning",
    desc_ro:
      "Procedura administrativă, etapele de avizare tehnică și conținutul dosarului de autorizare pentru eliberarea de către CNCAN a autorizațiilor de construire sau desființare/dezafectare.",
    desc_en:
      "Administrative procedure, technical endorsement phases, and dossier contents for CNCAN licensing of construction, modification, or decommissioning.",
    pdfUrl: "/documents/constructii/Autorizatii_Constructii_Desfiintare.pdf",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
];

function NuclearConstructionsPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState("reglementari");

  return (
    <>
      <PageHeader
        eyebrow="CSN · CNCAN"
        title={lang === "ro" ? "Construcții cu Specific Nuclear" : "Nuclear-Specific Constructions"}
        subtitle={
          lang === "ro"
            ? "Reglementări emise de CNCAN, norme de proiectare structurală și proceduri pentru autorizații construcții/desființare."
            : "CNCAN regulations, structural design norms, and procedures for construction/decommissioning authorizations."
        }
      />

      <section className="container-page py-12 md:py-16">
        {/* TOP BREADCRUMB & BACK LINK */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/autorizari"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-deep transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {lang === "ro" ? "Înapoi la Portalul Autorizări" : "Back to Licensing Portal"}
          </Link>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground bg-secondary/80 px-3 py-1 rounded-sm border border-border">
            <Building2 className="h-3.5 w-3.5 text-brand" />
            <span>{lang === "ro" ? "DOMENIU RECUNOSCUT CNCAN" : "CNCAN ACCREDITED DOMAIN"}</span>
          </div>
        </div>

        {/* TABS MENU */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto bg-card border border-border p-1.5 rounded-sm">
            <TabsTrigger
              value="prezentare"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <Layers className="h-4 w-4 mr-2" />
              {lang === "ro" ? "1. Prezentare & Cadru" : "1. Overview & Framework"}
            </TabsTrigger>
            <TabsTrigger
              value="reglementari"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm relative"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              {lang === "ro" ? "2. Reglementări Emise de CNCAN" : "2. CNCAN Regulations"}
              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/20 text-gold border border-gold/30">
                2 Sub-secțiuni
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="proceduri"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {lang === "ro" ? "3. Proceduri de Avizare" : "3. Endorsement Procedures"}
            </TabsTrigger>
            <TabsTrigger
              value="inspectii"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              {lang === "ro" ? "4. Control & Execuție" : "4. Oversight & Execution"}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PREZENTARE & CADRU */}
          <TabsContent value="prezentare" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6 border border-border bg-card p-8 rounded-sm">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
                  <Building2 className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Cadru de Reglementare Structurală" : "Structural Regulatory Framework"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Siguranța structurală și avizarea construcțiilor cu specific nuclear"
                    : "Structural safety and licensing of nuclear-specific constructions"}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "CNCAN emite reglementări specifice privind proiectarea, amplasarea, construirea, modificarea, conservarea și desființarea construcțiilor cu specific nuclear, în vederea protejării personalului, populației și mediului împotriva riscurilor radiologice."
                    : "CNCAN issues specific regulations on design, siting, construction, modification, conservation, and decommissioning of nuclear-specific constructions to protect personnel, public, and environment from radiological hazards."}
                </p>
                <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                  <div className="border border-border/60 bg-secondary/30 p-4 rounded-sm">
                    <h3 className="font-display text-base text-brand-deep">
                      {lang === "ro" ? "Proiectare & Rezistență" : "Design & Resistance"}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Verificarea criteriilor seismice, protecția la impact exterior, etanșeitatea și sistemele de izolare radiologică."
                        : "Verification of seismic criteria, external impact protection, leak-tightness, and radiological isolation systems."}
                    </p>
                  </div>
                  <div className="border border-border/60 bg-secondary/30 p-4 rounded-sm">
                    <h3 className="font-display text-base text-brand-deep">
                      {lang === "ro" ? "Avize & Autorizații" : "Endorsements & Permits"}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Autorizarea de către CNCAN este obligatorie atât în faza de construire, cât și în cazul lucrărilor de desființare sau dezafectare."
                        : "CNCAN licensing is mandatory both during construction phase and for decommissioning or dismantling works."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-brand/30 bg-gradient-to-b from-brand-deep/5 via-card to-card p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-3 text-brand">
                  <Scale className="h-6 w-6" />
                  <h3 className="font-display text-lg text-brand-deep">
                    {lang === "ro" ? "Baza Legală" : "Legal Basis"}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Activitățile de construire în domeniul nuclear se supun prevederilor Legii nr. 111/1996 republicată și legislației speciale în construcții, completate de normele de securitate nucleară emise de CNCAN."
                    : "Construction activities in nuclear sector are governed by Law 111/1996 republished and special construction laws, complemented by CNCAN nuclear safety regulations."}
                </p>
                <div className="pt-3 border-t border-border">
                  <Link
                    to="/legea-111"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-deep"
                  >
                    {lang === "ro" ? "Consultă textul integral Legea 111/1996" : "Read full text of Law 111/1996"} →
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: REGLEMENTARI EMISE DE CNCAN (USER EXPLICIT REQUEST) */}
          <TabsContent value="reglementari" className="space-y-8">
            {/* HERO BANNER FOR REGLEMENTARI EMISE DE CNCAN */}
            <div className="rounded-sm border border-brand/30 bg-gradient-to-r from-brand-deep/5 via-card to-brand/5 p-6 md:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
                  <FolderOpen className="h-4 w-4" />
                  {lang === "ro" ? "SUB-SECȚIUNE REGLEMENTĂRI EMISE DE CNCAN" : "CNCAN REGULATIONS SUB-SECTION"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Reglementări Emise de CNCAN"
                    : "Regulations Issued by CNCAN"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "În cadrul acestei secțiuni puteți consulta cele două sub-secțiuni reglementate oficial de Comisia Națională pentru Controlul Activităților Nucleare în domeniul construcțiilor cu specific nuclear: (1) Norme și (2) Autorizații construcții/desființare. Pentru fiecare sub-secțiune este disponibil un document oficial PDF pentru consultare și descărcare."
                    : "In this section you can access the two sub-sections officially regulated by CNCAN in the nuclear-specific constructions sector: (1) Norms and (2) Construction/decommissioning authorizations. An official downloadable PDF document is available for each sub-section."}
                </p>
              </div>
            </div>

            {/* TWO NESTED SUBSECTIONS: 1. NORME | 2. AUTORIZATII CONSTRUCTII/DESFIINTARE */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div>
                  <h3 className="font-display text-xl text-brand-deep">
                    {lang === "ro"
                      ? "Sub-secțiuni și documentație oficială (2 Sub-secțiuni)"
                      : "Sub-sections and official documentation (2 Sub-sections)"}
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted-foreground">PDF Download • Deschidere document</span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {regulationsDocuments.map((doc, idx) => (
                  <article
                    key={idx}
                    className="group border border-border bg-card hover:border-brand/60 transition-all p-6 md:p-7 rounded-sm flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      {/* SUBSECTION BADGE */}
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${doc.badgeColor}`}
                        >
                          {lang === "ro" ? doc.subSection_ro : doc.subSection_en}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground uppercase bg-secondary px-2 py-0.5 rounded-sm">
                          {doc.id}
                        </span>
                      </div>

                      {/* SUBSECTION TITLE & CLICKABLE LINK TO DOCUMENT */}
                      <h4 className="mt-5 font-display text-xl text-foreground group-hover:text-brand transition-colors leading-snug">
                        <a
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-2"
                        >
                          {lang === "ro" ? doc.title_ro : doc.title_en}
                        </a>
                      </h4>

                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                        {lang === "ro" ? doc.desc_ro : doc.desc_en}
                      </p>
                    </div>

                    {/* ACTION LINKS & DOWNLOAD BUTTONS */}
                    <div className="mt-8 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-deep transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="underline decoration-brand/40 underline-offset-4 font-medium">
                          {lang === "ro"
                            ? `Deschide documentul (${doc.subSection_ro})`
                            : `Open document (${doc.subSection_en})`}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                      </a>

                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-primary-foreground rounded-sm text-xs font-medium hover:bg-brand-deep transition-colors shadow-sm"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {lang === "ro" ? "Descarcă PDF" : "Download PDF"}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: PROCEDURI DE AVIZARE */}
          <TabsContent value="proceduri" className="space-y-6">
            <div className="border border-border bg-card p-8 rounded-sm">
              <h3 className="font-display text-2xl text-brand-deep">
                {lang === "ro"
                  ? "Etapele Avizării și Conținutul Memoriului Tehnic"
                  : "Endorsement Stages and Technical Memoir Contents"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {lang === "ro"
                  ? "Pentru eliberarea autorizațiilor de amplasare sau de construire a obiectivelor cu specific nuclear, solicitanții vor supune analizei CNCAN documentația de securitate structurală și de radioprotecție, certificată de specialiști atestați."
                  : "To obtain siting or construction permits for nuclear-specific facilities, applicants must submit structural safety and radioprotection documentation certified by accredited specialists."}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  "Depunerea documentației tehnice pentru certificarea amplasamentului",
                  "Verificarea calculului seismic de către evaluatori independenți recunoscuți",
                  "Emiterea avizului prealabil de securitate radiologică pentru execuție",
                  "Inspecția de recepție și avizarea punerii în funcțiune tehnologică",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 border border-border/60 bg-secondary/20 rounded-sm">
                    <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: INSPECTIE & CONTROL */}
          <TabsContent value="inspectii" className="space-y-6">
            <div className="border border-border bg-card p-8 rounded-sm">
              <h3 className="font-display text-2xl text-brand-deep">
                {lang === "ro"
                  ? "Supraveghere pe Parcursul Execuției Lucrărilor"
                  : "Oversight Throughout Construction Works"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {lang === "ro"
                  ? "Inspectorii CNCAN au drept de inspecție neîngrădită în toate etapele de executare a construcțiilor cu specific nuclear, având autoritatea de a opri lucrările în cazul constatării unor neconformități de natură să afecteze securitatea nucleară."
                  : "CNCAN inspectors have unrestricted inspection rights across all nuclear construction phases, with authority to halt works if non-conformities affecting nuclear safety are identified."}
              </p>
              <div className="mt-6 border-t border-border pt-6 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {lang === "ro" ? "Pentru transmiterea solicitărilor tehnic-constructive:" : "For technical-construction inquiries:"}
                </span>
                <span className="font-mono text-brand font-semibold">office@cncan.ro</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
