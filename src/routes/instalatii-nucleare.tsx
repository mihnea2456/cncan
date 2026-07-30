import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Atom,
  ShieldCheck,
  FileText,
  Download,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Layers,
  Scale,
  Award,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/instalatii-nucleare")({
  head: () => ({
    meta: [
      { title: "Instalații Nucleare & Cultura de Securitate — CNCAN" },
      {
        name: "description",
        content:
          "Reglementarea, autorizarea și supravegherea instalațiilor nucleare din România. Cultura de securitate nucleară, ghiduri și bune practici internaționale.",
      },
      { property: "og:title", content: "Instalații Nucleare CNCAN" },
      {
        property: "og:description",
        content: "Cultura de securitate nucleară, proceduri de autorizare și supraveghere.",
      },
    ],
  }),
  component: NuclearInstallationsPage,
});

const safetyCultureDocuments = [
  {
    id: "CSN-01",
    title_ro: "Cultura de securitate nucleară",
    title_en: "Nuclear Safety Culture",
    desc_ro:
      "Document de fond și reglementare CNCAN privind cerințele fundamentale, angajamentul conducerii și principiile culturii de securitate nucleară în unitățile și instalațiile nucleare din România.",
    desc_en:
      "CNCAN background and regulatory document on core requirements, leadership commitment, and principles of nuclear safety culture in Romanian nuclear installations.",
    pdfUrl: "/documents/cultura/Cultura_de_Securitate_Nucleara.pdf",
  },
  {
    id: "CSN-02",
    title_ro: "Traits of a Healthy Nuclear Safety Culture",
    title_en: "Traits of a Healthy Nuclear Safety Culture",
    desc_ro:
      "Document de aliniere internațională (INPO / WANO / AIEA) care detaliază cele 9 atribute fundamentale ale unei culturi solide de securitate nucleară (răspundere personală, atitudine interogativă, comunicare ș.a.).",
    desc_en:
      "International alignment document detailing the 9 fundamental traits of a strong nuclear safety culture (personal accountability, questioning attitude, communication, etc.).",
    pdfUrl: "/documents/cultura/Traits_of_a_Healthy_Nuclear_Safety_Culture.pdf",
  },
  {
    id: "CSN-03",
    title_ro: "Traits of a Healthy Nuclear Safety Culture addendum I",
    title_en: "Traits of a Healthy Nuclear Safety Culture addendum I",
    desc_ro:
      "Anexă tehnică care cuprinde ghiduri suplimentare, indicatori de observație comportamentală și metode de evaluare periodică a culturii de securitate nucleară pentru personalul operațional.",
    desc_en:
      "Technical annex containing supplementary guidelines, behavioral observation indicators, and periodic safety culture assessment methods for operational staff.",
    pdfUrl: "/documents/cultura/Traits_of_a_Healthy_Nuclear_Safety_Culture_Addendum_I.pdf",
  },
  {
    id: "CSN-04",
    title_ro: "Traits of a Healthy Nuclear Safety Culture addendum II",
    title_en: "Traits of a Healthy Nuclear Safety Culture addendum II",
    desc_ro:
      "Anexă specializată cu studii de caz din experiența internațională, alinierea trans-funcțională și supravegherea furnizorilor de servicii în activități cu impact asupra securității nucleare.",
    desc_en:
      "Specialized annex with international case studies, cross-functional alignment, and vendor oversight in safety-significant nuclear activities.",
    pdfUrl: "/documents/cultura/Traits_of_a_Healthy_Nuclear_Safety_Culture_Addendum_II.pdf",
  },
];

function NuclearInstallationsPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState("cultura");

  return (
    <>
      <PageHeader
        eyebrow="IN · CNCAN"
        title={lang === "ro" ? "Instalații Nucleare" : "Nuclear Installations"}
        subtitle={
          lang === "ro"
            ? "Reglementarea, autorizarea, supravegherea instalațiilor nucleare și menținerea unei culturi solide de securitate nucleară."
            : "Regulation, licensing, oversight of nuclear installations and promoting a strong nuclear safety culture."
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
            <Atom className="h-3.5 w-3.5 text-brand" />
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
              value="cultura"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm relative"
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              {lang === "ro" ? "2. Cultura de Securitate Nucleară" : "2. Nuclear Safety Culture"}
              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/20 text-gold border border-gold/30">
                4 Doc
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="ghiduri"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {lang === "ro" ? "3. Ghiduri & Reglementări" : "3. Guides & Regulations"}
            </TabsTrigger>
            <TabsTrigger
              value="rapoarte"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              {lang === "ro" ? "4. Rapoarte de Securitate" : "4. Safety Reports"}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PREZENTARE & CADRU */}
          <TabsContent value="prezentare" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6 border border-border bg-card p-8 rounded-sm">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
                  <Atom className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Cadru General de Supraveghere" : "General Oversight Framework"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Autorizarea și supravegherea instalațiilor nucleare din România"
                    : "Licensing and supervision of nuclear installations in Romania"}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Comisia Națională pentru Controlul Activităților Nucleare (CNCAN) reprezintă autoritatea națională competentă din România în domeniul securității nucleare, protecției radiologice și garanțiilor nucleare, reglementând pe parcursul întregului ciclu de viață al obiectivelor și instalațiilor nucleare."
                    : "The National Commission for Nuclear Activities Control (CNCAN) is Romania's competent national authority for nuclear safety, radiological protection, and nuclear safeguards, regulating throughout the entire lifecycle of nuclear facilities."}
                </p>
                <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                  <div className="border border-border/60 bg-secondary/30 p-4 rounded-sm">
                    <h3 className="font-display text-base text-brand-deep">
                      {lang === "ro" ? "Faze de Autorizare" : "Licensing Phases"}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Amplasare, proiectare, construcție, punere în funcțiune, exploatare de probă, exploatare comercială și dezafectare."
                        : "Siting, design, construction, commissioning, trial operation, commercial operation, and decommissioning."}
                    </p>
                  </div>
                  <div className="border border-border/60 bg-secondary/30 p-4 rounded-sm">
                    <h3 className="font-display text-base text-brand-deep">
                      {lang === "ro" ? "Obiective Majore" : "Major Facilities"}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Centrala Nuclearoelectrică Cernavodă (Unitățile 1 și 2), reactorii de cercetare (RATEN ICN Pitești), fabrica de combustibil nuclear FCN Pitești."
                        : "Cernavodă NPP (Units 1 & 2), research reactors (RATEN ICN Pitești), nuclear fuel plant FCN Pitești."}
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
                    ? "Conform Legii nr. 111/1996 privind desfășurarea în siguranță, reglementarea, autorizarea și controlul activităților nucleare, cu modificările și completările ulterioare, titularul de autorizație poartă responsabilitatea fundamentală pentru securitatea nucleară."
                    : "Under Law no. 111/1996 on the safe conduct, regulation, licensing, and control of nuclear activities, the licensee bears the prime responsibility for nuclear safety."}
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

          {/* TAB 2: CULTURA DE SECURITATE NUCLEARA (USER EXPLICIT REQUEST) */}
          <TabsContent value="cultura" className="space-y-8">
            {/* HERO BANNER FOR SAFETY CULTURE */}
            <div className="rounded-sm border border-brand/30 bg-gradient-to-r from-brand-deep/5 via-card to-brand/5 p-6 md:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
                  <ShieldCheck className="h-4 w-4" />
                  {lang === "ro" ? "Sub-secțiune CNCAN" : "CNCAN Sub-section"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Cultura de Securitate Nucleară"
                    : "Nuclear Safety Culture"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "CNCAN subliniază importanța primordială a promovării, evaluării și îmbunătățirii continue a culturii de securitate nucleară în cadrul organizațiilor care dețin, construiesc sau exploatează instalații nucleare. Mai jos regăsiți cele 4 documente fundamentale de referință care pot fi descărcate și consultate."
                    : "CNCAN underscores the prime importance of fostering, assessing, and continuously improving nuclear safety culture across organizations possessing, constructing, or operating nuclear installations. Below are the 4 core reference documents available for consultation and download."}
                </p>
              </div>
            </div>

            {/* GRID OF THE 4 REQUESTED HYPERLINKS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-display text-xl text-brand-deep">
                  {lang === "ro"
                    ? "Documentație de referință privind Cultura de Securitate Nucleară (4 Documente)"
                    : "Reference Documentation on Nuclear Safety Culture (4 Documents)"}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">PDF Download</span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {safetyCultureDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="group border border-border bg-card hover:border-brand/60 transition-all p-6 rounded-sm flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex items-center justify-center h-8 px-3 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                          {doc.id}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground uppercase bg-secondary px-2 py-0.5 rounded-sm">
                          {lang === "ro" ? "Document Ofcial" : "Official Document"}
                        </span>
                      </div>

                      <h4 className="mt-4 font-display text-lg text-foreground group-hover:text-brand transition-colors leading-snug">
                        <a
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1.5"
                        >
                          {lang === "ro" ? doc.title_ro : doc.title_en}
                        </a>
                      </h4>

                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {lang === "ro" ? doc.desc_ro : doc.desc_en}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-deep transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="underline decoration-brand/40 underline-offset-4">
                          {lang === "ro" ? "Consultă / deschide documentul" : "Consult / open document"}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                      </a>

                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand text-primary-foreground rounded-sm text-xs font-medium hover:bg-brand-deep transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {lang === "ro" ? "PDF" : "PDF"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </TabsContent>

          {/* TAB 3: GHIDURI & REGLEMENTARI */}
          <TabsContent value="ghiduri" className="space-y-6">
            <div className="border border-border bg-card p-8 rounded-sm">
              <h3 className="font-display text-2xl text-brand-deep">
                {lang === "ro" ? "Ghiduri, Norme și Instrucțiuni Tehnice" : "Guides, Norms, and Technical Instructions"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {lang === "ro"
                  ? "Normele de securitate nucleară stipulează cerințe obligatorii pentru evaluarea amplasamentului, proiectarea sistemelor de protecție, redundanță și planificare pentru situații de urgență."
                  : "Nuclear safety norms stipulate mandatory requirements for siting assessment, protection system design, redundancy, and emergency preparedness."}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  "Norme privind securitatea nucleară a centralelor nuclearoelectrice (CNE)",
                  "Norme privind evaluarea de securitate și întocmirea Raportului de Securitate Nucleară (RSN)",
                  "Ghid pentru inspectarea calității în construcția instalațiilor nucleare",
                  "Reglementări privind gestionarea combustibilului ars și a deșeurilor din instalații",
                ].map((norm, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 border border-border/60 bg-secondary/20 rounded-sm">
                    <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground font-medium">{norm}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: RAPOARTE DE SECURITATE */}
          <TabsContent value="rapoarte" className="space-y-6">
            <div className="border border-border bg-card p-8 rounded-sm">
              <h3 className="font-display text-2xl text-brand-deep">
                {lang === "ro" ? "Rapoarte Periodice și Evaluare Extinsă" : "Periodic Reports and Comprehensive Safety Review"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {lang === "ro"
                  ? "Titularul de autorizație are obligația de a efectua Evaluări Periodice ale Securității Nucleare (Periodic Safety Review - PSR) cel puțin o dată la 10 ani, re-evaluând marja de securitate față de evoluția standardelor internaționale."
                  : "The licensee is required to conduct Periodic Safety Reviews (PSR) at least once every 10 years, re-evaluating safety margins against evolving international standards."}
              </p>
              <div className="mt-6 border-t border-border pt-6 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {lang === "ro" ? "Pentru transmiterea dosarelor tehnice:" : "For technical dossier submission:"}
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
